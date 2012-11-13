(function($) {
    Samples.Pages.TraverseExamples = Samples.AbstractPageGadget.extend(
        {
            TEMPLATE : "pages/traverse-examples",

            constructor: function(id, ratchet) {
                this.base(id, ratchet);
            },

            setup: function() {
                this.get("/mini-apps/traverse-examples", this.index);
            },

            setupSidebar: function(el) {
                this.sidebar(Samples.Sidebar(this, "mini-apps-traverse-examples"));
            },

            setupTraverseExamples : function(el) {

                $('#traverse-button', $(el)).click(function() {
                    Samples.defaultClient().trap(
                        function(error) {
                        }).queryRepositories(JSON.parse($('#repository-query-json').val())).keepOne().then(function() {
                            this.readBranch('master').readNode($('#source-node').val()).traverse(JSON.parse($('#traverse-json').val())).nodeCount(
                                function(count) {
                                    $('#traverse-results').empty().append('<h4 class="total-results">Total ' + count + ' traverse results.</h4><ol></ol>');
                                }).nodes().each(function(key, node, index) {
                                    var title = node.get('title') ? node.get('title') : node.getId();
                                    var description = node.get('description') ? node.get('description') : "";
                                    $('<li class="result-item"><div class="item-title" id="' + node.getQName() + '">' + title + '</div><div class="item-description">'
                                        + description + '</div></li>').click(
                                        function() {
                                            Samples.Utils.sourceViewer(title, node);
                                        }).appendTo($('#traverse-results ol'));
                                });
                        });
                });

                var queries = {
                    "example1" :{
                        "title": "Find all nodes around the source node.",
                        "traverse":{
                        }
                    },
                    "example2" :{
                        "title": "Find all nodes of depth 1 away from the source code.",
                        "traverse":{
                            "depth": 1
                        }
                    },
                    "example3" :{
                        "title": "Find all nodes of depth 2 away from the source code with INCOMING creatures:eats association.",
                        "traverse":{
                            "associations": {
                                "creatures:eats": "INCOMING"
                            },
                            "depth": 2
                        }
                    },
                    "example4" :{
                        "title": "Find all nodes of any depth away from the source code with creatures:eats association.",
                        "traverse":{
                            "associations": {
                                "creatures:eats": "ANY"
                            }
                        }
                    },
                    "example5" :{
                        "title": "Find all nodes of depth 1 away from the source code with type 'creatures:creature'.",
                        "traverse":{
                            "types":["creatures:creature"],
                            "depth":1
                        }
                    },
                    "example6" :{
                        "title": "Find all nodes of depth 1 away from the source code with either creatures:eats or a:updated association.",
                        "traverse":{
                            "associations": {
                                "creatures:eats": "ANY",
                                "a:updated":"ANY"
                            },
                            "depth":1
                        }
                    }
                };
                $('#repository-query-json', $(el)).val(JSON.stringify({
                    "title": "Creatures Content"
                }, null, ' '));
                $('#source-node', $(el)).val('creatures:coyote');
                var examplesElem = $('.traverse-examples', $(el));
                for (var key in queries) {
                    $('<li id="' + key + '">' + queries[key].title + '</li>').click(
                        function() {
                            $('#traverse-json').val(JSON.stringify(queries[$(this).attr('id')].traverse, null, ' '));
                            $('#traverse-button').click();
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
                    self.setupTraverseExamples(el);
                    el.swap();
                });
            }

        });

    Ratchet.GadgetRegistry.register("page", Samples.Pages.TraverseExamples);

})(jQuery);