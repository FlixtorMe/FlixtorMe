function infinitescroll() {
    $("#series").scroll(function () {
        if( $("#series").scrollTop() + $("#series").height() > $("#serieContainer").height() - 300 ) {
            serieFilter.page = serieFilter.page+1;
            serieApplySearch();
        }
    });
}

function appendResult(result) {
    var content = "";
    if( result !== 'error' ) {
        $(result).each(function(index) {
            var serie = result[index];

            if (typeof serie.images.poster !== 'undefined' && !(~serie.images.poster.toString().indexOf('poster-dark')) ) {
                var newChars = "-300";
                var position = serie.images.poster.lastIndexOf(".");
                var tmpOne = serie.images.poster.substr(0, position);
                var tmpTwo = serie.images.poster.substr(position, serie.images.poster.length);
                var seriePoster = tmpOne + newChars + tmpTwo;
            }
            else {
                var seriePoster = '../images/no-poster.png';
            }
            content += "<div class='element transition isotope-item'>" +
                "<a class='shadow' onClick='showDetails(" + "\"" + serie._id + "\"" + ");'>" +
                "<img alt='image' src='" + seriePoster + "' style='width:160px; height:230px;'/>" +
                "</a>" +
                "<div class='p-5' style='max-width:160px;'>" +
                "<div style='font-size:14px;'>" + serie.title + "</div>" +
                "</div>" +
                "<div style='clear:both'></div>" +
                "</div>";
        });

    }
    else {
        console.log("Service not available");
    }

    if (content != "") {
        $container.isotope( 'insert', $(content) );
        infinitescroll();
    }

    //Remove the spinner since we got the data we wanted
    $("#main-spinner").remove();
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