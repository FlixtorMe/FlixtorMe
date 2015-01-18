/* Next page (+) */
Mousetrap.bind('+', function() {
    $('#torrentPager').find('.active').next('li').find('a').click();
});

/* Prev page (-) */
Mousetrap.bind('-', function() {
    $('#torrentPager').find('.active').prev('li').find('a').click();
});

/* Next category/section (right) */
Mousetrap.bind('right', function() {
    $('#categoryMenu').find('.active').next('li').find('a').click();
});

/* Prev category/section (left) */
Mousetrap.bind('left', function() {
    $('#categoryMenu').find('.active').prev('li').find('a').click();
});

/* Set search box focus (s) */
Mousetrap.bind('s', function() {
    $('#txtTorrentSearch').focus();
});

/* On search box focus: Trigger search event (enter/space)
* On overview: Start torrent (enter/space)
*/
Mousetrap.bind(['enter', 'space'], function() {
    if( $('txtTorrentSearch').is(':focus') ) {
        changeSearchText();
    }
});
