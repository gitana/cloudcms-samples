(function($) {
    Samples.Pages.FoodWeb = Samples.AbstractPageGadget.extend(
        {
            TEMPLATE : "pages/food-web",

            constructor: function(id, ratchet) {
                this.base(id, ratchet);
            },

            setup: function() {
                this.get("/mini-apps/food-web", this.index);
            },

            setupSidebar: function(el) {
                this.sidebar(Samples.Sidebar(this, "mini-apps-food-web"));
            },

            setupFoodWeb : function(el) {
                var nodeLookup = {};
                Samples.defaultClient().trap(function(error){

                }).queryRepositories({
                        "sdk_version": "0.1",
                        "sdk_bundle": "creatures"
                }).keepOne().then(function() {
                    this.readBranch('master').queryNodes({
                        "_type" : "creatures:creature"
                    }).each(
                        function() {
                            $('#creature-id').append('<option value="' + this.getId() + '">' + this.getTitle() + '</option>');
                            nodeLookup[this.getId()] = this;
                        }).then(function() {
                            $("#creature-id").change(function () {
                                $("#creature-id option:selected").each(function () {
                                    var val = $(this).val();
                                    if (val != "") {
                                        var selectedNode = nodeLookup[val];
                                        var displayCreature = function(div, node) {
                                            div.append('<li class="span12" style="margin-left:0;"><div class="thumbnail"><img class="creature-photo" src="' + node.attachment("photo").getDownloadUri() + '"/>'
                                                + '<div class="caption"><h5 id="' + node.getId() + '" class="item-title">' + node.getTitle() + '</h5>'
                                                + '<p class="item-details">' + node.get('details') + '</p></div></div></li>');
                                            $('#' + node.getId(), div).click(function() {
                                                $('#creature-id').val($(this).attr('id')).change();
                                            });
                                        };

                                        Chain(selectedNode).then(function() {
                                            $('#is-eaten-by').empty().append('<h3>IS EATEN BY</h3><ul class="thumbnails"></ul>');
                                            this.incomingAssociations('creatures:eats').each(function() {
                                                if (this.getDirectionality() == 'UNDIRECTED' && this.getSourceNodeId() == selectedNode.getId()) {
                                                    this.readTargetNode().then(function() {
                                                        displayCreature($('ul', $('#is-eaten-by')), this);
                                                    });
                                                } else {
                                                    this.readSourceNode().then(function() {
                                                        displayCreature($('ul', $('#is-eaten-by')), this);
                                                    });
                                                }
                                            });
                                            $('#eats').empty().append('<h3>EATS</h3><ul class="thumbnails"></ul>');
                                            this.outgoingAssociations('creatures:eats').each(function() {
                                                if (this.getDirectionality() == 'UNDIRECTED' && this.getTargetNodeId() == selectedNode.getId()) {
                                                    this.readSourceNode().then(function() {
                                                        displayCreature($('ul', $('#eats')), this);
                                                    });
                                                } else {
                                                    this.readTargetNode().then(function() {
                                                        displayCreature($('ul', $('#eats')), this);
                                                    });
                                                }
                                            });
                                        });
                                    }
                                });
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
                    self.setupFoodWeb(el);
                    el.swap();
                });
            }

        });

    Ratchet.GadgetRegistry.register("page", Samples.Pages.FoodWeb);

})(jQuery);