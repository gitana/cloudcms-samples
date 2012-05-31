(function($) {
    Samples.Pages.Component = Samples.AbstractPageGadget.extend(
    {
        TEMPLATE : "pages/single-column",

        constructor: function(id, ratchet) {
            this.base(id, ratchet);
        },

        setup: function() {
            this.get("/components/{componentKey}", this.index);
        },

        setupSidebar: function(el) {
            this.sidebar(Samples.Sidebar(this,"sidebar-" + el.tokens["componentKey"]));
        },

        setupSampleCode: function(el) {
            var componentKey = el.tokens["componentKey"];
            var sampleCode = Samples.ComponentCode[componentKey];
            this.sampleCode("sample-code-"+componentKey,sampleCode);
        },

        setupDashlets : function(el) {
            this.setupSampleCode(el);
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
                            "gadget" : "samplecode",
                            "subscription" : "sample-code-"+componentKey
                        }
                    ]
                ]
            };

            this.page(page);
        }

    });

    Ratchet.GadgetRegistry.register("page", Samples.Pages.Component);

})(jQuery);