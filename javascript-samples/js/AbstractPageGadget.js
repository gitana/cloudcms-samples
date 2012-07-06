(function($) {
    Samples.AbstractPageGadget = Samples.AbstractGadget.extend({

        constructor: function(id, ratchet) {
            this.base(id, ratchet);
        },

        setupSidebar: function(el) {

        },

        setupDashlets: function(el) {

        },

        setupPage: function(el) {

        },

        prettifyCode: function(el) {
            $('body').unbind('swap').bind('swap', function(event, param) {
                if ($('pre').html() && $('pre ol.linenums').length == 0) {
                    // make code pretty
                    $('pre').html($('pre').html().replace(/\\n/g, '\n'));
                    window.prettyPrint && prettyPrint();
                }
            });
        },

        index: function(el) {
            var self = this;

            this.setupSidebar(el);

            // set up the page
            this.setupPage(el);

            this.subscribe(this.subscription, this.refresh);

            this.model(el);

            // render
            self.renderTemplate(el, self.TEMPLATE, function(el) {
                // set up the dashlets
                self.setupDashlets(el);

                el.swap();
            });
        }

    });

})(jQuery);