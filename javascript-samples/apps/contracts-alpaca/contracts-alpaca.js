// have alpaca render a contract create form
contracts.renderCreate = function() {
    $("#create").find("form").empty().alpaca({
        "schema": "./contract-form-schema.json",
        "options": "./contract-form-options.json"
    });
};

// have alpaca render a contract edit form
contracts.renderEdit = function(current) {
    $("#edit").find("form").empty().alpaca({
        "schema": "./contract-form-schema.json",
        "options": "./contract-form-options.json",
        "data": current
    });
};

