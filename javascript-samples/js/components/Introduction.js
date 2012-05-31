(function($) {
    Samples.Components.Introduction = Samples.AbstractGadget.extend(
        {
            TEMPLATE : "components/introduction",

            constructor: function(id, ratchet) {
                this.base(id, ratchet);
            },

            index: function(el) {
                var self = this;

                this.subscribe(this.subscription, this.refresh);

                this.model(el);

                // render
                self.renderTemplate(el, self.TEMPLATE, function(el) {
                    $('body').unbind('swap').bind('swap', function(event, param) {
                        $.each($('pre'), function() {
                            // make code pretty
                            $(this).html($(this).html().replace(/\\n/g, '\n'));
                        });
                        window.prettyPrint && prettyPrint();
                    });
                    el.swap();
                });
            }
        });

    Ratchet.GadgetRegistry.register("introduction", Samples.Components.Introduction);

})(jQuery);