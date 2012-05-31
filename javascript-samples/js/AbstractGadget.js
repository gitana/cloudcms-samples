(function($) {
    Samples.AbstractGadget = Ratchet.Gadget.extend({

        constructor: function(id, ratchet) {
            this.base(id, ratchet);
            var val = $(this.ratchet().el).attr('subscription');
            this.subscription = val ? val : id;
        },

        setup: function() {
            this.get(this.index);
        },

        refresh: function(link) {
            var self = this;
            var defaultURL = this.DEFAULT_URL ? this.DEFAULT_URL : "/";
            var refreshLink = link ? link : defaultURL;
            //Gitana.Utils.UI.unblock(function() {
            self.run(refreshLink);
            //});
        },

        _observable : function (key, args, defaultVal) {
            var _args = Ratchet.makeArray(args);
            if (_args.length > 0) {
                if (typeof _args[0] == "string") {
                    key = _args.shift();
                    if (_args.length > 0) {
                        this.observable(key).set(_args.shift());
                    }
                }
                else {
                    this.observable(key).set(_args.shift());
                }
            }
            var val = this.observable(key).get();
            if (val == null && defaultVal != null) {
                val = defaultVal;
                this.observable(key).set(defaultVal);
            }
            return val;
        },

        _clearObservable: function(key, defaultKey) {
            var _key = key ? key : defaultKey;
            this.observable(_key).clear();
        },

        sidebar: function() {
            return this._observable("sidebar", arguments);
        },

        clearSidebar: function() {
            this.observable("sidebar").clear();
        },

        page: function() {
            return this._observable("page", arguments);
        },

        clearPage: function() {
            this.observable("page").clear();
        },

        sampleCode: function() {
            return this._observable("samplecode", arguments);
        },

        clearSampleCode: function() {
            this.observable("samplecode").clear();
        },

        d3: function() {
            return this._observable("d3", arguments);
        },

        clearD3: function() {
            this.observable("d3").clear();
        },

        model: function(el) {
            if (!el.model[this.id]) {
                el.model[this.id] = this.observable(this.subscription).get();
            }
            return el.model[this.id];
        },

        index: function(el) {
            var self = this;

            this.subscribe(this.subscription, this.refresh);

            this.model(el);

            // render
            self.renderTemplate(el, self.TEMPLATE, function(el) {
                el.swap();
            });
        },

        renderTemplate: function(el, templatePath, data, callback) {

            if (templatePath.indexOf('/') != 0) {
                var prefix = "/javascript-samples/templates";
                templatePath = prefix + "/" + templatePath;
            }

            if (data && callback) {
                el.transform(templatePath, data, function(el) {
                    callback(el);
                });
            } else {
                callback = data;
                el.transform(templatePath, function(el) {
                    callback(el);
                });
            }
        }

    });

})(jQuery);