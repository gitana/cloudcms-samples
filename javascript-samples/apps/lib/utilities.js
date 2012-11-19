(function($){
    $.fn.toJSON = function(options){

        options = $.extend({}, options);

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }

                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);

/*
var getParameter = function(param)
{
    var qs = getQueryString();

    return qs[param];
};

var queryStringToObject = function( qstr )
{
    var result = {},
    nvPairs = ( ( qstr || "" ).replace( /^\?/, "" ).split( /&/ ) ),
    i, pair, n, v;

    for ( i = 0; i < nvPairs.length; i++ )
    {
        var pstr = nvPairs[ i ];
        if ( pstr )
        {
            pair = pstr.split( /=/ );
            n = pair[ 0 ];
            v = pair[ 1 ];
            if ( result[ n ] === undefined )
            {
                result[ n ] = v;
            }
            else
            {
                if ( typeof result[ n ] !== "object" )
                {
                    result[ n ] = [ result[ n ] ];
                }

                result[ n ].push( v );
            }
        }
    }

    return result;
};

var getQueryString = function()
{
    var queryString = {};
    if (window.location.href.indexOf("?") > -1)
    {
        var s = window.location.href.substring(window.location.href.indexOf("?") + 1);
        queryString = queryStringToObject(s);
    }

    return queryString;
};
*/

/*
// jquery mobile refresh
var refreshPage = function(page)
{
    page.trigger('pagecreate');
    page.listview('refresh');
};
*/
