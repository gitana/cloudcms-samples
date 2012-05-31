(function($) {
    Samples.Pages.Home = Samples.AbstractPageGadget.extend(
        {
            TEMPLATE : "pages/single-column",

            constructor: function(id, ratchet) {
                this.base(id, ratchet);
            },

            setup: function() {
                this.get("/", this.index);
            },

            setupSidebar: function(el) {
                this.sidebar(Samples.Sidebar(this));
            },

            setupPage : function(el) {
                var page = {
                    "title" : "Title",
                    "description" : "Description",
                    "dashlets" :[
                        [
                            {
                                "id" : "home",
                                "grid" : "span12",
                                "gadget" : "introduction"
                            }
                        ]
                    ]
                };

                this.page(page);
            }

        });

    Ratchet.GadgetRegistry.register("page", Samples.Pages.Home);

})(jQuery);