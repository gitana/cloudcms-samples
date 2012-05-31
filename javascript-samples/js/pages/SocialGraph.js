(function($) {
    Samples.Pages.SocialGraph = Samples.AbstractPageGadget.extend(
        {
            TEMPLATE : "pages/single-column",

            constructor: function(id, ratchet) {
                this.base(id, ratchet);
            },

            setup: function() {
                this.get("/mini-apps/social-graph", this.index);
            },

            setupSidebar: function(el) {
                this.sidebar(Samples.Sidebar(this, "mini-apps-social-graph"));
            },

            setupSocialGraph : function(el) {
                var self = this;
                this.d3("social-graph", {
                    "title" : "Social Graph",
                    "loadFunction" : function(queryForm, divId) {
                        return Samples.Utils.D3.dynamicForceGraph(null, divId, [], "");
                    }
                });
            },

            setupDashlets : function(el) {
                this.setupSocialGraph(el);
            },

            setupPage : function(el) {
                var componentKey = el.tokens["componentKey"];
                var page = {
                    "title" : "Title",
                    "description" : "Description",
                    "dashlets" :[
                        [
                            {
                                "id" : "test1",
                                "grid" : "span12",
                                "gadget" : "d3",
                                "subscription" : "social-graph"
                            }
                        ]
                    ]
                };

                this.page(page);
            }

        });

    Ratchet.GadgetRegistry.register("page", Samples.Pages.SocialGraph);

})(jQuery);