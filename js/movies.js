function infinitescroll() {
    $("#movies").scroll(function () {
        if( $("#movies").scrollTop() + $("#movies").height() > $("#movieContainer").height() - 300 ) {
            movieFilter.page = movieFilter.page+1;
            applySearch();
        }
    });
}

function closeMovieDetail()
{
    try{
        var subManager = yifysubtitle.getSubManager();
        if( subManager ) {
            subManager.server.listen(0);
            subManager.server.close();
        }
    }
    catch(e){
        console.log(e);
    }

    $("#customCSS").stop();
    $("#customCSS").removeAttr('style');
    $("#customCSS").empty();
    $("#content-overlay").hide();
    $("#movie").hide();
    $("#content").css("opacity", "1");
    $("#head-bar").show();
    $( "#btnBuy").unbind( "click" );
}

function changeSearchText() {
    movieFilter.page = 1;
    movieFilter.searchValue = $('#txtMovieSearch').val();
    $('#movieContainer').empty();
    $container.isotope('destroy');
    $container.isotope({
        itemSelector: '.element',
        animationEngine: 'jquery',
        layoutMode: 'fitRows',
        animationOptions: {
            duration: 600,
            easing: 'linear',
            queue: false
        }
    });

    if(movieFilter.searchValue.indexOf('magnet:?xt=urn:btih:') == 0) {
        var infoHash = movieFilter.searchValue.split('magnet:?xt=urn:btih:');
        main.go("players/player.html?torrentId=" + infoHash[1]);
    }
    else {
        applySearch();
    }
}

function changeFilterGenre(name) {
    movieFilter.genre =  name;
    movieFilter.page = 1;
    var translatedGenre = translations.translate(name);
    $("#filterByGenre").text(": " + translatedGenre);
    $('#movieContainer').empty();
    $container.isotope('destroy');
    $container.isotope({
        itemSelector: '.element',
        animationEngine: 'jquery',
        layoutMode: 'fitRows',
        animationOptions: {
            duration: 600,
            easing: 'linear',
            queue: false
        }
    });

    applySearch();
}

function changeFilterCategory(name) {
    movieFilter.category = name;
    movieFilter.page = 1;

    var translatedCategory = translations.translate(name);
    $("#filterByCategory").text(" : " + translatedCategory);
    $('#movieContainer').empty();
    $('#movieContainer').isotope("destroy");
    $('#movieContainer').isotope({
        itemSelector: '.element',
        animationEngine: 'jquery',
        layoutMode: 'fitRows',
        animationOptions: {
            duration: 600,
            easing: 'linear',
            queue: false
        }
    });

    //Create the category filter
    switch (movieFilter.category) {
        case "Most downloaded":
            movieFilter.sort = "seeds";
            break;
        case "Date":
            movieFilter.sort = "date";
            break;
        case "Year":
            movieFilter.sort = "year";
            break;
        case "Rating":
            movieFilter.sort = "rating";
            break;
        case "Alphabetic":
            movieFilter.sort = "alphabet";
            movieFilter.order = 'asc';
            break;
    }

    applySearch();
}

function closeTrailerOverlay()
{
    $("#video-container-trailer").empty();
    $("#content-overlay").show();
    $(".top-titlebar-back-button").attr("onclick","closeMovieDetail()");
}

$(document).on('mouseover','a.shadow',function(){
    $(".on").removeClass("on");
    $(this).addClass("on");
});
