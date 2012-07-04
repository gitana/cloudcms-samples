(function($) {
    Samples.Pages.UserReviews = Samples.AbstractPageGadget.extend(
        {
            TEMPLATE : "pages/user-reviews",

            constructor: function(id, ratchet) {
                this.base(id, ratchet);
            },

            setup: function() {
                this.get("/mini-apps/user-reviews", this.index);
            },

            setupSidebar: function(el) {
                this.sidebar(Samples.Sidebar(this, "mini-apps-user-reviews"));
            },

            setupUserReviews : function() {

                var promotionNodeId = "store:binderpromotion";
                var promotionNode;
                var promotionDiv = $('#promotion');
                var connector = Samples.AlpacaConnector;
                var pageSize = 5;

                var getHelpfulStats = function (commentNode) {
                    var helpfulCounter = 0;
                    var unhelpfulCounter = 0;
                    if (commentNode.object['stats']) {
                        if (commentNode.object['stats']['a:deems_helpful']) {
                            helpfulCounter = commentNode.object['stats']['a:deems_helpful'];
                        }
                        if (commentNode.object['stats']['a:deems_unhelpful']) {
                            unhelpfulCounter = commentNode.object['stats']['a:deems_unhelpful'];
                        }
                    }
                    return helpfulCounter + ' out of ' + (helpfulCounter + unhelpfulCounter) + ' people found this review helpful.'
                };

                var getSpamStats = function (commentNode) {
                    if (commentNode.object['stats'] && commentNode.object['stats']['a:deems_spam']) {
                        return commentNode.object['stats']['a:deems_spam'] + ' people marked this review as inappropriate.';
                    } else {
                        return '';
                    }
                };

                var renderPageBar = function (totalItems, pageNumber) {
                    var pageBarContainer = $('#user_reviews_page_bar').empty();
                    var pageBarDiv = $('<div class="pagination"><ul></ul></div>').appendTo(pageBarContainer);
                    var totalNumberOfPages = totalItems % pageSize == 0 ? totalItems / pageSize : totalItems / pageSize;
                    for (var i = 0; i < totalNumberOfPages; i++) {
                        var pageButton = $('<li page="' + i + '"><a href="javascript:void(0);">' + (i + 1) + '</a></li>').appendTo($('ul', pageBarDiv));;
                        if (i == pageNumber) {
                            pageButton.addClass('active');
                        }
                        $(pageButton).click(function() {
                            renderReviews($(this).attr('page'));
                        });
                    }
                };
                // Render reviews
                var renderReviews = function (pageNumber) {
                    var userReviewsDiv = $('#user_reviews').empty().append('<div class="user-reviews-title">Customer Reviews:</div>');
                    var branch = promotionNode.getBranch();
                    var authInfo = promotionNode.getDriver().getAuthInfo();
                    var currentUserId = authInfo.getPrincipalDomainId() + "/" + authInfo.getPrincipalId();
                    branch.trap(function(error) {
                    }).readPersonNode(currentUserId, true).then(function() {
                        var personNode = this;
                        promotionNode.reload().outgoingAssociations("a:has_comment", {
                            "skip": pageNumber * pageSize,
                            "limit": pageSize,
                            "sort": {
                                '_system.modified_on.ms': -1
                            }
                        }).totalRows(function(totalRows) {
                            renderPageBar(totalRows, pageNumber);
                        }).each(function() {
                            var associationNode = this;
                                associationNode.readTargetNode().then(function() {
                                    var commentNode = this;
                                    var userReviewDiv = $("<div id='" + commentNode.getId() + "'  class='user-review'>");
                                    userReviewsDiv.append(userReviewDiv);
                                    userReviewDiv.alpaca({
                                        "view" : {
                                            "globalTemplate": '/javascript-samples/templates/pages/user-reviews/UserReview.html'
                                        },
                                        "data": commentNode.object,
                                        "postRender": function (renderedReviews) {
                                            $('.user-review-timestamp', userReviewDiv).html(commentNode.getSystemMetadata().getModifiedOn().getTimestamp());
                                            $('.user-review-user', userReviewDiv).html(commentNode.getSystemMetadata().getModifiedBy());
                                            $('span.stars').stars();
                                            var reviewIndicator = $('<div id="' + associationNode.getTargetNodeId() + '-indicator"></div>');
                                            reviewIndicator.prependTo($('#' + associationNode.getTargetNodeId() + ' .user-review-indicators'));
                                            reviewIndicator.alpaca({
                                                "view" : {
                                                    "globalTemplate": '/javascript-samples/templates/pages/user-reviews/UserReviewIndicators.html'
                                                },
                                                "data": associationNode.object,
                                                "postRender" : function(renderedReviewIndicatorsField) {
                                                    $('.helpfulindicator', renderedReviewIndicatorsField.container).html(getHelpfulStats(commentNode));
                                                    $('.spamindicator', renderedReviewIndicatorsField.container).html(getSpamStats(commentNode));

                                                    var helpfulButton = $('.helpfulbutton', renderedReviewIndicatorsField.container);
                                                    helpfulButton.click(function() {
                                                        Chain(personNode).associate(commentNode, 'a:deems_helpful').then(function() {
                                                            this.subchain(commentNode).reload().then(function() {
                                                                $('.helpfulindicator', renderedReviewIndicatorsField.container).html(getHelpfulStats(this));
                                                            });
                                                        });
                                                    });
                                                    var unhelpfulButton = $('.unhelpfulbutton', renderedReviewIndicatorsField.container);
                                                    unhelpfulButton.click(function() {
                                                        Chain(personNode).associate(commentNode, 'a:deems_unhelpful').then(function() {
                                                            this.subchain(commentNode).reload().then(function() {
                                                                $('.helpfulindicator', renderedReviewIndicatorsField.container).html(getHelpfulStats(this));
                                                            });
                                                        });
                                                    });
                                                    var spamIndicatorButton = $('.spambutton', renderedReviewIndicatorsField.container);
                                                    spamIndicatorButton.click(function() {
                                                        Chain(personNode).associate(commentNode, 'a:deems_spam').then(function() {
                                                            this.subchain(commentNode).reload().then(function() {
                                                                $('.spamindicator', renderedReviewIndicatorsField.container).html(getSpamStats(this));
                                                            });
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    });
                                });
                            });
                        });
                    };

                var displayReviewMetrics = function () {
                    promotionNode.reload().then(function() {
                        var stats = this.object['stats'];
                        $('#review_metrics').empty().alpaca({
                            "view" : {
                                "globalTemplate": '/javascript-samples/templates/pages/user-reviews/UserReviewMetrics.html'
                            },
                            "data": {
                                "averageRating":stats ? stats.ratingAverageValue : 0,
                                "totalReviews": stats ? stats.ratingTotalCount : 0
                            },
                            "postRender": function(renderedField) {
                                $('span.stars').stars();
                            }
                        });
                    });
                };
                promotionDiv.alpaca({
                    "view" : {
                        "globalTemplate": '/javascript-samples/templates/pages/user-reviews/LatestPromotion.html'
                    },
                    "data": promotionNodeId,
                    "connector" : connector,
                    "postRender": function (renderedField) {
                        promotionNode = connector.getGitanaNode(renderedField.data);
                        var gitanaDriver = connector.gitanaDriver;

                        renderReviews(0);

                        displayReviewMetrics();

                        var editButton = $("<a class='btn' href='javascript:void(0);'><i class='icon-pencil'></i> Write a review</a>");
                        editButton.click(function() {
                            editButton.removeClass("ui-state-focus ui-state-hover");
                            var editDialog = $('<div class="modal" id="alpaca-edit-form">' +
                                '<div class="modal-header"><button class="close" data-dismiss="modal">×</button>' +
                                '<h3>Write a review</h3>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                '</div>' +
                                '<div class="modal-footer">' +
                                '<a href="javascript:void(0);" class="btn btn-primary">Post</a>' +
                                '</div>' +
                                '</div>');
                            $('.modal-body', editDialog).alpaca({
                                "options": "/javascript-samples/forms/review_five_star.json",
                                "schema": "/javascript-samples/schemas/review.json",
                                "connector": connector,
                                "postRender": function(renderedNewFieldControl) {

                                    renderedNewFieldControl.outerEl.css('border','none');

                                    $('.ui-icon-info', renderedNewFieldControl.outerEl).addClass('icon-info-sign');

                                    $('select,input[type=text], textarea', renderedNewFieldControl.outerEl).addClass('input-xlarge');

                                    var saveButton = renderedNewFieldControl.form.saveButton;
                                    saveButton.hide();
                                    editDialog.modal();

                                    $('.modal-body').css("overflow-y", "hidden");

                                    $('.btn-primary', editDialog).click(function() {
                                        // Do the actual work
                                        var reviewVal = renderedNewFieldControl.getValue();
                                        reviewVal._type = "n:comment";
                                        promotionNode.getBranch().createNode(reviewVal).then(function() {
                                            var commentNode = this;
                                            this.reload().associateOf(promotionNode, "a:has_comment").then(function(status) {
                                                this.subchain(promotionNode).reload().then(function() {
                                                    // refresh the indicators
                                                    displayReviewMetrics();
                                                    // refresh the review list
                                                    renderReviews(0);
                                                    editDialog.modal('hide');
                                                });
                                            });
                                        });
                                    });
                                }
                            });
                        });
                        $('#review_button').append(editButton);
                    }
                });

            },

            index: function(el) {
                var self = this;

                this.setupSidebar(el);

                this.subscribe(this.subscription, this.refresh);

                this.model(el);

                this.prettifyCode(el);

                var isLoaded = false;
                $('body').unbind('swap').bind('swap', function(event, param) {
                    if ($('#promotion').length > 0 && !isLoaded) {
                        self.setupUserReviews();
                        isLoaded = true;
                    }
                });

                // render
                self.renderTemplate(el, self.TEMPLATE, function(el) {
                    el.swap();
                });
            }

        });

    Ratchet.GadgetRegistry.register("page", Samples.Pages.UserReviews);

})(jQuery);