(function($) {
    Samples.Pages.QueryExamples = Samples.AbstractPageGadget.extend(
        {
            TEMPLATE : "pages/query-examples",

            constructor: function(id, ratchet) {
                this.base(id, ratchet);
            },

            setup: function() {
                this.get("/mini-apps/query-examples", this.index);
            },

            setupSidebar: function(el) {
                this.sidebar(Samples.Sidebar(this, "mini-apps-query-examples"));
            },

            setupQueryExamples : function(el) {

                $('#query-button', $(el)).click(function() {
                    Samples.defaultClient().trap(
                        function(error) {
                        }).queryRepositories(JSON.parse($('#repository-query-json').val())).keepOne().then(function() {
                            this.readBranch('master').queryNodes(JSON.parse($('#query-json').val())).count(
                                function(count) {
                                    $('#query-results').empty().append('<h4 class="total-results">Total ' + count + ' query results.</h4><ol></ol>');
                                }).each(function(key, node, index) {
                                    var title = node.getTitle() ? node.getTitle() : node.getId();
                                    var description = node.getDescription() ? node.getDescription() : "";
                                    $('<li class="result-item"><div class="item-title" id="' + node.getQName() + '">' + title + '</div><div class="item-description">'
                                        + description + '</div></li>').click(
                                        function() {
                                            Samples.Utils.sourceViewer(title, node.object);
                                        }).appendTo($('#query-results ol'));
                                });
                        });
                });

                var queries = {
                    "example1" :{
                        "title": "Find all nodes with type 'creatures:creature'.",
                        "query":{
                            "_type" : "creatures:creature"
                        }
                    },
                    "example2" :{
                        "title": "Find all nodes with type 'creatures:creature' and title 'Douglas Squirrel'",
                        "query":{
                            "_type" : "creatures:creature",
                            "title" : "Douglas Squirrel"
                        }
                    },
                    "example3" :{
                        "title": "Find all nodes with type 'creatures:creature' and range field containing both 'USA' and 'Canada'.",
                        "query":{
                            "_type": "creatures:creature",
                            "range":{ "$all": [ "USA", "Canada" ] }
                        }
                    },
                    "example4" :{
                        "title": "Find all 'creatures:creature' type nodes whose classification.Genus field is either 'Tamiasciurus' or 'Canis'.",
                        "query":{
                            "_type": "creatures:creature",
                            "classification.Genus":{"$in": ["Tamiasciurus","Canis"]}
                        }
                    },
                    "example5" :{
                        "title": "Find all 'creatures:creature' type nodes that have lifeExpectancy field with value between 5 and 12.",
                        "query":{
                            "_type": "creatures:creature",
                            "lifeExpectancy":{"$gt": 5, "$lt": 12}
                        }
                    },
                    "example6" :{
                        "title":"Find all 'creatures:creature' type nodes that have classification.Infraclass field.",
                        "query": {
                            "_type": "creatures:creature",
                            "classification.Infraclass": {
                                "$exists": true
                            }
                        }
                    },
                    "example7" :{
                        "title":"Find all 'creatures:creature' type nodes that have (lifeExpectancy mod 7 = 3).",
                        "query":{
                            "_type": "creatures:creature",
                            "lifeExpectancy": {
                                "$mod": [7,3]
                            }
                        }
                    },
                    "example8":{
                        "title":"Find all 'creatures:creature' type nodes whose trophicLevel field is not 'Tertiary Consumer'.",
                        "query":{
                            "_type": "creatures:creature",
                            "trophicLevel": {
                                "$ne" : "Tertiary Consumer"
                            }
                        }
                    },
                    "example9":{
                        "title":"Find all 'creatures:creature' type nodes whose trophicLevel field does not have any value in ['Tertiary Consumer','Primary Consumer'].",
                        "query":{
                            "_type": "creatures:creature",
                            "trophicLevel": {
                                "$nin" : ["Tertiary Consumer","Primary Consumer"]
                            }
                        }
                    },
                    "example10":{
                        "title":"Find all 'creatures:creature' type nodes with lifeExpectancy between 5 and 12 OR or classification.Genus field as either 'Tamiasciurus' or 'Canis'.",
                        "query":{
                            "_type": "creatures:creature",
                            "$or":[
                                {
                                    "trophicLevel": {
                                        "$in" : ["Tertiary Consumer","Primary Consumer"]
                                    }
                                },
                                {
                                    "lifeExpectancy":{"$gt": 5, "$lt": 12}
                                }
                            ]
                        }
                    },
                    "example11":{
                        "title":"Find all 'creatures:creature' type nodes with neither lifeExpectancy between 5 and 12 nor classification.Genus field as either 'Tamiasciurus' or 'Canis'.",
                        "query":{
                            "_type": "creatures:creature",
                            "$nor":[
                                {
                                    "trophicLevel": {
                                        "$in" : ["Tertiary Consumer","Primary Consumer"]
                                    }
                                },
                                {
                                    "lifeExpectancy":{"$gt": 5, "$lt": 12}
                                }
                            ]
                        }
                    },
                    "example12":{
                        "title":"Find all 'creatures:creature' type nodes whose range field has two elements.",
                        "query":{
                            "_type": "creatures:creature",
                            "range" : { "$size": 2 }
                        }
                    },
                    "example13":{
                        "title":"Find all 'creatures:creature' type nodes whose attachHumans field has boolean value.",
                        "query":{
                            "_type": "creatures:creature",
                            "attackHumans" : { "$type": 8 }
                        }
                    },
                    "example14":{
                        "title":"Find all 'creatures:creature' type nodes whose trophicLevel field is not 'Tertiary Consumer'.",
                        "query":{
                            "_type": "creatures:creature",
                            "trophicLevel": {
                                "$ne" : "Tertiary Consumer"
                            }
                        }
                    },
                    "example15":{
                        "title":"Find all 'creatures:creature' type nodes with title matching a given regular expression.",
                        "query":{
                            "_type": "creatures:creature",
                            "title": {
                                "$regex" : "^([a-zA-Z]{7} Squirrel)?$"
                            }
                        }
                    },
                    "example16":{
                        "title":"Find all 'creatures:creature' type nodes with lifeExpectancy not greater than 5.",
                        "query":{
                            "_type": "creatures:creature",
                            "lifeExpectancy":{
                                "$not": {
                                    "$gt": 5
                                }
                            }
                        }
                    }
                };
                $('#repository-query-json', $(el)).val(JSON.stringify({
                    "title": "Creatures Content"
                }, null, ' '));
                var examplesElem = $('.query-examples', $(el));
                for (var key in queries) {
                    $('<li id="' + key + '">' + queries[key].title + '</li>').click(
                        function() {
                            $('#query-json').val(JSON.stringify(queries[$(this).attr('id')].query, null, ' '));
                            $('#query-button').click();
                        }).appendTo(examplesElem);
                }
            },

            index: function(el) {
                var self = this;

                this.setupSidebar(el);

                this.subscribe(this.subscription, this.refresh);

                this.model(el);

                this.prettifyCode(el);

                // render
                self.renderTemplate(el, self.TEMPLATE, function(el) {
                    self.setupQueryExamples(el);
                    el.swap();
                });
            }

        });

    Ratchet.GadgetRegistry.register("page", Samples.Pages.QueryExamples);

})(jQuery);