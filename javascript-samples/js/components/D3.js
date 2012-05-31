(function($) {
    Samples.Components.D3 = Samples.AbstractGadget.extend(
        {
            TEMPLATE : "components/d3",

            constructor: function(id, ratchet) {
                this.base(id, ratchet);
            },

            loadD3 : function(queryForm) {
                var self = this;
                var d3 = this.d3;
                var generatedId = Ratchet.generateId() + "-d3";
                $('.d3', $(self.ratchet().el)).attr('id', generatedId);

                if ($("#" + generatedId).length > 0) {
                    if (self.chart != null) {
                        // deal with redraw
                    } else {
                        if (d3['loadFunction'] && Alpaca.isFunction(d3['loadFunction'])) {
                            self.chart = d3['loadFunction'](queryForm, "#" + generatedId);
                        }
                    }
                } else {
                    $('body').bind('swap', function(event, param) {
                        if ($("#" + generatedId).length > 0 && $("#" + generatedId + ' svg').length == 0) {
                            if (d3['loadFunction'] && Alpaca.isFunction(d3['loadFunction'])) {
                                self.chart = d3['loadFunction'](queryForm, "#" + generatedId);
                            }
                        }
                    });
                }
            },

            index: function(el) {
                var self = this;

                // detect changes to the pairs and redraw when they occur
                this.subscribe(this.subscription, this.refresh);

                // list model
                this.d3 = self.model(el);

                // render
                if (this.d3) {
                    self.renderTemplate(el, self.TEMPLATE, function(el) {

                        var formDiv = $('.d3-form', $(el));

                        el.swap();

                        var queryFormOptions = self.d3['queryForm'];

                        if (queryFormOptions) {
                            var userPostRender = queryFormOptions["postRender"];
                            queryFormOptions["postRender"] = function(form) {

                                //Gitana.Utils.UI.beautifyAlpacaForm(form);

                                if (userPostRender) {
                                    userPostRender.call(self, form);
                                }
                                if ($(".query-button", form.getEl()).length == 0 && self.d3['displayQueryButton']) {
                                    var buttonText = self.d3['queryButtonText']? self.d3['queryButtonText'] : "Query";
                                    var parentDiv =  self.d3['queryButtonLayout']? $("#"+self.d3['queryButtonLayout'],form.getEl()) : form.getEl();
                                    var queryButton = $('<div class="button btn d3-button">' + buttonText + '</div>').click(
                                        function() {
                                            self.loadD3(form);
                                        }
                                    ).appendTo(parentDiv);
                                }
                                //self.loadD3(form.getValue());
                            };
                            formDiv.alpaca(queryFormOptions);
                        } else {
                            self.loadD3(null);
                        }

                    });
                }
            }

        });

    Ratchet.GadgetRegistry.register("d3", Samples.Components.D3);

})(jQuery);