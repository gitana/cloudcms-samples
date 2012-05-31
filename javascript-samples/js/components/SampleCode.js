(function($) {
    Samples.Components.SampleCode = Samples.AbstractGadget.extend(
        {
            TEMPLATE : "components/sample-code",

            constructor: function(id, ratchet) {
                this.base(id, ratchet);
            },

            prettifyCode: function(el) {
                if ($('pre', $(el)).html()) {
                    // make code pretty
                    window.prettyPrint && prettyPrint();
                }
            },

            index: function(el) {
                var self = this;

                this.subscribe(this.subscription, this.refresh);

                $('body').unbind('swap').bind('swap', function(event, param) {
                    window.prettyPrint && prettyPrint();
                });

                var sampleCode = this.model(el);

                // render
                self.renderTemplate(el, self.TEMPLATE, function(el) {

                    $('.btn.run', $(el)).unbind("click").click(function() {
                        var targetId = $(this).attr('target-id');
                        $('#' + targetId + '-result').addClass('alert alert-info').html('Running sample code...');
                        $('#' + targetId + '-error').empty();
                        var code = $('textarea[id="' + targetId + "-code" + '"]').val();
                        eval(code);
                    });

                    $('.btn.view', $(el)).unbind("click").click(function() {
                        var targetId = $(this).attr('target-id');
                        var code = $('textarea[id="' + targetId + "-code" + '"]').val();
                        $('#' + targetId + '-code-view pre').empty().html(prettyPrintOne(code.replace(/</g, '&lt;').replace(/>/g, '&gt;'),"",true));
                        $('textarea#' + targetId + '-code').slideToggle();
                        $('div#' + targetId + '-code-view').slideToggle();
                        $('.btn.edit[target-id="' + targetId + '"]').slideToggle();
                        $(this).slideToggle();
                    });

                    $('.btn.edit', $(el)).unbind("click").click(function() {
                        var targetId = $(this).attr('target-id');
                        $('textarea#' + targetId + '-code').slideToggle();
                        $('div#' + targetId + '-code-view').slideToggle();
                        $('.btn.view[target-id="' + targetId + '"]').slideToggle();
                        $(this).slideToggle();
                    });

                    $('.btn.reset', $(el)).unbind("click").click(function() {
                        var targetId = $(this).attr('target-id');
                        $('#' + targetId + '-result').removeClass('alert alert-info').empty();
                        $('#' + targetId + '-error').removeClass('alert alert-error').empty();
                        $('textarea[id="' + targetId + "-code" + '"]').val(sampleCode['samples'][targetId].code);
                    });

                    el.swap();
                });
            }

        });

    Ratchet.GadgetRegistry.register("samplecode", Samples.Components.SampleCode);

})(jQuery);