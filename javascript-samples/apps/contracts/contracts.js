var contracts = (function( $, undefined ) {
    var pub = {};

    var REPOSITORY_TITLE = "Contracts Repository";
    var BRANCH_ID = "master";

    // For the demo sandbox,
    var CLIENT_KEY = "676e3450-6131-46c2-99cc-496aa2ad80fa";
    var CLIENT_SECRET = "5fGkvesH/tWEMX6SpevL54rY6iJK5ADzLH963sif2ljrWvFOhV2zXv6rSpLF2uMWlJ9SG0uEO9uQO4JZac0i7DZquA/5W8ixJwhj76g0Ksk="; 
    var USERNAME = "demo";
    var PASSWORD = "demo";
    var BASE_URL = "/proxy";

    var initialized = false;
    var currentContract = null;
    var currentSearchText = null;

    pub.init = function() {

        var self = this;

    	if (initialized) {
    		return;
    	}

        // when someone provides search terms, signal to reload contracts
        $('#searchBox').bind('change', function () {
            if (currentSearchText == $(this).val()) {
                return;
            }

            currentSearchText = $(this).val();

            if (currentSearchText == "") {
            	currentSearchText = null;
            }

			// refresh the contracts
            refreshContracts();
        });        

        //
        // BUTTONS
        //

        // when they click the "create" button, notify Cloud CMS
        $("#createButton").click(function(e) {
            var data = $('#create').find("form").toJSON();
            createContract(data, function() {

                // refresh the contracts
                refreshContracts();

				// change page
                $.mobile.changePage("#index", {
                	"transition": "slide",
                	"reverse": true
                });
            });
            
            return false;
        });        

        // when they click the "update" button, notify Cloud CMS
        $("#updateButton").click(function(e) {
            var data = $('#edit').find("form").toJSON();
            updateContract(currentContract.getId(), data, function() {

            	// NOTE: do not signal that contract changed since #list page will reload anyway

                // change page
                $.mobile.changePage("#list", {
                	"transition": "slide",
                	"reverse": true
                });
            });
            
            return false;
        });        

        // when they click the "delete" button, notify Cloud CMS
        $("#deleteButton").click(function(e) {
            var data = $('#delete').find("form").toJSON();
            deleteContract(currentContract.getId(), function() {

            	// NOTE: do not signal that contract changed since #list page will reload anyway

                $.mobile.changePage("#list", {
                	"transition": "slide",
                	"reverse": true
                });
            });
            
            return false;
        });

        //
        // PAGES
        // 

        $("#list").on('pagebeforeshow', function() {
        	refreshContracts();
        });

        $("#create").on('pagebeforeshow', function() {
        	currentContract = null;
            self.renderCreate();
        });

        $("#edit").on('pagebeforeshow', function() {
            self.renderEdit(currentContract);
        });

        initialized = true;
    };

    pub.renderCreate = function() {
    };

    pub.renderEdit = function(current) {
        $("#name").val(current && current.name || "");
        $("#phone").val(current && current.phone || "");
        $("#email").val(current && current.email || "");
        $("#service").val(current && current.service || "");
        $("#address").val(current && current.address || "");
        $("#city").val(current && current.city || "");
        $("#state").val(current && current.state || "");
        $("#zipcode").val(current && current.zipcode || "");

        $("member-yes").removeAttr("checked");
        $("member-no").removeAttr("checked");
        if (current && current.member) {
            $("member-yes").attr("checked", "true");
        }
    };
        
    /* Refreshe the contracts list when a contract is added, updated or removed */
    var refreshContracts = function() {
        listContracts(currentSearchText, function(contracts) {
            if (contracts.length > 0) {

                var contractsList = $("#contractsList");
                contractsList.html("");

                $.each(contracts, function() {
                    contractsList.append("<li><a href='#edit' id='item-" + this.getId() + "' data-transition='slide'><img src='contract.png' style='float:left; margin: 10px; border: 1px #ccc solid;'>" + this.name + "<br/>" + this.email + "</a><br style='clear:both'/></li>");
                    $("#item-" + this.getId()).click(function(c) {
                    	return function() {
                    		currentContract = c;
                    	}						
                    }(this));
                });
            } else {
                contractsList.append("<li>There are no contracts</li>");
            }
            contractsList.listview('refresh');
        });
    };

	// connects to the Cloud CMS repository and branch
	var connect = function(callback) {
		return Gitana.connect({
			"clientKey": CLIENT_KEY,
			"clientSecret": CLIENT_SECRET,
			"username": USERNAME,
			"password": PASSWORD,
			"baseURL": BASE_URL
		}).then(function() {
			this.queryRepositories({
				"title": REPOSITORY_TITLE
			}).keepOne().readBranch(BRANCH_ID).then(function() {
				callback.call(this);
			});
		});
	};

	var listContracts = function(searchTerm, callback) {
		var contracts = [];

		connect(function() {
			var lookup = {
				"query": {
					"form": "contract"
				}
			};
			if (searchTerm) {
				lookup["search"] = searchTerm;
			}
			this.findNodes(lookup).each(function() {
				contracts.push(this);
			}).then(function() {
				callback(contracts);
			});
		});
	};

	var createContract = function(data, callback) {
		data["form"] = "contract";

		connect(function() {
			this.createNode(data).then(function() {
				callback(this);
			});
		});
	};

	var readContract = function(id, callback) {
		connect(function() {
			this.readNode(id).then(function() {
				callback(this);
			});
		});
	};

	var updateContract = function(id, data, callback) {
		data["form"] = "contract";

		connect(function() {
			this.readNode(id).then(function() {
				for (var k in data) {
					this[k] = data[k];
				}
				this.update().then(function() {
					callback(this);
				});
			});
		});
	};

	var deleteContract = function(id, callback) {
		connect(function() {
			this.readNode(id).del().then(function() {
				callback();
			});
		});
	};
    
    return pub;

}( jQuery ));

$(document).on( 'pageinit',function(event){
    contracts.init();
});






