(function($) {
    Samples.Pages.SheWalksinBeauty = Samples.AbstractPageGadget.extend(
        {
            TEMPLATE : "pages/she-walks-in-beauty",

            LOCALE_LOOKUP : {
                "sq_AL": "Albanian (Albania)",
                "ar_DZ": "Arabic (Algeria)",
                "ar_BH": "Arabic (Bahrain)",
                "ar_EG": "Arabic (Egypt)",
                "ar_IQ": "Arabic (Iraq)",
                "ar_JO": "Arabic (Jordan)",
                "ar_KW": "Arabic (Kuwait)",
                "ar_LB": "Arabic (Lebanon)",
                "ar_LY": "Arabic (Libya)",
                "ar_MA": "Arabic (Morocco)",
                "ar_OM": "Arabic (Oman)",
                "ar_QA": "Arabic (Qatar)",
                "ar_SA": "Arabic (Saudi Arabia)",
                "ar_SD": "Arabic (Sudan)",
                "ar_SY": "Arabic (Syria)",
                "ar_TN": "Arabic (Tunisia)",
                "ar_AE": "Arabic (United Arab Emirates)",
                "ar_YE": "Arabic (Yemen)",
                "be_BY": "Belarusian (Belarus)",
                "bg_BG": "Bulgarian (Bulgaria)",
                "ca_ES": "Catalan (Spain)",
                "zh_CN": "Chinese (China)",
                "zh_HK": "Chinese (HongKong)",
                "zh_SG": "Chinese (Singapore)",
                "zh_TW": "Chinese (Taiwan)",
                "hr_HR": "Croatian (Croatia)",
                "cs_CZ": "Czech (Czech Republic)",
                "da_DK": "Danish (Denmark)",
                "nl_BE": "Dutch (Belgium)",
                "nl_NL": "Dutch (Netherlands)",
                "en_AU": "English (Australia)",
                "en_CA": "English (Canada)",
                "en_IN": "English (India)",
                "en_IE": "English (Ireland)",
                "en_MT": "English (Malta)",
                "en_NZ": "English (New Zealand)",
                "en_PH": "English (Philippines)",
                "en_SG": "English (Singapore)",
                "en_ZA": "English (South Africa)",
                "en_GB": "English (United Kingdom)",
                "en_US": "English (United States)",
                "et_EE": "Estonian (Estonia)",
                "fi_FI": "Finnish (Finland)",
                "fr_BE": "French (Belgium)",
                "fr_CA": "French (Canada)",
                "fr_FR": "French (France)",
                "fr_LU": "French (Luxembourg)",
                "fr_CH": "French (Switzerland)",
                "de_AT": "German (Austria)",
                "de_DE": "German (Germany)",
                "de_LU": "German (Luxembourg)",
                "de_CH": "German (Switzerland)",
                "el_CY": "Greek (Cyprus)",
                "el_GR": "Greek (Greece)",
                "iw_IL": "Hebrew (Israel)",
                "hi_IN": "Hindi (India)",
                "hu_HU": "Hungarian (Hungary)",
                "is_IS": "Icelandic (Iceland)",
                "in_ID": "Indonesian (Indonesia)",
                "ga_IE": "Irish (Ireland)",
                "it_IT": "Italian (Italy)",
                "it_CH": "Italian (Switzerland)",
                "ja_JP": "Japanese (Japan)",
                "ja_JP_JP": "Japanese (Japan,JP)",
                "ko_KR": "Korean (SouthKorea)",
                "lv_LV": "Latvian (Latvia)",
                "lt_LT": "Lithuanian (Lithuania)",
                "mk_MK": "Macedonian (Macedonia)",
                "ms_MY": "Malay (Malaysia)",
                "mt_MT": "Maltese (Malta)",
                "no_NO": "Norwegian (Norway)",
                "no_NO_NY": "Norwegian (Norway,Nynorsk)",
                "pl_PL": "Polish (Poland)",
                "pt_BR": "Portuguese (Brazil)",
                "pt_PT": "Portuguese (Portugal)",
                "ro_RO": "Romanian (Romania)",
                "ru_RU": "Russian (Russia)",
                "sr_BA": "Serbian (Bosnia and Herzegovina)",
                "sr_ME": "Serbian (Montenegro)",
                "sr_CS": "Serbian (Serbia and Montenegro)",
                "sr_RS": "Serbian (Serbia)",
                "sk_SK": "Slovak (Slovakia)",
                "sl_SI": "Slovenian (Slovenia)",
                "es_AR": "Spanish (Argentina)",
                "es_BO": "Spanish (Bolivia)",
                "es_CL": "Spanish (Chile)",
                "es_CO": "Spanish (Colombia)",
                "es_CR": "Spanish (Costa Rica)",
                "es_DO": "Spanish (Dominican Republic)",
                "es_EC": "Spanish (Ecuador)",
                "es_SV": "Spanish (ElSalvador)",
                "es_GT": "Spanish (Guatemala)",
                "es_HN": "Spanish (Honduras)",
                "es_MX": "Spanish (Mexico)",
                "es_NI": "Spanish (Nicaragua)",
                "es_PA": "Spanish (Panama)",
                "es_PY": "Spanish (Paraguay)",
                "es_PE": "Spanish (Peru)",
                "es_PR": "Spanish (PuertoRico)",
                "es_ES": "Spanish (Spain)",
                "es_US": "Spanish (United States)",
                "es_UY": "Spanish (Uruguay)",
                "es_VE": "Spanish (Venezuela)",
                "sv_SE": "Swedish (Sweden)",
                "th_TH": "Thai (Thailand)",
                "th_TH_TH": "Thai (Thailand,TH)",
                "tr_TR": "Turkish (Turkey)",
                "uk_UA": "Ukrainian (Ukraine)",
                "vi_VN": "Vietnamese (Vietnam)"
            },

            constructor: function(id, ratchet) {
                this.base(id, ratchet);
            },

            setup: function() {
                this.get("/mini-apps/she-walks-in-beauty", this.index);
            },

            setupSidebar: function(el) {
                this.sidebar(Samples.Sidebar(this, "mini-apps-she-walks-in-beauty"));
            },

            setupTranslationContributionForm: function(locales, node) {
                var self = this;
                $("#she-walks-in-beauty-poem-contribute").click(function() {

                    var localeKeys = [];
                    var localeLabels = [];

                    var language = window.navigator.userLanguage || window.navigator.language;
                    var userLocale = language.replace('-', '_');

                    $.each(self.LOCALE_LOOKUP, function(k, v) {
                        if (k != 'en_US' && $.inArray(k.toLowerCase(), locales) == -1) {
                            localeKeys.push(k);
                            localeLabels.push(v);
                        }
                    });

                    var defaultLocale = $.inArray(userLocale, localeKeys) == -1 ? localeKeys[0] : userLocale;

                    var editDialog = $('<div class="modal" id="alpaca-edit-form">' +
                        '<div class="modal-header"><button class="close" data-dismiss="modal">×</button>' +
                        '<h3>Contribute A New Translation</h3>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        '</div>' +
                        '<div class="modal-footer">' +
                        '<a href="javascript:void(0);" class="btn btn-primary">Save</a>' +
                        '</div>' +
                        '</div>');
                    $('.modal-body', editDialog).alpaca({
                        "options": {
                            "type":"object",
                            "fields":{
                                "locale":{
                                    "type":"select",
                                    "optionLabels": localeLabels
                                },
                                "title":{
                                    "type":"text"
                                },
                                "description":{
                                    "type":"textarea"
                                }
                            }
                        },
                        "schema": {
                            "type":"object",
                            "properties":{
                                "locale":{
                                    "title":"Language",
                                    "description":"Select language of your translation.",
                                    "type":"string",
                                    "enum":localeKeys,
                                    "default": defaultLocale,
                                    "required": true
                                },
                                "title":{
                                    "title":"Poem Title",
                                    "description":"Enter poem title in your selected language.",
                                    "type":"string"
                                },
                                "description":{
                                    "title":"Poem Body",
                                    "description":"Enter poem body in your selected language.",
                                    "type":"string"
                                }
                            }
                        },
                        "postRender": function(form) {

                            form.outerEl.css('border','none');

                            $('.ui-icon-info', form.outerEl).addClass('icon-info-sign');

                            $('select,input[type=text], textarea', form.outerEl).addClass('input-xlarge');

                            editDialog.modal();

                            $('.modal-body').css("overflow-y", "auto");

                            $('.btn-primary', editDialog).click(function() {
                                var formVal = form.getValue();
                                Chain(node).createTranslation("edition1", formVal['locale'], {
                                    "title" : formVal['title'],
                                    "description" : formVal['description']
                                }).then(function() {
                                    editDialog.modal('hide');
                                    $('#she-walks-in-beauty-poem-locales').append('<option value="' + formVal['locale'] +'">' + self.LOCALE_LOOKUP[formVal['locale']] +'</option>');
                                    $('#she-walks-in-beauty-poem-locales').val(formVal['locale']).change();
                                });
                            });
                        }
                    });
                });
            },

            setupSheWalksinBeauty : function() {
                var _this = this;
                Samples.defaultClient().queryRepositories({
                    "title": "Multi-Lingual Repository"
                }).keepOne().readBranch('master').readNode('i18n:shewalksinbeauty').then(function() {
                    _this.hideLoadingIndicator();
                    var node = this;
                    this.attachment('default').then(function() {
                        $('#she-walks-in-beauty-poet').append('<img src="' + this.getDownloadUri() + '">');
                    });
                    $('#she-walks-in-beauty-poem-title').html(this.getTitle());
                    $('#she-walks-in-beauty-poem-body').html(this.getDescription().replace(/\n/g,"<br/>"));
                    // prepare locale switcher
                    this.locales("edition1", function(locales) {
                        $.each(locales, function(i,v) {
                            //work around for case issue
                            var vArray = v.split('_');
                            v = vArray[0] + '_' + vArray[1].toUpperCase();
                            var label = _this.LOCALE_LOOKUP[v] ? _this.LOCALE_LOOKUP[v] : v;
                            $('#she-walks-in-beauty-poem-locales').append('<option value="' + v +'">' + label +'</option>');
                        });
                        $('#she-walks-in-beauty-poem-locales').show();
                        _this.setupTranslationContributionForm(locales,node);
                    });
                    $('#she-walks-in-beauty-poem-locales').change(function() {
                        var selectedLocale = $(this).val();
                        Chain(node).readTranslation(selectedLocale).then(function() {
                            $('#she-walks-in-beauty-poem-title').html(this.getTitle());
                            $('#she-walks-in-beauty-poem-body').html(this.getDescription().replace(/\n/g, "<br/>"));
                        });
                    });
                });
            },

            index: function(el) {
                var self = this;

                this.setupSidebar(el);

                this.subscribe(this.subscription, this.refresh);

                this.model(el);

                // render
                self.renderTemplate(el, self.TEMPLATE, function(el) {
                    el.swap();
                    self.showLoadingIndicator($('#she-walks-in-beauty'));
                    self.setupSheWalksinBeauty();
                });
            }
        });

    Ratchet.GadgetRegistry.register("page", Samples.Pages.SheWalksinBeauty);

})(jQuery);