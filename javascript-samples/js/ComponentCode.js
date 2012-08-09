(function($) {
    Samples.ComponentCode = {
        "chaining" : {
            "title" : "Chaining",
            "description" : "<p>Chaining is a technique that Cloud CMS JavaScript driver provides for chaining multiple method calls. The uniqueness of Cloud CMS chaining is that it can be used for chaining Ajax-style calls together as well."
                + "</p><p>Those ajax calls can be serial or parallel or mix of both. For serials calls, the next Ajax call will not be invoked until it gets return from the previous call. Parallel calls are independent and can be invoked all at once."
                + " The neat thing with Cloud CMS chaining technique is that it will let you know when all parallel calls are finished and you can then execute your processing code if needed.</p>",
            "samples" : {
                "chaining01" : {
                    "title" : "Create an empty chain",
                    "description" : "This sample shows you how to create an empty chain and use then method.",
                    "code" : "Chain().then(function() { \n" +
                        "   var data = 'Marry ';\n" +
                        "   $('#chaining01-result').html(data);\n" +
                        "   this.then(function() {\n" +
                        "       data += 'has a little ';\n" +
                        "       $('#chaining01-result').append('<br/>' + data);\n" +
                        "   });\n" +
                        "   this.then(function() {\n" +
                        "       data += 'lamb.';\n" +
                        "       $('#chaining01-result').append('<br/>' + data);\n" +
                        "   });\n" +
                        "});"
                },
                "chaining02" : {
                    "title" : "Create and run serial sub chains",
                    "description" : "This sample creates two sub chains that run them back-to-back.",
                    "code" : "Chain().then(function() { \n" +
                        "   var data1 = 'Marry ';\n" +
                        "   var data2 = 'John ';\n" +
                        "   $('#chaining02-result').html(data1 + ' -- ' + data2);\n" +
                        "   this.subchain().then(function() {\n" +
                        "       data1 += 'has a little ';\n" +
                        "       $('#chaining02-result').append('<br/>' + data1 + ' -- ' + data2);\n" +
                        "   }).then(function() {\n" +
                        "       data1 += 'lamb.';\n" +
                        "       $('#chaining02-result').append('<br/>' + data1 + ' -- ' + data2);\n" +
                        "   });\n" +
                        "   this.subchain().then(function() {\n" +
                        "       data2 += 'has a big ';\n" +
                        "       $('#chaining02-result').append('<br/>' + data1 + ' -- ' + data2);\n" +
                        "   }).then(function() {\n" +
                        "       data2 += 'dog.';\n" +
                        "       $('#chaining02-result').append('<br/>' + data1 + ' -- ' + data2);\n" +
                        "   });\n" +
                        "});"
                },
                "chaining03" : {
                    "title" : "Create and run parallel sub chains",
                    "description" : "This sample creates two parallel chains that run concurrently and then print the output when both sub-chains complete.",
                    "code" : "Chain().then(function() { \n" +
                        "   var data1 = 'Marry ';\n" +
                        "   var data2 = 'John ';\n" +
                        "   $('#chaining03-result').html(data1 + ' -- ' + data2);\n" +
                        "   var f1 = function() {\n" +
                        "       this.then(function() {\n" +
                        "           data1 += 'has a little ';\n" +
                        "           $('#chaining03-result').append('<br/>' + data1 + ' -- ' + data2);\n" +
                        "       }).then(function() {\n" +
                        "           data1 += 'lamb.';\n" +
                        "           $('#chaining03-result').append('<br/>' + data1 + ' -- ' + data2);\n" +
                        "       });\n" +
                        "   };\n" +
                        "   var f2 = function() {\n" +
                        "       this.then(function() {\n" +
                        "           data2 += 'has a big ';\n" +
                        "           $('#chaining03-result').append('<br/>' + data1 + ' -- ' + data2);\n" +
                        "       }).then(function() {\n" +
                        "           data2 += 'dog.';\n" +
                        "           $('#chaining03-result').append('<br/>' + data1 + ' -- ' + data2);\n" +
                        "       });\n" +
                        "   };\n" +
                        "   this.then([f1,f2]).then(function() {\n" +
                        "       $('#chaining03-result').append('<br/>Final :: ' + data1 + ' -- ' + data2);\n" +
                        "   });\n" +
                        "});"
                } ,
                "chaining04" : {
                    "title" : "Create a chain with a proxied object",
                    "description" : "This sample shows you how to create a chain with an underlying proxied object.",
                    "code" : "Chain().then(function() { \n" +
                        "   var Consumer = function() {\n" +
                        "       this.coins = 200;\n" +
                        "       $('#chaining04-result').html('I had '+ this.coins + ' coins.');\n" +
                        "   };\n" +
                        "   Consumer.prototype = {\n" +
                        "       deposit: function(){\n" +
                        "           var bank = new Bank(this.coins);\n" +
                        "           $('#chaining04-result').append('<br/>I saved my '+ this.coins + ' coins to a bank.');\n" +
                        "           return this.subchain(bank);\n" +
                        "       }\n" +
                        "   };\n" +
                        "   var Bank = function(coins) {\n" +
                        "       var coins = coins;\n" +
                        "       this.doesSomethingIhaveNoIdea = function(){\n" +
                        "           coins--;\n" +
                        "       };\n" +
                        "       this.balance = function(){\n" +
                        "           return coins;\n" +
                        "       };\n" +
                        "   };\n" +
                        "   Bank.prototype = {\n" +
                        "       invest: function(){\n" +
                        "            $('#chaining04-result').append('<br/>Bank invested my coins.');\n" +
                        "            return this.subchain().then(function() {\n" +
                        "                this.doesSomethingIhaveNoIdea();\n" +
                        "           }).then(function() {\n" +
                        "                this.doesSomethingIhaveNoIdea();\n" +
                        "            }).then(function() {\n" +
                        "                this.doesSomethingIhaveNoIdea();\n" +
                        "           });\n" +
                        "        }\n" +
                        "   };\n" +
                        "   Chain(new Consumer()).deposit().invest().then(function() {\n" +
                        "       $('#chaining04-result').append('<br/>Now I have '+ this.balance() + ' coins.');\n" +
                        "   });\n" +
                        "});"
                },
                "chaining05" : {
                    "title" : "Create and run a chain with Cloud CMS objects",
                    "description" : "This sample shows you how to create and run a chain with Cloud CMS objects.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'chaining05');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function() {\n" +
                        "   this.createNode();\n" +
                        "   this.createNode();\n" +
                        "   this.then(function() {\n" +
                        "       $('#chaining05-result').html('Successfully created two new nodes.');\n" +
                        "   })\n" +
                        "});"
                }
            }
        },
        "map" : {
            "title" : "Map",
            "description" : "Map is a common data object that Cloud CMS Javascript Driver uses extensively. The driver provides a rich set of utilities for handling the map object such as iteration, selection, filtering etc.",
            "samples" : {
                "map01" : {
                    "title" : "Iterate over a map object using each method",
                    "description" : "This sample shows you how to iterate over a map object using each method. The callback within each method will be fired in serial.",
                    "code" : "$('#map01-result').html('List of repositories');\n" +
                        "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'map01');\n" +
                        "}).listRepositories().each(function(key,val,index) {\n" +
                        "   $('#map01-result').append('<br/>' + index + ' :: ' + key + ' :: ' + val.getTitle());\n" +
                        "});"
                },
                "map02" : {
                    "title" : "Iterate over a map object using eachX method",
                    "description" : "This sample shows you how to iterate over a map object using eachX method. The callback within each method will be fired in parallel.",
                    "code" : "$('#map02-result').html('List of repositories');\n" +
                        "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'map02');\n" +
                        "}).listRepositories().eachX(function(key,val,index) {\n" +
                        "   this.readBranch('master');" +
                        "   $('#map02-result').append('<br/>' + index + ' :: ' + key + ' :: ' + val.getTitle());\n" +
                        "});"
                },
                "map03" : {
                    "title" : "Filter map elements",
                    "description" : "This sample shows you how to iterate over a map object and applies the callback filter function to each element. It should hand back true if it wants to keep the value and false to remove it.",
                    "code" : "$('#map03-result').html('Filtered list of repositories');\n" +
                        "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'map03');\n" +
                        "}).listRepositories().filter(function() {\n" +
                        "   return this.getTitle() != 'Sample Repository';\n" +
                        "}).each(function(key,val,index) {\n" +
                        "   $('#map03-result').append('<br/>' + index + ' :: ' + key + ' :: ' + val.getTitle());\n" +
                        "});"
                },
                "map04" : {
                    "title" : "Limit a map",
                    "description" : "This sample shows you how to limit number of elements of a map.",
                    "code" : "$('#map04-result').html('List of repositories');\n" +
                        "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'map04');\n" +
                        "}).listRepositories().limit(2).each(function(key,val,index) {\n" +
                        "   $('#map04-result').append('<br/>' + index + ' :: ' + key + ' :: ' + val.getTitle());\n" +
                        "});"
                },
                "map05" : {
                    "title" : "Keep one element of a map",
                    "description" : "This sample shows you how to only keep the first element of a map.",
                    "code" : "$('#map05-result').html('List of repositories');\n" +
                        "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'map04');\n" +
                        "}).listRepositories().keepOne().then(function() {\n" +
                        "   $('#map05-result').append('<br/>' + this.getTitle());\n" +
                        "});"
                },
                "map06" : {
                    "title" : "Count total number of elements of a map",
                    "description" : "This sample shows you how to count total number of elements of a map.",
                    "code" : "$('#map06-result').html('');\n" +
                        "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'map04');\n" +
                        "}).listRepositories().count(function(count) {\n" +
                        "   $('#map06-result').append('Found ' + count + ' repositories.');\n" +
                        "});"
                },
                "map07" : {
                    "title" : "Count total number of rows",
                    "description" : "This sample shows you how to count total number of rows.",
                    "code" : "$('#map07-result').html('');\n" +
                        "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'map04');\n" +
                        "}).listRepositories({\n" +
                        "   'limit' : 1\n" +
                        "}).count(function(count) {\n" +
                        "   $('#map07-result').append('Returned ' + count + ' repositories.');\n" +
                        "}).totalRows(function(totalRows) {\n" +
                        "   $('#map07-result').append('<br/>But it has ' + totalRows + ' repositories.');\n" +
                        "});"
                },
                "map08" : {
                    "title" : "Select a map element",
                    "description" : "This sample shows you how to select an individual map element and use it to continue the chain.",
                    "code" : "$('#map08-result').html('');\n" +
                        "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'map04');\n" +
                        "}).listRepositories().select(Samples.sampleRepository).then(function() {\n" +
                        "   $('#map08-result').append('Selected repository ' + this.getTitle() + '.');\n" +
                        "});"
                }
            }
        },
        "error" : {
            "title" : "Error Handling",
            "description" : "You can register as many error handlers as you like. Whenever an error happens, it will try to walk up the chain and find the closest error handler. If the error handler return false, it will end th chain.",
            "samples" : {
                "error01" : {
                    "title" : "Register single error handler",
                    "description" : "This sample shows you how to register a single error handler.",
                    "code" : "$('#error01-result').html('');\n" +
                        "Samples.defaultClient().trap(function(error) {\n" +
                        "    $('#error01-error').addClass('alert alert-error').empty().html(error.message);\n" +
                        "}).readRepository('SOMETHING');"
                },
                "error02" : {
                    "title" : "Register multiple error handlers",
                    "description" : "This sample shows you how to register multiple error handlers and show which handler will be invoked.",
                    "code" : "$('#error02-result').html('');\n" +
                        "Samples.defaultClient().trap(function(error) {\n" +
                        "    $('#error02-error').addClass('alert alert-error').empty().html(error.message);\n" +
                        "}).readRepository(Samples.sampleRepository).trap(function(error) {\n" +
                        "    $('#error02-error').addClass('alert alert-error').empty().html('Got error :: ' + error.message);\n" +
                        "}).readBranch('SOMEBRANCH')"
                }
            }
        },
        "repository" : {
            "title" : "Repository",
            "description" : "Cloud CMS repository is a workspace where you can place your content. Each repository is isolated from any of the other repositories in the Cloud CMS so you can feel free to create a repository and then do anything you'd like with it.",
            "samples" : {
                "repository01" : {
                    "title" : "Create a new repository",
                    "description" : "This sample shows you how to create a new repository within your platform.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'repository01');\n" +
                        "}).createRepository({\n" +
                        "   'title' : 'Repository '+new Date().getTime(),\n" +
                        "   'tags' : ['abc']\n" +
                        "}).then(function() {\n" +
                        "   $('#repository01-result').html('Successfully created a new repository ' + this.getId());\n" +
                        "});"
                },
                "repository02" : {
                    "title" : "Update an existing repository",
                    "description" : "This sample shows you how to update an existing repository.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'repository02');\n" +
                        "}).readRepository(Samples.sampleRepository).then(function() {                                 \n" +
                        "   this.object['title'] = this.getTitle() + ' updated.';                                \n" +
                        "   this.update().reload().then(function() {\n" +
                        "       $('#repository02-result').html('Successfully updated repository ' + this.getTitle());  \n" +
                        "   })\n" +
                        "});"
                },
                "repository03" : {
                    "title" : "Query repositories",
                    "description" : "Cloud CMS supports querying repositories by their property or combination of multiple properties. This examples shows you how to create such query and how to process query results.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'repository03');\n" +
                        "}).queryRepositories({           \n" +
                        "   'sdk_bundle': 'sdk-sample-repository'      \n" +
                        "}).count(function(count) {                                 \n" +
                        "   $('#repository03-result').html('Found ' + count+ ' repositories whose sdk_bundle property has value \'sdk-sample-repository\'.');  \n" +
                        "});"
                },
                "repository04" : {
                    "title" : "List repositories",
                    "description" : "This sample shows you how to find the latest repository.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'repository04');\n" +
                        "}).listRepositories({           \n" +
                        "   'skip': 0,      \n" +
                        "   'limit': 1,      \n" +
                        "   'sort': {'_system.modified_on.ms': -1}      \n" +
                        "}).keepOne().then(function() {                                 \n" +
                        "   $('#repository04-result').html('Latest repository was modified at ' + this.getSystemMetadata().getModifiedOn().getTimestamp());  \n" +
                        "});"
                },
                "repository05" : {
                    "title" : "Delete a repository",
                    "description" : "This sample shows you how to delete an existing repository.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'repository05');\n" +
                        "}).createRepository({           \n" +
                        "   'title' : 'Repository '+new Date().getTime()           \n" +
                        "}).then(function() {     \n" +
                        "   var repositoryId = this.getId(); \n" +
                        "   this.del().then(function() {                                \n" +
                        "       $('#repository05-result').html('Successfully deleted repository ' + repositoryId);  \n" +
                        "   }); \n" +
                        "});"
                }
            }
        },
        "branch" : {
            "title" : "Branch",
            "description" : "Branches describe units of work or changes within a repository. When a new repository is created, it comes with a single master branch which starts at the root of the repository. When user starts to make changes to the repository, he can work on the master branch or create his own branch either from master branch or any other existing branch. Each branch have a root changeset (their starting point) and a head changeset (where the tip currently resides).",
            "samples" : {
                "branch01" : {
                    "title" : "Find master branch",
                    "description" : "This sample shows you how to find the master branch of a given repository.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'branch01');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master')\n.then(function() {\n" +
                        "   $('#branch01-result').html('Successfully found master branch of repository ' \n+ Samples.sampleRepository \n+ '.<br> The tip changeset of the master branch is '  + this.getTip() + '.');\n" +
                        "});"
                },
                "branch02" : {
                    "title" : "Create a new branch",
                    "description" : "This sample shows you how to create a new branch based on the tip changeset of the master branch.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'branch02');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function() {\n" +
                        "   this.subchain(this.getRepository()).createBranch(this.getTip()).then(function() {\n" +
                        "       $('#branch02-result').html('Successfully created a new branch based on the tip changeset of the master branch.' + '.<br> The tip changeset of the new branch is '  + this.getTip() + '.');\n" +
                        "   }); \n" +
                        "});"
                },
                "branch03" : {
                    "title" : "Update an existing branch",
                    "description" : "This sample shows you how to update an existing branch.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'branch03');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function() {\n" +
                        "   this.object['title'] = 'Master branch updated.';                                \n" +
                        "   this.update().reload().then(function() {\n" +
                        "       $('#branch03-result').html('Successfully updated branch ' + this.getTitle());  \n" +
                        "   })\n" +
                        "});"
                },
                "branch04" : {
                    "title" : "Query branches",
                    "description" : "This examples shows you how to query branches of a given repository and how to process query results.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'branch04');\n" +
                        "}).readRepository(Samples.sampleRepository).queryBranches({\n" +
                        "   'type': 'CUSTOM'\n" +
                        "}).count(function(count) {\n" +
                        "   $('#branch04-result').html('Found ' + count+ ' custom branches of repository ' + Samples.sampleRepository + '.');  \n" +
                        "});"
                },
                "branch05" : {
                    "title" : "List branches",
                    "description" : "This sample shows you how to get the total number of branches without getting the full list of branches. You can use the same pagination expression to get total count of other type of Cloud CMS objects.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'branch05');\n" +
                        "}).readRepository(Samples.sampleRepository).listBranches({\n" +
                        "   'skip' : 0,\n" +
                        "   'limit' : 1\n" +
                        "}).totalRows(function(totalRows) {                                 \n" +
                        "   $('#branch05-result').html('Repository ' + Samples.sampleRepository + ' has ' + totalRows + ' branches.');  \n" +
                        "});"
                }
            }
        },
        "node" : {
            "title" : "Node",
            "description" : "Node is a branch scope object that holds the data that you want to store in Cloud CMS. Each node contains a JSON document for properties and can have one or multiple attachments for binary data.",
            "samples" : {
                "node01" : {
                    "title" : "Create a new node",
                    "description" : "This sample shows you how to create a new node with custom properties as well as tags.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node01');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').createNode({\n" +
                        "   'title' : 'Test node',\n" +
                        "   'description' : 'Test node description.',\n" +
                        "   'custom1' : 'Custom properties 1',\n" +
                        "   'custom2' : {'prop1' : 'va1', 'prop2' : 'val2'},\n" +
                        "   'tags' : ['tag1','tag2']\n" +
                        "}).then(function() {\n" +
                        "   $('#node01-result').html('Successfully created a new node ' + this.getId() + '.');\n" +
                        "});"
                },
                "node02" : {
                    "title" : "Update an existing node",
                    "description" : "This sample shows you how to update an existing node.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'node02');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').createNode({\n" +
                        "   'title' : 'Test node 2',\n" +
                        "   'description' : 'Test node description 2.',\n" +
                        "   'custom1' : 'Custom properties 1',\n" +
                        "   'custom2' : {'prop1' : 'va1', 'prop2' : 'val2'},\n" +
                        "   'tags' : ['tag1','tag2']\n" +
                        "}).then(function() {\n" +
                        "   this.object['custom2']['prop1'] = 'updated val';\n" +
                        "   this.update().reload().then(function() {\n" +
                        "       $('#node02-result').html('Successfully updated node ' + this.getTitle());\n" +
                        "   })\n" +
                        "});"
                },
                "node03" : {
                    "title" : "Query nodes",
                    "description" : "This examples shows you how to query nodes of a given branch and how to process query results. For more query examples, please visit <a href='#/min-apps/query-examples'>Query Examples</a> min app.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'node03');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').queryNodes({\n" +
                        "   'tags' : { '$all': [ 'tag1','tag2' ] }\n" +
                        "}).count(function(count) {\n" +
                        "   $('#node03-result').html('Found ' + count+ ' nodes tagged with tag1 and tag2.');  \n" +
                        "});"
                },
                "node04" : {
                    "title" : "List nodes",
                    "description" : "This sample shows you how to get the list of 5 nodes sorted by title in descending order.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'node04');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').queryNodes({},{\n" +
                        "   'skip' : 0,\n" +
                        "   'limit' : 5,\n" +
                        "   'sort' : {'title' : -1}\n" +
                        "}).each(function(key,val,index) {\n" +
                        "   $('#node04-result').append('<li>' + val.getTitle() + '</li>');\n" +
                        "});"
                }
            }
        },
        "node-attachment" : {
            "title" : "Node Attachments",
            "description" : "A node can have one or multiple attachments for binary data.",
            "samples" : {
                "node-attachment01" : {
                    "title" : "List node attachments",
                    "description" : "This example shows you how to get the list of node attachments.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-attachment01');\n" +
                        "}).queryRepositories({\n" +
                        "   'sdk_version': '0.1',\n" +
                        "   'sdk_bundle': 'creatures'\n" +
                        "}).keepOne().readBranch('master').readNode('creatures:nuthatch').listAttachments().then(function() {\n" +
                        "   $('#node-attachment01-result').empty();\n" +
                        "   this.each(function() {\n" +
                        "       $('#node-attachment01-result').append('<img src=\"' + this.getDownloadUri() +'\">');\n" +
                        "   });\n" +
                        "});"
                },
                "node-attachment02" : {
                    "title" : "Create a new text attachment",
                    "description" : "This example shows you how to create a new text attachment and then download it and retrieve its properties.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-attachment02');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').createNode({\n" +
                        "   'title': 'test' \n" +
                        "}).then(function() {\n" +
                        "   this.attach('attachmentId1', 'text/plain', 'first attachment');\n" +
                        "   this.attachment('attachmentId1').then(function() {\n" +
                        "       $('#node-attachment02-result').empty();\n" +
                        "       this.download(function(data) {\n" +
                        "           $('#node-attachment02-result').append('<div>data: ' + data + '</div>');\n" +
                        "       });\n" +
                        "       $('#node-attachment02-result').append('<div>length: ' + this.getLength() + '</div>');\n" +
                        "       $('#node-attachment02-result').append('<div>type: ' + this.getContentType() + '</div>');\n" +
                        "   });\n" +
                        "});"
                }
            }
        },
        "node-folder" : {
            "title" : "Folder",
            "description" : "As a graph repository, Cloud CMS also provides support for folder and a one-way association type, a:child, for relating a folder to its children.",
            "samples" : {
                "node-folder01" : {
                    "title" : "Find root folder",
                    "description" : "This example shows you how to find the root folder of a branch.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-folder01');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').readNode('r:root').then(function() {\n" +
                        "   $('#node-folder01-result').html('Found root folder ' + this.getId());\n" +
                        "});"
                },
                "node-folder02" : {
                    "title" : "Create a new folder and add a child",
                    "description" : "This example shows you how to create a new folder and add a child to it. Keep in mind, the new folder doesn't have to placed under root folder or any other folder.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-folder02');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').createContainer({\n" +
                        "   'title' : 'Parent Node'\n" +
                        "}).createChild({\n" +
                        "   'title' : 'Child Node'\n" +
                        "}).then(function() {\n" +
                        "   $('#node-folder02-result').html('Successfully added a folder and a child.');\n" +
                        "});"
                },
                "node-folder03" : {
                    "title" : "List children of a folder",
                    "description" : "This example users a different approach to create folder and associate it with its child. It will then show you how to retrieve list of children of a folder",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-folder03');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function() {\n" +
                        "   var folder = null;\n" +
                        "   this.createContainer({\n" +
                        "       'title' : 'Parent Node'\n" +
                        "   }).then(function () {\n" +
                        "       folder = this;\n" +
                        "   });\n" +
                        "   this.then(function() {\n" +
                        "       this.createNode({\n" +
                        "           'title' : 'Child Node'\n" +
                        "       }).childOf(folder);\n" +
                        "       this.subchain(folder).listChildren().count(function(count) {\n" +
                        "           $('#node-folder03-result').html('The new folder has ' + count + ' child(ren).');\n" +
                        "       })\n" +
                        "   });\n" +
                        "});"
                }
            }
        },
        "node-fulltext" : {
            "title" : "Full Text Search",
            "description" : "Cloud CMS supports full text search of node properties as well as node attachments.",
            "samples" : {
                "node-fulltext01" : {
                    "title" : "Search by keyword",
                    "description" : "This example shows you how to find the nodes by keyword.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-fulltext01');\n" +
                        "}).queryRepositories({\n" +
                        "   'sdk_version': '0.1',\n" +
                        "   'sdk_bundle': 'creatures'\n" +
                        "}).keepOne().readBranch('master').searchNodes('Pika').count(function(count) {\n" +
                        "   $('#node-fulltext01-result').html('Found ' + count + ' nodes with keyword Pika.');\n" +
                        "});"
                },
                "node-fulltext02" : {
                    "title" : "Combine full text search with query and traverse",
                    "description" : "This example shows you how to use find method to combine full text search with query.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-fulltext02');\n" +
                        "}).queryRepositories({\n" +
                        "   'sdk_version': '0.1',\n" +
                        "   'sdk_bundle': 'creatures'\n" +
                        "}).keepOne().readBranch('master').find({\n" +
                        "   'search' : 'Pika',\n" +
                        "   'query' : { '_type' : 'creatures:creature'}\n" +
                        "}).count(function(count) {\n" +
                        "   $('#node-fulltext02-result').html('Found ' + count + ' nodes with type creature:creature and keyword Pika.');\n" +
                        "});"
                }
            }
        },
        "node-audit" : {
            "title" : "Audit Records",
            "description" : "Cloud CMS keeps auditing records for all nodes.",
            "samples" : {
                "node-audit01" : {
                    "title" : "List node audit records",
                    "description" : "This examples shows you how to retrieve last 5 audit records of a node.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-audit01');\n" +
                        "}).queryRepositories({\n" +
                        "   'sdk_version': '0.1',\n" +
                        "   'sdk_bundle': 'creatures'\n" +
                        "}).keepOne().readBranch('master').readNode('creatures:nuthatch').listAuditRecords({\n" +
                        "   'skip' : 0,\n" +
                        "   'limit' : 5,\n" +
                        "   'sort' : { '_system.modified_on.ms' : -1}\n" +
                        "}).then(function() {\n" +
                        "   $('#node-audit01-result').empty();\n" +
                        "   this.each(function() {\n" +
                        "       $('#node-audit01-result').append('<li>' + this.getAction() + ' By ' + this.getPrincipalId() + ' @ ' + this.getSystemMetadata().getModifiedOn().getTimestamp() + '</li>');\n" +
                        "   });\n" +
                        "});"
                }
            }
        },
        "node-traverse" : {
            "title" : "Traverse",
            "description" : "Cloud CMS lets you traverse from a given node within the node graph through a traversal expression which contains association type, association direction or depth. For more traverse examples, please visit <a href='#/mini-apps/traverse-examples'>Traverse Examples</a> min app.",
            "samples" : {
                "node-traverse01" : {
                    "title" : "Traverse from a given node",
                    "description" : "This examples shows you how to retrieve list of nodes that are one-step away from a given node.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-traverse01');\n" +
                        "}).queryRepositories({\n" +
                        "   'sdk_version': '0.1',\n" +
                        "   'sdk_bundle': 'creatures'\n" +
                        "}).keepOne().readBranch('master').readNode('creatures:nuthatch').traverse({\n" +
                        "    'depth': 1\n" +
                        "}).nodes().then(function() {\n" +
                        "   $('#node-traverse01-result').empty().html('<div>List of neighbors</div>');\n" +
                        "   this.each(function() {\n" +
                        "       $('#node-traverse01-result').append('<li>' + this.getTitle() + '</li>');\n" +
                        "   });\n" +
                        "});"
                }
            }
        },
        "node-stat" : {
            "title" : "Statistics",
            "description" : "Cloud CMS automatically creates and computes statistics on a node for its associations and other pre-defined metrics such as average rating, total number of ratings etc.",
            "samples" : {
                "node-stat01" : {
                    "title" : "Retrieve node statistics",
                    "description" : "This examples shows you how to retrieve node statistics.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-stat01');\n" +
                        "}).queryRepositories({\n" +
                        "   'sdk_version': '0.1',\n" +
                        "   'sdk_bundle': 'alpaca-examples'\n" +
                        "}).keepOne().readBranch('master').readNode('alpacaexamples:binderpromotion').then(function() {\n" +
                        "   $('#node-stat01-result').empty().html('<div>List of stats</div>');\n" +
                        "   $.each(this.stats(), function(key,val) {\n" +
                        "       $('#node-stat01-result').append('<li>' + key + ' :: ' + val + '</li>');\n" +
                        "   });\n" +
                        "});"
                }
            }
        },
        "node-association" : {
            "title" : "Association",
            "description" : "Cloud CMS nodes can be connected with each other through associations. We can create as many associations as we want between two nodes. Each association involves a source node and a target node. Association can have its own properties since association is node as well. There are two basic types of associations, directed and undirected. For more association examples, please visit <a href='#/min-apps/food-web'>Food Web</a> min app.",
            "samples" : {
                "node-association01" : {
                    "title" : "Create a new directed association",
                    "description" : "This sample shows you how to create a directed association between two nodes.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-association01');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function(){\n" +
                        "   var destNode, srcNode1, srcNode2;\n" +
                        "   this.createNode({'title' : 'Test node destination'}).then(function() {\n" +
                        "       destNode = this;\n" +
                        "   });\n" +
                        "   this.createNode({'title' : 'Test node source 1'}).then(function() {\n" +
                        "       srcNode1 = this;\n" +
                        "   });\n" +
                        "   this.createNode({'title' : 'Test node source 2'}).then(function() {\n" +
                        "       srcNode2 = this;\n" +
                        "   });\n" +
                        "   this.then(function() {\n" +
                        "       this.subchain(srcNode1).associate(destNode,{'testPro1':'test val1'}).then(function() {\n" +
                        "           $('#node-association01-result').html('Successfully created a new directed association.');\n" +
                        "       });\n" +
                        "       this.subchain(destNode).associateOf(srcNode2,{'testPro2':'test val2'}).then(function() {\n" +
                        "           $('#node-association01-result').append('<br/>Successfully created another new directed association.');\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "node-association02" : {
                    "title" : "Create a new undirected association",
                    "description" : "This sample shows you how to create a undirected association between two nodes.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-association02');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function(){\n" +
                        "   var destNode, srcNode;\n" +
                        "   this.createNode({'title' : 'Test node destination'}).then(function() {\n" +
                        "       destNode = this;\n" +
                        "   });\n" +
                        "   this.createNode({'title' : 'Test node source'}).then(function() {\n" +
                        "       srcNode = this;\n" +
                        "   });\n" +
                        "   this.then(function() {\n" +
                        "       this.subchain(srcNode).associate(destNode,{'testPro':'test val'},true).then(function() {\n" +
                        "           $('#node-association02-result').html('Successfully created a new undirected association.');\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "node-association03" : {
                    "title" : "Create a new directed association with custom type",
                    "description" : "This sample shows you how to create a new directed association between two nodes. Instead of using the default a:child type, we will use our own custom association type.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-association03');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function(){\n" +
                        "   var obj = {\n" +
                        "       'title':'custom type',\n" +
                        "       '_type':'d:association',\n" +
                        "       'type':'object',\n" +
                        "       'description':'Custom content type',\n" +
                        "       'properties':{}\n" +
                        "   };\n" +
                        "   var destNode, srcNode, customType;\n" +
                        "   this.createNode({'title' : 'Test node destination'}).then(function() {\n" +
                        "       destNode = this;\n" +
                        "   });\n" +
                        "   this.createNode({'title' : 'Test node source'}).then(function() {\n" +
                        "       srcNode = this;\n" +
                        "   });\n" +
                        "   this.then(function() {\n" +
                        "       this.generateQName(obj, function(qname) {\n" +
                        "           obj['_qname'] = qname;\n" +
                        "           this.createNode(obj);\n" +
                        "           this.subchain(srcNode).associate(destNode,qname).then(function() {\n" +
                        "               $('#node-association03-result').html('Successfully created a new directed association with custom type ' + qname + '.');\n" +
                        "           });\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "node-association04" : {
                    "title" : "Update an existing association",
                    "description" : "This sample shows you how to update an existing association.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'node-association04');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function(){\n" +
                        "   var destNode, srcNode;\n" +
                        "   this.createNode({'title' : 'Test node destination'}).then(function() {\n" +
                        "       destNode = this;\n" +
                        "   });\n" +
                        "   this.createNode({'title' : 'Test node source'}).then(function() {\n" +
                        "       srcNode = this;\n" +
                        "   });\n" +
                        "   this.then(function() {\n" +
                        "       this.subchain(srcNode).associate(destNode,{'testPro1':'test val1'}).then(function() {\n" +
                        "           $('#node-association04-result').html('Successfully created a new directed association.');\n" +
                        "       });\n" +
                        "       this.subchain(srcNode).outgoingAssociations('a:child').keepOne().then(function() {\n" +
                        "           this.object['testPro1'] = 'test val1 updated';\n" +
                        "           this.update().then(function() {\n" +
                        "               $('#node-association04-result').append('<br/>Successfully updated an existing association.');\n" +
                        "           });\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "node-association05" : {
                    "title" : "List node associations",
                    "description" : "This sample shows you how to get list of associations of a given node.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-association05');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function(){\n" +
                        "   var destNode, srcNode1, srcNode2;\n" +
                        "   this.createNode({'title' : 'Test node destination'}).then(function() {\n" +
                        "       destNode = this;\n" +
                        "   });\n" +
                        "   this.createNode({'title' : 'Test node source 1'}).then(function() {\n" +
                        "       srcNode1 = this;\n" +
                        "   });\n" +
                        "   this.createNode({'title' : 'Test node source 2'}).then(function() {\n" +
                        "       srcNode2 = this;\n" +
                        "   });\n" +
                        "   this.then(function() {\n" +
                        "       this.subchain(srcNode1).associate(destNode);\n" +
                        "       this.subchain(destNode).associateOf(srcNode2);\n" +
                        "       this.subchain(srcNode1).outgoingAssociations('a:child').count(function(count) {\n" +
                        "           $('#node-association05-result').html('<br/>Found ' + count + ' outgoing association of source node 1.');\n" +
                        "       });\n" +
                        "       this.subchain(destNode).incomingAssociations('a:child').count(function(count) {\n" +
                        "           $('#node-association05-result').append('<br/>Found ' + count + ' incoming association of destination node.');\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "node-association06" : {
                    "title" : "Delete an association",
                    "description" : "This sample shows you how to an existing association.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-association06');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function(){\n" +
                        "   var destNode, srcNode;\n" +
                        "   this.createNode({'title' : 'Test node destination'}).then(function() {\n" +
                        "       destNode = this;\n" +
                        "   });\n" +
                        "   this.createNode({'title' : 'Test node source'}).then(function() {\n" +
                        "       srcNode = this;\n" +
                        "   });\n" +
                        "   this.then(function() {\n" +
                        "       this.subchain(srcNode).associate(destNode).then(function() {\n" +
                        "           $('#node-association06-result').html('Successfully created a new undirected association.');\n" +
                        "       });\n" +
                        "       this.subchain(srcNode).unassociate(destNode).then(function() {\n" +
                        "           $('#node-association06-result').append('<br/>Successfully unassociated the undirected association.');\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                }
            }
        },
        "node-type" : {
            "title" : "Type",
            "description" : "Type is a special node that defines format of JSON data using JSON schema. Type property, d:type, is required for all nodes. When you create a new node, Cloud CMS will assume it is n:node type if the d:type property is not specified.",
            "samples" : {
                "node-type01" : {
                    "title" : "Create a new type",
                    "description" : "This sample shows you how to create a custom type that extends the default n:node type. Once the new type is created, it will also create a new node using the new type.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-type01');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function(){\n" +
                        "   var newTypeObj = {\n" +
                        "       'title' : 'Custom Type', \n" +
                        "       'description' : 'This is a new type', \n" +
                        "       '_parent' : 'n:node', \n" +
                        "       '_type' : 'd:type', \n" +
                        "       'type' : 'object', \n" +
                        "       'properties' : { \n" +
                        "           'customProp' : {\n" +
                        "               'type' : 'string'\n" +
                        "           }\n" +
                        "       }\n" +
                        "   };\n" +
                        "   this.createNode(newTypeObj).then(function() {\n" +
                        "       var typeQName = this.getQName();\n" +
                        "       $('#node-type01-result').html('Successfully created a new type with qname ' + typeQName + '.');\n" +
                        "       this.subchain(this.getBranch()).createNode({\n" +
                        "           'title' : 'Test Node', \n" +
                        "           '_type' : typeQName, \n" +
                        "           'properties' : {\n" +
                        "               'customProp' : 'test'\n" +
                        "           }\n" +
                        "       }).then(function() {\n" +
                        "           $('#node-type01-result').append('<br/>Successfully created a new node with type ' + this.getTypeQName() + '.');\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "node-type02" : {
                    "title" : "Read and update a type",
                    "description" : "This sample shows you how to read an existing type and then update it.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-type02');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function(){\n" +
                        "   var newTypeObj = {\n" +
                        "       'title' : 'Custom Type', \n" +
                        "       'description' : 'This is a new type', \n" +
                        "       '_parent' : 'n:node', \n" +
                        "       '_type' : 'd:type', \n" +
                        "       'type' : 'object', \n" +
                        "       'properties' : { \n" +
                        "           'customProp' : {\n" +
                        "               'type' : 'string'\n" +
                        "           }\n" +
                        "       }\n" +
                        "   };\n" +
                        "   this.createNode(newTypeObj).then(function() {\n" +
                        "       var typeQName = this.getQName();\n" +
                        "       $('#node-type02-result').html('Successfully created a new type with qname ' + typeQName + '.');\n" +
                        "       this.subchain(this.getBranch()).readNode(typeQName).then(function(){\n" +
                        "           this.object['properties']['customProp2'] = {\n" +
                        "               'type' : 'integer'\n" +
                        "           };\n" +
                        "           this.update().reload().then(function() {\n" +
                        "               $('#node-type02-result').append('<br/>Successfully updated type ' + this.getQName() + '.');\n" +
                        "           });\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "node-type03" : {
                    "title" : "List types",
                    "description" : "This sample shows you how to list all types of a branch.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-type03');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').listDefinitions('type').count(function(count) {\n" +
                        "   $('#node-type03-result').html('Master branch has ' + count + ' types.');\n" +
                        "});"
                }
            }
        },
        "node-feature" : {
            "title" : "Feature",
            "description" : "A feature is a pre-defined set of settings that can be applied to types or nodes which will then invoke additional server-side behaviors. For example, if we add f:thumbnailable feature to a node, Cloud CMS will render thumbnails according to the settings of the thumbnail feature.",
            "samples" : {
                "node-feature01" : {
                    "title" : "Add features to a type",
                    "description" : "This sample shows you how to create a new type and then add the f:thumbnailable feature type. We will then see if thumbnails will be generated for new node created with that type.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-feature01');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master')\n" +
                        ".then(function(){\n" +
                        "   var newTypeObj = {\n" +
                        "       'title' : 'Custom Type', \n" +
                        "       'description' : 'This is a new type', \n" +
                        "       '_parent' : 'n:node', \n" +
                        "       '_type' : 'd:type', \n" +
                        "       'type' : 'object', \n" +
                        "       'properties' : { \n" +
                        "           'customProp' : {\n" +
                        "               'type' : 'string'\n" +
                        "           }\n" +
                        "       }\n" +
                        "   };\n" +
                        "   this.createNode(newTypeObj).then(function() {\n" +
                        "       var typeQName = this.getQName();\n" +
                        "       this.subchain(this.getBranch()).readNode(typeQName)\n" +
                        "       .then(function(){\n" +
                        "           this.object['mandatoryFeatures'] = {\n" +
                        "               'f:thumbnailable' : {\n" +
                        "                   'thumb50' : {\n" +
                        "                       '_key' : 'thumb50',\n" +
                        "                       'mimetype': 'image/png',\n" +
                        "                       'width': 50,\n" +
                        "                       'height': 50\n" +
                        "                   }\n" +
                        "               }\n" +
                        "           };\n" +
                        "           this.update().reload().then(function() {\n" +
                        "               var testNode;\n" +
                        "               this.subchain(this.getBranch()).createNode({\n" +
                        "                   'title' : 'Test Node', \n" +
                        "                   '_type' : typeQName, \n" +
                        "                   'properties' : {\n" +
                        "                       'customProp' : 'test'\n" +
                        "                   }\n" +
                        "               }).then(function() {\n" +
                        "                   testNode = this;\n" +
                        "                   this.attach('default', 'text/plain', \n" +
                        "                       'first attachment');\n" +
                        "               })\n" +
                        "               this.then(function() {\n" +
                        "                   this.wait(10000);\n" +
                        "                   this.subchain(testNode).attachment('thumb50')\n" +
                        "                   .then(function() {\n" +
                        "                       $('#node-feature01-result').html('<img src=\"' + \n" +
                        "                           this.getDownloadUri() +  '\">');\n" +
                        "                   });\n" +
                        "               });\n" +
                        "           });\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "node-feature02" : {
                    "title" : "Add features to a node",
                    "description" : "This sample shows you how to add the f:thumbnailable feature to a node. We will then see if thumbnails will be generated for that node.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-feature02');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master')\n" +
                        ".createNode({\n" +
                        "   'title' : 'Test Node', \n" +
                        "   'properties' : {\n" +
                        "   'customProp' : 'test'\n" +
                        "   }\n" +
                        "}).then(function() {\n" +
                        "   this.addFeature('f:thumbnailable' , {\n" +
                        "       'thumb50' : {\n" +
                        "           '_key' : 'thumb50',\n" +
                        "           'mimetype': 'image/png',\n" +
                        "           'width': 50,\n" +
                        "           'height': 50\n" +
                        "       }\n" +
                        "   });\n" +
                        "   this.update().reload().then(function() {\n" +
                        "       this.attach('default', 'text/plain', 'first attachment');\n" +
                        "       this.wait(10000);\n" +
                        "       this.attachment('thumb50').then(function() {\n" +
                        "           $('#node-feature02-result').html('<img src=\"' + \n" +
                        "               this.getDownloadUri() +  '\">');\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "node-feature03" : {
                    "title" : "Remove features from a node",
                    "description" : "This sample shows you how to remove features from a node.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-feature02');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master')\n" +
                        ".createNode({\n" +
                        "   'title' : 'Test Node', \n" +
                        "   'properties' : {\n" +
                        "   'customProp' : 'test'\n" +
                        "   }\n" +
                        "}).then(function() {\n" +
                        "   if ( this.hasFeature('f:audit')) {\n" +
                        "       this.removeFeature('f:audit');\n" +
                        "   }\n" +
                        "   this.update().reload().then(function() {\n" +
                        "       $('#node-feature03-result').html('Node has f:audit feature? '\n" +
                        "       + this.hasFeature('f:audit'));\n" +
                        "   });\n" +
                        "});"
                }
            }
        },
        "node-form" : {
            "title" : "Form",
            "description" : "Form is a special type of node which provides settings and options for form fields. Coupled with its associated type node, it can be used by Alpaca forms engine to render elegant content entry forms. A type node can be associated with multiple form nodes.",
            "samples" : {
                "node-form01" : {
                    "title" : "Create a new form for a type",
                    "description" : "This sample shows you how to create a new form node and associate it with a type node.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-form02');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master')\n" +
                        ".then(function(){\n" +
                        "   var newTypeObj = {\n" +
                        "       'title' : 'Custom Type', \n" +
                        "       'description' : 'This is a new type', \n" +
                        "       '_parent' : 'n:node', \n" +
                        "       '_type' : 'd:type', \n" +
                        "       'type' : 'object', \n" +
                        "       'properties' : { \n" +
                        "           'customProp' : {\n" +
                        "               'type' : 'string'\n" +
                        "           }\n" +
                        "       }\n" +
                        "   };\n" +
                        "   this.createNode(newTypeObj).then(function() {\n" +
                        "       var typeQName = this.getQName();" +
                        "       this.subchain(this.getBranch()).readDefinition(typeQName).createForm('form1', {\n" +
                        "          'fields' : {\n" +
                        "              'customProp' : {\n" +
                        "                  'type' : 'text',\n" +
                        "                  'size' : 15\n" +
                        "              }\n" +
                        "           }\n" +
                        "       });\n" +
                        "       this.then(function() {\n" +
                        "           $('#node-form01-result').html('Successfully create form node '+ this.getId() \n" +
                        "           + ' for type ' + typeQName + '.');\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "node-form02" : {
                    "title" : "Render forms with Alpaca",
                    "description" : "This sample will create two form nodes for a type node and then use them to render two different forms.",
                    "code" : "Samples.defaultClient().trap(function(error) {\n" +
                        "    Samples.defaultErrorHandler(error,'node-form02');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master')\n" +
                        ".then(function(){\n" +
                        "   var newTypeObj = {\n" +
                        "       'title' : 'Custom Type', \n" +
                        "       'description' : 'This is a new type', \n" +
                        "       '_parent' : 'n:node', \n" +
                        "       '_type' : 'd:type', \n" +
                        "       'type' : 'object', \n" +
                        "       'properties' : { \n" +
                        "           'customProp' : {\n" +
                        "               'type' : 'string'\n" +
                        "           }\n" +
                        "       }\n" +
                        "   };\n" +
                        "   this.createNode(newTypeObj).then(function() {\n" +
                        "       var typeQName = this.getQName(), form1, form2 , testNode;\n" +
                        "       this.subchain(this.getBranch()).readDefinition(typeQName).createForm('form1', {\n" +
                        "          'fields' : {\n" +
                        "              'customProp' : {\n" +
                        "                  'type' : 'text',\n" +
                        "                  'label' : 'text1',\n" +
                        "               }\n" +
                        "           }\n" +
                        "       }).then(function() {\n" +
                        "           form1 = this;\n" +
                        "       });\n" +
                        "       this.subchain(this.getBranch()).readDefinition(typeQName).createForm('form2', {\n" +
                        "          'fields' : {\n" +
                        "              'customProp' : {\n" +
                        "                  'type' : 'uppercase',\n" +
                        "                  'label' : 'text2',\n" +
                        "              }\n" +
                        "           }\n" +
                        "       }).then(function() {\n" +
                        "           form2 = this;\n" +
                        "       });\n" +
                        "       this.subchain(this.getBranch()).createNode({\n" +
                        "           '_type' : typeQName,\n" +
                        "           'customProp' : 'Test Val'\n" +
                        "       }).then(function() {\n" +
                        "           testNode = this;\n" +
                        "       });\n" +
                        "       this.then(function() {\n" +
                        "           $('#node-form02-result').html('<div id=\"form1\"></div><div id=\"form2\"></div>');\n" +
                        "           $('#form1').alpaca({\n" +
                        "               'data' : testNode.object,\n" +
                        "               'schema' : this.object,\n" +
                        "               'options' : form1.object\n" +
                        "           });\n" +
                        "           $('#form2').alpaca({\n" +
                        "               'data' : testNode.object,\n" +
                        "               'schema' : this.object,\n" +
                        "               'options' : form2.object\n" +
                        "           });\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                }
            }
        },
        "domain" : {
            "title" : "Domain",
            "description" : "Domain is for storing your users and groups. You can create as many users and groups within a domain as you like. Each platform comes with a default primary domain. However, you can create as many domains as you like.",
            "samples" : {
                "domain01" : {
                    "title" : "Create a new domain",
                    "description" : "This sample shows you how to create a new domain.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain01');\n" +
                        "}).createDomain({           \n" +
                        "   'title' : 'Domain '+new Date().getTime(),\n" +
                        "   'tags' : ['test']      \n" +
                        "}).then(function() {                                 \n" +
                        "   $('#domain01-result').html('Successfully created a new domain ' + this.getId());  \n" +
                        "});"
                },
                "domain02" : {
                    "title" : "Update a domain",
                    "description" : "This sample shows you how to create a new domain and then update it.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain02');\n" +
                        "}).createDomain().then(function() {\n" +
                        "   this.object['title'] = 'Updated domain';\n" +
                        "   this.update().then(function() {\n" +
                        "       $('#domain02-result').html('Successfully updated domain ' + this.getId());  \n" +
                        "   });\n" +
                        "});"
                },
                "domain03" : {
                    "title" : "Read the primary domain",
                    "description" : "This sample shows you how to get the primary domain.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain03');\n" +
                        "}).readPrimaryDomain().then(function() {\n" +
                        "   $('#domain03-result').html('Successfully found the primary domain with id ' + this.getId());  \n" +
                        "});"
                },
                "domain04" : {
                    "title" : "List domains",
                    "description" : "This sample shows you how to get list of domains.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain04');\n" +
                        "}).listDomains().count(function(count) {\n" +
                        "    $('#domain04-result').html('Found ' + count + ' domains.');  \n" +
                        "});"
                }
            }
        },
        "domain-group" : {
            "title" : "Group",
            "description" : "Group is a domain level object that can have list of members including users and groups. You can create as many groups as you want under a domain.",
            "samples" : {
                "domain-group01" : {
                    "title" : "Create a new group",
                    "description" : "This sample shows you how to create a new group under the primary domain.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain-group01');\n" +
                        "}).readPrimaryDomain().createGroup({           \n" +
                        "   'name' : 'Group '+new Date().getTime(),\n" +
                        "   'tags' : ['test']      \n" +
                        "}).then(function() {                                 \n" +
                        "   $('#domain-group01-result').html('Successfully created a new group ' + this.getId());  \n" +
                        "});"
                },
                "domain-group02" : {
                    "title" : "Read and update a group",
                    "description" : "This sample shows you how to read and update an existing group.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain-group02');\n" +
                        "}).readPrimaryDomain().then(function() {\n" +
                        "   var groupName = 'Group '+new Date().getTime();\n" +
                        "   this.createGroup({\n" +
                        "       'name' : groupName,\n" +
                        "       'tags' : ['test']      \n" +
                        "   });\n" +
                        "   this.readPrincipal(groupName).then(function() {\n" +
                        "       this.object['customPro'] = 'Custom Value';\n" +
                        "       this.update().reload().then(function() {\n" +
                        "           $('#domain-group02-result').html('Successfully created and updated group ' + this.getName());  \n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "domain-group03" : {
                    "title" : "List groups",
                    "description" : "This sample shows you how to get list of groups.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain-group03');\n" +
                        "}).readPrimaryDomain().listGroups().count(function(count) {\n" +
                        "    $('#domain-group03-result').html('Found ' + count + ' groups.');  \n" +
                        "});"
                },
                "domain-group04" : {
                    "title" : "Add group member",
                    "description" : "This sample shows you how to add a sub-group or user to a group and how to get list of group members.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain-group04');\n" +
                        "}).readPrimaryDomain().then(function() {\n" +
                        "   var groupName = 'Group '+new Date().getTime(), subGroup, user1;\n" +
                        "   this.createGroup({\n" +
                        "       'name' : 'Group '+new Date().getTime(),\n" +
                        "       'tags' : ['test']      \n" +
                        "   });\n" +
                        "   this.createGroup({\n" +
                        "       'name' : 'Group '+new Date().getTime(),\n" +
                        "       'tags' : ['test']      \n" +
                        "   }).then(function() {\n" +
                        "       subGroup = this;\n" +
                        "   });\n" +
                        "   this.createUser({\n" +
                        "       'name' : 'User '+new Date().getTime(),\n" +
                        "       'tags' : ['test']      \n" +
                        "   }).then(function() {\n" +
                        "       user1 = this;\n" +
                        "   });\n" +
                        "   this.then(function() {\n" +
                        "       this.addMember(groupName, user1);\n" +
                        "       this.addMember(groupName, subGroup);\n" +
                        "       this.listMembers(groupName,'group').count(function(count) {\n" +
                        "           $('#domain-group04-result').html('Group ' + groupName + ' has ' + count + ' sub-groups.' );  \n" +
                        "       });\n" +
                        "       this.listMembers(groupName,'user').count(function(count) {\n" +
                        "           $('#domain-group04-result').append('<br/>Group ' + groupName + ' has ' + count + ' users.' );  \n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "domain-group05" : {
                    "title" : "Remove group member",
                    "description" : "This sample shows you how to remove a member from a group.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain-group05');\n" +
                        "}).readPrimaryDomain().then(function() {\n" +
                        "   var groupName = 'Group '+new Date().getTime(), group,subGroup, user1;\n" +
                        "   this.createGroup({\n" +
                        "       'name' : 'Group '+new Date().getTime(),\n" +
                        "       'tags' : ['test']      \n" +
                        "   }).then(function() {\n" +
                        "       group = this;\n" +
                        "   });\n" +
                        "   this.createGroup({\n" +
                        "       'name' : 'Group '+new Date().getTime(),\n" +
                        "       'tags' : ['test']      \n" +
                        "   }).then(function() {\n" +
                        "       subGroup = this;\n" +
                        "   });\n" +
                        "   this.then(function() {\n" +
                        "       this.addMember(groupName, subGroup);\n" +
                        "       this.listMembers(groupName,'group').count(function(count) {\n" +
                        "           $('#domain-group05-result').html('Group ' + groupName + ' has ' + count + ' sub-groups.' );  \n" +
                        "       });\n" +
                        "       this.subchain(group).removeMember(subGroup).listGroups().count(function(count) {\n" +
                        "           $('#domain-group05-result').append('<br/>Group ' + groupName + ' now has ' + count + ' sub-groups.' );  \n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "domain-group06" : {
                    "title" : "Query groupss",
                    "description" : "This sample shows you how to query groups.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain-group06');\n" +
                        "}).readPrimaryDomain().queryUsers({\n" +
                        "   'tags' : {\n" +
                        "       '$all' :['test']\n" +
                        "   }\n" +
                        "},{\n" +
                        "   'skip' : 0,\n" +
                        "   'limit' : 1\n" +
                        "}).totalRows(function(totalRows) {\n" +
                        "   $('#domain-group06-result').html('Found ' + totalRows + ' groups who have tag test.');  \n" +
                        "});"
                }
            }
        },
        "domain-user" : {
            "title" : "User",
            "description" : "User is a domain level object that can hold user's information. User can belong to multiple groups.",
            "samples" : {
                "domain-user01" : {
                    "title" : "Create a new user",
                    "description" : "This sample shows you how to create a new user under the primary domain.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain-user01');\n" +
                        "}).readPrimaryDomain().createUser({           \n" +
                        "   'name' : 'User '+new Date().getTime(),\n" +
                        "   'firstName' : ['John'],      \n" +
                        "   'lastName' : ['Doe'],      \n" +
                        "}).then(function() {                                 \n" +
                        "   $('#domain-user01-result').html('Successfully created a new user ' + this.getName());  \n" +
                        "});"
                },
                "domain-user02" : {
                    "title" : "Read and update a user",
                    "description" : "This sample shows you how to read and update an existing user.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain-user02');\n" +
                        "}).readPrimaryDomain().then(function() {\n" +
                        "   var userName = 'User '+new Date().getTime();\n" +
                        "   this.createUser({\n" +
                        "       'name' : userName,\n" +
                        "       'tags' : ['test']      \n" +
                        "   });\n" +
                        "   this.readPrincipal(userName).then(function() {\n" +
                        "       this.object['email'] = 'Test@test.com';\n" +
                        "       this.update().reload().then(function() {\n" +
                        "           $('#domain-user02-result').html('Successfully created and updated user ' + this.getName());  \n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "domain-user03" : {
                    "title" : "List users",
                    "description" : "This sample shows you how to get list of users.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain-user03');\n" +
                        "}).readPrimaryDomain().listUsers().count(function(count) {\n" +
                        "    $('#domain-user03-result').html('Found ' + count + ' users.');  \n" +
                        "});"
                },
                "domain-user04" : {
                    "title" : "List user memberships",
                    "description" : "This sample shows you how to add a sub-group or user to a group and how to get list of group members.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain-user04');\n" +
                        "}).readPrimaryDomain().then(function() {\n" +
                        "   var groupName = 'Group '+new Date().getTime(), group1, user1;\n" +
                        "   this.createGroup({\n" +
                        "       'name' : 'Group '+new Date().getTime(),\n" +
                        "       'tags' : ['test']      \n" +
                        "   });\n" +
                        "   this.createGroup({\n" +
                        "       'name' : 'Group '+new Date().getTime(),\n" +
                        "       'tags' : ['test']      \n" +
                        "   }).then(function() {\n" +
                        "       group1 = this;\n" +
                        "   });\n" +
                        "   this.createUser({\n" +
                        "       'name' : 'User '+new Date().getTime(),\n" +
                        "       'tags' : ['test']      \n" +
                        "   }).then(function() {\n" +
                        "       user1 = this;\n" +
                        "   });\n" +
                        "   this.then(function() {\n" +
                        "       this.addMember(groupName, user1);\n" +
                        "       this.addMember(group1, user1);\n" +
                        "       this.subchain(user1).listMemberships().count(function(count) {\n" +
                        "           $('#domain-user04-result').html('User ' + user1.getName() + ' belongs to ' + count + ' groups.' );  \n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "domain-user05" : {
                    "title" : "Remove user membership",
                    "description" : "This sample shows you how to remove a user from a group.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain-user05');\n" +
                        "}).readPrimaryDomain().then(function() {\n" +
                        "   var groupName = 'Group '+new Date().getTime(), group, user1;\n" +
                        "   this.createGroup({\n" +
                        "       'name' : 'Group '+new Date().getTime(),\n" +
                        "       'tags' : ['test']      \n" +
                        "   }).then(function() {\n" +
                        "       group = this;\n" +
                        "   });\n" +
                        "   this.createUser({\n" +
                        "       'name' : 'User '+new Date().getTime(),\n" +
                        "       'tags' : ['test']      \n" +
                        "   }).then(function() {\n" +
                        "       user1 = this;\n" +
                        "   });\n" +
                        "   this.then(function() {\n" +
                        "       this.addMember(groupName, user1);\n" +
                        "       this.subchain(user1).listMemberships().count(function(count) {\n" +
                        "           $('#domain-user05-result').html('User ' + user1.getName() + ' belongs to ' + count + ' groups.');  \n" +
                        "       });\n" +
                        "       this.subchain(group).removeMember(user1);\n" +
                        "       this.subchain(user1).listMemberships().count(function(count) {\n" +
                        "           $('#domain-user05-result').append('<br/>User ' + user1.getName() + ' now belongs to ' + count + ' groups.');  \n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "domain-user06" : {
                    "title" : "Query users",
                    "description" : "This sample shows you how to query users.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'domain-user06');\n" +
                        "}).readPrimaryDomain().queryUsers({\n" +
                        "   'name' : {\n" +
                        "       '$regex' :'^User'\n" +
                        "   }\n" +
                        "},{\n" +
                        "   'skip' : 0,\n" +
                        "   'limit' : 1\n" +
                        "}).totalRows(function(totalRows) {\n" +
                        "   $('#domain-user06-result').html('Found ' + totalRows + ' users whose name starts with User.');  \n" +
                        "});"
                }
            }
        },
        "application" : {
            "title" : "Application",
            "description" : "Cloud CMS application is a platform level data store where you can place application specific settings.",
            "samples" : {
                "application01" : {
                    "title" : "Create a new application",
                    "description" : "This sample shows you how to create a new application within your platform.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'application01');\n" +
                        "}).createApplication({           \n" +
                        "   'key' : 'application-'+new Date().getTime(),      \n" +
                        "   'title' : 'My Test Application'      \n" +
                        "}).then(function() {                                 \n" +
                        "   $('#application01-result').html('Successfully created a new application ' + this.getId());  \n" +
                        "});"
                },
                "application02" : {
                    "title" : "Update an existing application",
                    "description" : "This sample shows you how to update an existing application.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'application02');\n" +
                        "}).queryApplications({           \n" +
                        "   'title': {\n" +
                        "       '$regex' : '^My Test'\n" +
                        "   }      \n" +
                        "}).count(function(count) {\n" +
                        "   if ( count > 0) {\n" +
                        "       this.keepOne().then(function() { \n" +
                        "           this.object['title'] = this.getTitle() + ' updated.';\n" +
                        "           this.update().reload().then(function() {\n" +
                        "               $('#application02-result').html('Successfully updated application ' + this.getTitle());  \n" +
                        "           })\n" +
                        "       })\n" +
                        "   } else {\n" +
                        "       $('#application02-result').html('Can not find any application whose name starts with My Test.');  \n" +
                        "   }\n" +
                        "});"
                },
                "application03" : {
                    "title" : "Query applications",
                    "description" : "Cloud CMS supports querying applications by their property or combination of multiple properties. This examples shows you how to create such query and how to process query results.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'application03');\n" +
                        "}).queryApplications({           \n" +
                        "   'title': {\n" +
                        "       '$regex' : 'Application'\n" +
                        "   }      \n" +
                        "}).count(function(count) {                                 \n" +
                        "   $('#application03-result').html('Found ' + count+ ' applications whose name contains keyword Application.');  \n" +
                        "});"
                },
                "application04" : {
                    "title" : "List applications",
                    "description" : "This sample shows you how to find the latest application.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'application04');\n" +
                        "}).listApplications({           \n" +
                        "   'skip': 0,      \n" +
                        "   'limit': 1,      \n" +
                        "   'sort': {'_system.modified_on.ms': -1}      \n" +
                        "}).keepOne().then(function() {                                 \n" +
                        "   $('#application04-result').html('Latest application was modified at ' + this.getSystemMetadata().getModifiedOn().getTimestamp());  \n" +
                        "});"
                },
                "application05" : {
                    "title" : "Delete a application",
                    "description" : "This sample shows you how to delete an existing application.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'application05');\n" +
                        "}).createApplication({           \n" +
                        "   'title' : 'Application '+new Date().getTime()           \n" +
                        "}).then(function() {     \n" +
                        "   var applicationId = this.getId(); \n" +
                        "   this.del().then(function() {                                \n" +
                        "       $('#application05-result').html('Successfully deleted application ' + applicationId);  \n" +
                        "   }); \n" +
                        "});"
                }
            }
        },
        "application-setting" : {
            "title" : "Application Setting",
            "description" : "Within an application, you can provide list of settings. They can either be application level settings or principal (user or group) level settings.",
            "samples" : {
                "application-setting01" : {
                    "title" : "Create or update an application level setting",
                    "description" : "This sample shows you how to create and then update an application level setting.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'application-setting01');\n" +
                        "}).readApplication(Samples.sampleApplication).then(function() {\n" +
                        "   this.readApplicationSettings().then(function() {\n" +
                        "       this.setSetting('key1','val1');" +
                        "       var key = 'key'+new Date().getTime();\n" +
                        "       this.setSetting(key,'val'+new Date().getTime());\n" +
                        "       this.update().then(function() {\n" +
                        "           $('#application-setting01-result').html('Successfully created a new application setting ' + key + '.');\n" +
                        "       });\n" +
                        "       this.setSetting(key,this.getSetting(key)+' updated');\n" +
                        "       this.update().then(function() {\n" +
                        "           $('#application-setting01-result').append('<br/>Successfully updated the application setting ' + key + '.');\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "application-setting02" : {
                    "title" : "List application level settings",
                    "description" : "This sample shows you how to get list of application level settings.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'application-setting02');\n" +
                        "}).readApplication(Samples.sampleApplication).then(function() {\n" +
                        "   this.listSettings().count(function(count) {\n" +
                        "       $('#application-setting02-result').append('<br/>Found ' + count +' application level settings.');\n" +
                        "   });\n" +
                        "});"
                },
                "application-setting03" : {
                    "title" : "Query application level settings",
                    "description" : "This sample shows you how to query application level settings.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'application-setting03');\n" +
                        "}).readApplication(Samples.sampleApplication).then(function() {\n" +
                        "   this.querySettings({\n" +
                        "     'settings.key1' : {\n" +
                        "           '$exists' : true\n" +
                        "       }\n" +
                        "   }).count(function(count) {\n" +
                        "       $('#application-setting03-result').append('<br/>Found they application level setting with key key1.');\n" +
                        "   });\n" +
                        "});"
                },
                "application-setting04" : {
                    "title" : "Delete an application level setting",
                    "description" : "This sample shows you how to delete an application level setting.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'application-setting04');\n" +
                        "}).readApplication(Samples.sampleApplication).then(function() {\n" +
                        "   this.readApplicationSettings().then(function() {\n" +
                        "       var settings = this.getSettings();\n" +
                        "       if (settings['key1']) {\n" +
                        "           delete settings['key1'];\n" +
                        "       }\n" +
                        "       this.update().then(function() {\n" +
                        "           $('#application-setting04-result').append('<br/>Successfully deleted the application setting key1.');\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "application-setting05" : {
                    "title" : "Create and update a user setting",
                    "description" : "This sample shows you how to create and then update a user setting.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'application-setting05');\n" +
                        "}).readApplication(Samples.sampleApplication).then(function() {\n" +
                        "   this.readApplicationPrincipalSettings(Samples.sampleUser).then(function() {\n" +
                        "       this.setSetting('key1','val1');\n" +
                        "       var key = 'key'+new Date().getTime();\n" +
                        "       this.setSetting(key,'val'+new Date().getTime());\n" +
                        "       this.update().then(function() {\n" +
                        "           $('#application-setting05-result').html('Successfully created a new user setting ' + key + '.');\n" +
                        "       });\n" +
                        "       this.setSetting(key,this.getSetting(key)+' updated');\n" +
                        "       this.update().then(function() {\n" +
                        "           $('#application-setting05-result').append('<br/>Successfully updated the user setting ' + key + '.');\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "application-setting06" : {
                    "title" : "List user settings",
                    "description" : "This sample shows you how to get list of user settings.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'application-setting06');\n" +
                        "}).readApplication(Samples.sampleApplication).then(function() {\n" +
                        "   this.readApplicationPrincipalSettings(Samples.sampleUser).then(function() {\n" +
                        "       $.each(this.getSettings(),function(k,v){\n" +
                        "           $('#application-setting06-result').append('<br/>User Setting :: Key : ' + k +' -- Value : ' + v);\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                },
                "application-setting07" : {
                    "title" : "Delete a user setting",
                    "description" : "This sample shows you how to delete a user setting.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'application-setting07');\n" +
                        "}).readApplication(Samples.sampleApplication).then(function() {\n" +
                        "    this.readApplicationPrincipalSettings(Samples.sampleUser).then(function() {\n" +
                        "       var settings = this.getSettings();\n" +
                        "       if (settings['key1']) {\n" +
                        "           delete settings['key1'];\n" +
                        "       }\n" +
                        "       this.update().then(function() {\n" +
                        "           $('#application-setting07-result').append('<br/>Successfully deleted the user setting key1.');\n" +
                        "       });\n" +
                        "   });\n" +
                        "});"
                }
            }
        },
        "stack" : {
            "title" : "Stack",
            "description" : "Cloud CMS stack is a platform level object that groups other data store object together such as domain, repository, application etc. ",
            "samples" : {
                "stack01" : {
                    "title" : "Create a new stack",
                    "description" : "This sample shows you how to create a new stack within your platform.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'stack01');\n" +
                        "}).createStack({\n" +
                        "   'title' : 'Stack '+new Date().getTime(),\n" +
                        "   'tags' : ['abc']\n" +
                        "}).then(function() {\n" +
                        "   $('#stack01-result').html('Successfully created a new stack ' + this.getId());\n" +
                        "});"
                },
                "stack02" : {
                    "title" : "Update an existing stack",
                    "description" : "This sample shows you how to update an existing stack.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'stack02');\n" +
                        "}).readStack(Samples.sampleStack).then(function() {\n" +
                        "   this.object['title'] = this.getTitle() + ' updated.';\n" +
                        "   this.update().reload().then(function() {\n" +
                        "       $('#stack02-result').html('Successfully updated stack ' + this.getTitle());\n" +
                        "   })\n" +
                        "});"
                },
                "stack03" : {
                    "title" : "Query stacks",
                    "description" : "Cloud CMS supports querying stacks by their property or combination of multiple properties. This examples shows you how to create such query and how to process query results.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'stack03');\n" +
                        "}).queryStacks({\n" +
                        "   'sdk_bundle': 'sdk-sample-stack'\n" +
                        "}).count(function(count) {\n" +
                        "   $('#stack03-result').html('Found ' + count+ ' stacks whose sdk_bundle property has value \'sdk-sample-stack\'.');\n" +
                        "});"
                },
                "stack04" : {
                    "title" : "List stacks",
                    "description" : "This sample shows you how to find the latest stack.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'stack04');\n" +
                        "}).listStacks({\n" +
                        "   'skip': 0,\n" +
                        "   'limit': 1,\n" +
                        "   'sort': {'_system.modified_on.ms': -1}\n" +
                        "}).keepOne().then(function() {\n" +
                        "   $('#stack04-result').html('Latest stack was modified at ' + this.getSystemMetadata().getModifiedOn().getTimestamp());\n" +
                        "});"
                },
                "stack05" : {
                    "title" : "Delete a stack",
                    "description" : "This sample shows you how to delete an existing stack.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'stack05');\n" +
                        "}).createStack({\n" +
                        "   'title' : 'Stack '+new Date().getTime()\n" +
                        "}).then(function() {\n" +
                        "   var stackId = this.getId(); \n" +
                        "   this.del().then(function() {\n" +
                        "       $('#stack05-result').html('Successfully deleted stack ' + stackId);\n" +
                        "   });\n" +
                        "});"
                },
                "stack06" : {
                    "title" : "Assign a data store to a stack",
                    "description" : "This sample shows you how to assign a data store to a stack.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'stack06');\n" +
                        "}).then(function() {\n" +
                        "   var testRepository;\n" +
                        "   this.createRepository().then(function() {\n" +
                        "       testRepository = this;\n" +
                        "   });\n" +
                        "   this.readStack(Samples.sampleStack).then(function() {\n" +
                        "       this.assignDataStore(testRepository, 'testrepo').then(function() {\n" +
                        "           $('#stack06-result').html('Successfully assigned repository ' + testRepository.getId() + ' to the sample stack.');\n" +
                        "       })\n" +
                        "   })\n" +
                        "});"
                },
                "stack07" : {
                    "title" : "List stack data stores",
                    "description" : "This sample shows you how to get the list of data stores of a stack.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'stack07');\n" +
                        "}).readStack(Samples.sampleStack).then(function() {\n" +
                        "   this.listDataStores().count(function(count) {\n" +
                        "       $('#stack07-result').html('Found ' + count + ' data stores that are assigned to the sample stack.');\n" +
                        "   })\n" +
                        "});"
                },
                "stack08" : {
                    "title" : "Query stack data stores",
                    "description" : "This sample shows you how to query data stores a stack.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'stack08');\n" +
                        "}).readStack(Samples.sampleStack).then(function() {\n" +
                        "   this.queryDataStores({\n" +
                        "       'datastoreTypeId' : 'repository'\n" +
                        "   }).count(function(count) {\n" +
                        "       $('#stack08-result').html('Found ' + count + ' repositories that are assigned to the sample stack.');\n" +
                        "   })\n" +
                        "});"
                },
                "stack09" : {
                    "title" : "Unassign a data store from a stack",
                    "description" : "This sample shows you how to unassign a data store from a stack.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'stack09');\n" +
                        "}).readStack(Samples.sampleStack).then(function() {\n" +
                        "   this.existsDataStore('testrepo', function(exists) {\n" +
                        "       if (exists) {\n" +
                        "           this.unassignDataStore('testrepo').then(function() {\n" +
                        "               $('#stack09-result').html('Successfully unassigned testrepo datastore from stack ' + this.getTitle() + '.');\n" +
                        "           });\n" +
                        "       }\n" +
                        "   })\n" +
                        "});"
                }
            }
        },
        "authentication" : {
            "title" : "Authentication",
            "description" : "Cloud CMS uses OAuth 2 protocol for authentication. It supports all authentication flows defined in OAuth 2 as well as custom \"Open Driver\" flows for JavaScript based applications.",
            "samples" : {
                "authentication01" : {
                    "title" : "Authenticate with client and user credentials (username/password)",
                    "description" : "This sample shows you how to perform OAUTH authentication using the default client id/secret pair and user username/password pair. Since it exposes the client and user credentials within the application, it will be a good practice within compiled or server-side environments like Node JS or Appcelerator Titanium.",
                    "code" : "new Gitana({\n" +
                        "   'clientId': '676e3450-6131-46c2-99cc-496aa2ad80fa',\n" +
                        "   'clientSecret': '5fGkvesH/tWEMX6SpevL54rY6iJK5ADzLH963sif2ljrWvFOhV2zXv6rSpLF2uMWlJ9SG0uEO9uQO4JZac0i7DZquA/5W8ixJwhj76g0Ksk='\n" +
                        "}).authenticate({\n" +
                        "   'username': 'demo',\n" +
                        "   'password': 'demo'\n" +
                        "},function(error) {\n" +
                        "   $('#authentication01-error').addClass('alert alert-error').empty().html(error.message);\n" +
                        "}).then(function() {\n" +
                        "   var authInfo = this.getDriver().getAuthInfo();\n" +
                        "   $('#authentication01-result').html('Successfully authenticated as ' + authInfo.getPrincipalName() + '.');\n" +
                        "});"
                },
                "authentication02" : {
                    "title" : "Authenticate with client and authentication grant credentials (key/secret)",
                    "description" : "This sample shows you how to create an authentication grant and user its key/value pair to perform OAUTH authentication with the default client id/secret pair. The advantage of this approach over the first approach is that if we want to block client access we can just simply disable or delete the authenticate grant instead of the user itself.",
                    "code" : "new Gitana({\n" +
                        "   'clientId': '676e3450-6131-46c2-99cc-496aa2ad80fa',\n" +
                        "   'clientSecret': '5fGkvesH/tWEMX6SpevL54rY6iJK5ADzLH963sif2ljrWvFOhV2zXv6rSpLF2uMWlJ9SG0uEO9uQO4JZac0i7DZquA/5W8ixJwhj76g0Ksk='\n" +
                        "}).authenticate({\n" +
                        "   'username': Samples.sampleAuthenticationGrant.getKey(),\n" +
                        "   'password': Samples.sampleAuthenticationGrant.getSecret()\n" +
                        "},function(error) {\n" +
                        "   $('#authentication02-error').addClass('alert alert-error').empty().html(error.message);\n" +
                        "}).then(function() {\n" +
                        "   var authInfo = this.getDriver().getAuthInfo();\n" +
                        "   $('#authentication02-result').html('Successfully authenticated as ' + authInfo.getPrincipalName() + '.');\n" +
                        "});"
                },
                "authentication03" : {
                    "title" : "Authenticate with open driver client",
                    "description" : "This sample shows you how to use the \"open-driver\" authentication flow which is a custom Cloud CMS OAuth2 flow for clients that cannot " +
                        "store the client secret.  This flow provides the 2-legged functionality of the username/password flow by " +
                        "looking at the originating URL of the request and matching it against domains registered for the client. " +
                        "This pattern is useful for applications running in the browser (Javascript) which cannot hold a client secret. Please note that this example will only work if it is run under the trusted domain code.cloudcms.com",
                    "code" : "new Gitana({\n" +
                        "   'clientId': Samples.sampleOpenDriverClient.get('key'),\n" +
                        "}).authenticate({\n" +
                        "   'username': 'demo',\n" +
                        "   'password': 'demo'\n" +
                        "},function(error) {\n" +
                        "   $('#authentication03-error').addClass('alert alert-error').empty().html(error.message);\n" +
                        "}).then(function() {\n" +
                        "   var authInfo = this.getDriver().getAuthInfo();\n" +
                        "   $('#authentication03-result').html('Successfully authenticated as ' + authInfo.getPrincipalName() + '.');\n" +
                        "});"
                },
                "authentication04" : {
                    "title" : "Authenticate with open driver client and its authentication grant",
                    "description" : "Like the above sample, this sample uses the \"open-driver\" authentication flow which is a custom Cloud CMS OAuth2 flow for clients that cannot " +
                        "store the client secret. Here we also assume that the user password cannot be trusted.  We pre-generated " +
                        "an authentication grant within Cloud CMS for the open driver client and supply the key here.  Authentication grants are wired to a single " +
                        "client and user.  They cannot be shared across clients. " +
                        "Furthermore, if an authentication grant becomes overused, they can be shut down without compromising the " +
                        "client or its applications.",
                    "code" : "new Gitana({\n" +
                        "   'clientId': Samples.sampleOpenDriverClient.get('key'),\n" +
                        "}).authenticate({\n" +
                        "   'username': Samples.sampleOpenDriverAuthenticationGrant.get('key'),\n" +
                        "},function(error) {\n" +
                        "   $('#authentication04-error').addClass('alert alert-error').empty().html(error.message);\n" +
                        "}).then(function() {\n" +
                        "   var authInfo = this.getDriver().getAuthInfo();\n" +
                        "   $('#authentication04-result').html('Successfully authenticated as ' + authInfo.getPrincipalName() + '.');\n" +
                        "});"
                }
            }
        },
        "authorization" : {
            "title" : "Authorization",
            "description" : "Cloud CMS supports access control for objects on all levels. You can grant or revoke user or group access to any object that you own.",
            "samples" : {
                "authorization01" : {
                    "title" : "Grant authority to a user",
                    "description" : "This sample shows you how to grant editor authority of master branch of the sample repository to the sample user.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'authorization01');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function() {\n" +
                        "   this.grantAuthority(Samples.sampleUserId, 'editor').then(function() {\n" +
                        "       $('#authorization01-result').html('Successfully granted test user the editor authority to the master branch of the sample repository.');\n" +
                        "   })\n" +
                        "});"
                },
                "authorization02" : {
                    "title" : "Check authority of a user",
                    "description" : "This sample shows you how to check whether the sample user has been granted editor authority to the master branch of the sample repository or not.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'authorization02');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function() {\n" +
                        "   this.checkAuthority(Samples.sampleUserId, 'editor', function(hasAuthority) {\n" +
                        "       $('#authorization02-result').html('Does The sample user have the editor authority to the master branch of the sample repository? ' + hasAuthority + '.');\n" +
                        "   })\n" +
                        "});"
                },
                "authorization03" : {
                    "title" : "Revoke authority from a user",
                    "description" : "This sample shows you how to revoke editor authority of master branch of the sample repository from the sample user.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'authorization03');\n" +
                        "}).readRepository(Samples.sampleRepository).readBranch('master').then(function() {\n" +
                        "   this.revokeAuthority(Samples.sampleUserId, 'editor').then(function() {\n" +
                        "       $('#authorization03-result').html('Successfully revoked test user the editor authority to the master branch of the sample repository.');\n" +
                        "   })\n" +
                        "});"
                }
            }
        },
        "team" : {
            "title" : "Team",
            "description" : "Cloud CMS supports teams for data stores such as repository, domain, stack etc. Instead of managing authorities for individual users or groups, you can simple add them to appropriate teams. All data stores come with a default owners team. However you can create as many teams as you like and grant them with any authority you want.",
            "samples" : {
                "team01" : {
                    "title" : "Add a user to a team",
                    "description" : "This sample shows you how to add the sample user to the owners team of the sample repository.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'team01');\n" +
                        "}).readRepository(Samples.sampleRepository).readTeam('owners').addMember(Samples.sampleUserId).then(function() {\n" +
                        "   $('#team01-result').html('Successfully added the sample user to the owners team of the sample repository.');\n" +
                        "});"
                },
                "team02" : {
                    "title" : "List members of a team",
                    "description" : "This sample shows you how to list members of the owners team of the sample repository.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'team02');\n" +
                        "}).readRepository(Samples.sampleRepository).readTeam('owners').listMembers().count(function(count) {\n" +
                        "   $('#team02-result').html('The owners team of the sample repository has ' + count + ' members.');\n" +
                        "});"
                },
                "team03" : {
                    "title" : "Remove a user from a team",
                    "description" : "This sample shows you how to remove the sample user to the owners team of the sample repository.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'team03');\n" +
                        "}).readRepository(Samples.sampleRepository).readTeam('owners').removeMember(Samples.sampleUserId).then(function() {\n" +
                        "   $('#team03-result').html('Successfully removed the sample user from the owners team of the sample repository.');\n" +
                        "});"
                },
                "team04" : {
                    "title" : "Create a new custom team",
                    "description" : "This sample shows you how to create a new team and grant it with editor role.",
                    "code" : "Samples.defaultClient().trap(function(error) { \n" +
                        "    Samples.defaultErrorHandler(error,'team04');\n" +
                        "}).readRepository(Samples.sampleRepository).createTeam('editor-' + new Date().getTime()).then(function() {\n" +
                        "   this.grant('editor');\n" +
                        "   this.addMember(Samples.sampleUserId);\n" +
                        "   $('#team04-result').html('Successfully created an editor team and add the sample user to it.');\n" +
                        "});"
                }
            }
        }
    };
})(jQuery);