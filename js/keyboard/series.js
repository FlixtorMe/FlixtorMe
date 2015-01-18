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

// SERIES SPECIFIC KEYS

/* Go back (detail page) (backspace) */
Mousetrap.bind('backspace', function() {
    closeSerieDetail();
});

/* Section switch(movies, series, etc.) (tab) */
Mousetrap.bind('tab', function() {
    if( location.pathname.split('/').slice(-1)[0] == "torrents.html" ) {
        $(".menuMovies").click();
    }
    else {
        $(".selected").next().click();
    }
});

/* On detail page play show (enter/space)
*  On overview page open detail page (enter/space)
*/
Mousetrap.bind(['enter', 'space'], function() {
    if( $('#content-overlay').is(':visible') ) {
        $('#content-overlay').find('#btnPlay').click();
    }
    else {
        $('#serieContainer').find('.on').click();
    }
});

/* Detail page: Next season (right)
*  Overview page: Next item (right)
*/
Mousetrap.bind('right', function() {
    if( $('#content-overlay').is(':visible') ) {
        $(".ui-accordion-header-active").next().next(".accordion-header").click();
        $(".ui-accordion-header-active").next().children(":first").click();
    }
    else {
        $(".on").parent().next(".element").find('.shadow').mouseover();
        $('#series').scrollTo('.on');
    }
});

/* Detail page: Prev season (left)
*  Overview page: Prev item (left)
*/
Mousetrap.bind('left', function() {
    if( $('#content-overlay').is(':visible') ) {
        $(".ui-accordion-header-active").prev().prev(".accordion-header").click();
        $(".ui-accordion-header-active").next().children(":first").click();
    }
    else {
        $(".on").parent().prev(".element").find('.shadow').mouseover();
        $('#series').scrollTo('.on');
    }
});

/* Prev episode (up) */
Mousetrap.bind('up', function() {
    if( $('#content-overlay').is(':visible') ) {
        $(".ui-accordion-header-active").next().find(".selected").prev(".episode").click();
    }
});

/* Next episode (down) */
Mousetrap.bind('down', function() {
    if( $('#content-overlay').is(':visible') ) {
        $(".ui-accordion-header-active").next().find(".selected").next(".episode").click();
    }
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

/* Buy button click (b) */
Mousetrap.bind('b', function() {
    if( $('#content-overlay').is(':visible') ) {
        $('#content-overlay').find('#btnBuy').click();
    }
});