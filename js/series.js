function infinitescroll() {
    $("#series").scroll(function () {
        if( $("#series").scrollTop() + $("#series").height() > $("#serieContainer").height() - 300 ) {
            serieFilter.page = serieFilter.page+1;
            serieApplySearch();
        }
    });
}

function changeSearchText() {
    serieFilter.page = 1;
    serieFilter.searchValue = $("#txtSerieSearch").val();
    $("#serieContainer").empty();

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

    if(serieFilter.searchValue.indexOf('magnet:?xt=urn:btih:') == 0) {
        var infoHash = serieFilter.searchValue.split('magnet:?xt=urn:btih:');
        main.go("players/player.html?torrentId=" + infoHash[1]);
    }
    else {
        serieApplySearch();
    }
}

function changeFilterGenre(name) {
    serieFilter.page = 1;
    serieFilter.genre =  name;

    var translatedGenre = translations.translate(name);
    $("#filterByGenre").text(": " + translatedGenre);
    $("#serieContainer").empty();

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

    serieApplySearch();
}

function changeFilterCategory(name) {
    //Change category name
    serieFilter.category = name;
    serieFilter.page = 1;

    var translatedCategory = translations.translate(name);
    $("#filterByCategory").text(" : " + translatedCategory);
    $("#serieContainer").empty();

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

    //Create the category filter
    switch (serieFilter.category) {
        case "Most downloaded":
            serieFilter.sort = "seeds";
            break;
        case "Updated":
            serieFilter.sort = "updated";
            break;
        case "Year":
            serieFilter.sort = "year";
            break;
        case "Name":
            serieFilter.sort = "name";
            break;
    }

    //Apply the setting to search
    serieApplySearch();
}