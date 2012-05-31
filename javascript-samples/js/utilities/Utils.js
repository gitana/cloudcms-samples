(function($) {
    Samples.Utils.sourceViewer = function(title, object) {
        var sourceViewModal = '<div class="modal">' +
            '<div class="modal-header">' +
            '<button class="close" data-dismiss="modal">×</button>' +
            '<h3>' + title + '</h3>' +
            '</div>' +
            '<div class="modal-body">' +
            '<pre>' + JSON.stringify(object, null, '&nbsp;') + '</pre>' +
            '</div>' +
            '</div>';
        $(sourceViewModal).modal();
    };

    jQuery.fn.stars = function() {
        return $(this).each(function() {
            var n = $(this).html();
            if (!isNaN(parseFloat(n)) && isFinite(n)) {
                $(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * 16));
            }
        });
    }
})(jQuery);