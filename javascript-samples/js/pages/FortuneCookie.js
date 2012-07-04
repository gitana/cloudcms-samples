(function($) {
    Samples.Pages.FortuneCookie = Samples.AbstractPageGadget.extend(
        {
            TEMPLATE : "pages/fortune-cookie",

            constructor: function(id, ratchet) {
                this.base(id, ratchet);
            },

            setup: function() {
                this.get("/mini-apps/fortune-cookie", this.index);
            },

            setupSidebar: function(el) {
                this.sidebar(Samples.Sidebar(this, "mini-apps-fortune-cookie"));
            },

            setupFortuneCookie : function(el) {
                var randomInteger = function (M, N) {
                    return Math.floor(M + (1 + N - M) * Math.random());
                };

                var generateLuckyNumbers = function () {
                    var luckNumbers = [];
                    for (var i = 0; i < 6; i++) {
                        luckNumbers.push(randomInteger(1, 100));
                    }
                    return luckNumbers;
                };

                var updateFortuneCookieMessage = function(node, messages) {
                    node.object['message'] = messages[randomInteger(0, messages.length - 1)];
                    node.object['luckNumbers'] = generateLuckyNumbers();
                    node.update().reload().then(function() {
                        displayFortuneCookieMessage(this, messages);
                    });
                };

                var createFortuneCookieMessage = function(branch, messages) {
                    branch.createNode({
                        "_qname" : "fortunecookie:cookie",
                        "title" : "My Fortune Cookie",
                        "message" : messages[randomInteger(0, messages.length - 1)],
                        "luckNumbers" : generateLuckyNumbers()
                    }).then(function() {
                            displayFortuneCookieMessage(this, messages);
                        });
                };

                var displayFortuneCookieMessage = function(node, messages) {
                    $('#fortune-cookie').empty().append('<div id="fortune-cookie-message">'
                        + '<div>' + node.get('message') + '</div> '
                        + '<div>Lucky Numbers: ' + node.get('luckNumbers').join(',') + '</div>'
                        + '</div>');
                    $('#fortune-cookie').append('<p id="fortune-cookie-timestamp">'
                        + node.getSystemMetadata().getModifiedBy() + ' @ ' + node.getSystemMetadata().getModifiedOn()["timestamp"]
                        + '</p>'
                        + '<div class="btn-toolbar" id="fortune-cookie-toolbar">'
                        + '<button id="update_button" class="btn">Update</button><button id="delete_button" class="btn">Delete</button>'
                        + '</div>');
                    $('#delete_button').click(function() {
                        var branch = node.getBranch();
                        Chain(node).del().then(function() {
                            $('#fortune-cookie').empty().append('<div class="btn-toolbar" id="fortune-cookie-toolbar">'
                                + '<button id="new_button" class="btn">Generate New</button>'
                                + '</div>');
                            $('#new_button').click(function() {
                                createFortuneCookieMessage(Chain(branch), messages);
                            });
                        });
                    });
                    $('#update_button').click(function() {
                        updateFortuneCookieMessage(Chain(node), messages);
                    });
                };

                Samples.defaultClient().queryRepositories({
                    "title": "Fortune Cookie Content"
                }).keepOne().then(function() {
                    this.readBranch('master').readNode('fortunecookie:messages').then(function() {
                        var messages = this.get('messages');
                        this.attachment('default').then(function() {
                            $('#fortune-cookie').css({
                                "background": "url('" + this.getDownloadUri() + "') no-repeat"
                            });
                        });
                        var branch = this.getBranch();
                        this.subchain(branch).trap(function(error) {
                            if (error.status == 404) {
                                createFortuneCookieMessage(branch, messages);
                            } else {
                                return false;
                            }
                        }).readNode("fortunecookie:cookie").then(function() {
                            updateFortuneCookieMessage(this, messages);
                        });
                    });
                });
            },

            index: function(el) {
                var self = this;

                this.setupSidebar(el);

                this.subscribe(this.subscription, this.refresh);

                this.model(el);

                this.prettifyCode(el);

                // render
                self.renderTemplate(el, self.TEMPLATE, function(el) {
                    self.setupFortuneCookie(el);
                    el.swap();
                });
            }

        });

    Ratchet.GadgetRegistry.register("page", Samples.Pages.FortuneCookie);

})(jQuery);