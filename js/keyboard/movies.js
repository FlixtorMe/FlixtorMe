$.fn.scrollTo = function( target, options, callback ){
    if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
    var settings = $.extend({
        scrollTarget  : target,
        offsetTop     : 105,
        duration      : 200,
        easing        : 'swing'
    }, options);
    return this.each(function(){
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
            if (typeof callback == 'function') { callback.call(this); }
        });
    });
};

// MOVIES SPECIFIC KEYS

/* Detail page: Go back to overview page (backspace)
*  Trailer page: Go back to detail page (backspace)
*/
Mousetrap.bind('backspace', function() {
    if( $('#video-container-trailer').is(':visible') ) {
        closeTrailerOverlay();
    }
    else {
        closeMovieDetail();
    }
});

/* On detail page play movie (enter/space)
*  On overview page open detail page (enter/space)
*/
Mousetrap.bind(['enter', 'space'], function() {
    if( $('#content-overlay').is(':visible') ) {
        $('#content-overlay').find('#btnPlay').click();
    }
    else {
        $('#movieContainer').find('.on').click();
    }
});

/* Next item (right) */
Mousetrap.bind('right', function() {
    $(".on").parent().next(".element").find('.shadow').mouseover();
    $('#movies').scrollTo('.on');
});

/* Prev item (left) */
Mousetrap.bind('left', function() {
    $(".on").parent().prev(".element").find('.shadow').mouseover();
    $('#movies').scrollTo('.on');
});

/* Quality switch (q) */
Mousetrap.bind('q', function() {
    if( $(".current").next(".btn-quality").length > 0 ) {
        $(".current").next(".btn-quality").click();
    }
    else {
        $(".btn-quality")[0].click();
    }

});

/* Open trailer (t) */
Mousetrap.bind('t', function() {
    if( $('#content-overlay').is(':visible') ) {
        $('#content-overlay').find('#btnTrailer').click();
    }
});

/* Buy button click (b) */
Mousetrap.bind('b', function() {
    if( $('#content-overlay').is(':visible') ) {
        $('#content-overlay').find('#btnBuy').click();
    }
});