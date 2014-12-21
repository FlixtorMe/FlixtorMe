var utilities = require('../../utilities.js');

/* Editable movie values
        var movie =  {
        "title" : "",     (required)
        "movieYear" : "", (optional)
        "imdbCode" : "",  (required)
        "rating" : "",    (optional)
        "trailer" : "",   (optional)
        "runtime" : "",   (optional)
        "overview" : "",  (required)
        "tagline" : "",   (required)
        "poster" : "",    (required)
        "fanart" : "",    (optional)
    };
*/

var getMetadata = function (movies, imdbIds, callback) {
    var index = 1;
    $.each(movies, function (key, movie) {
        var url = "http://api.thdemoviedb.org/3/movie/"+movie.imdbCode+"?api_key=a7e7f09a1273d6b663a4ea3c86859375&append_to_response=trailers";
        $.getJSON(url, function (data) {
        }).success(function (data) {
            movie.runtime = data.runtime;
            movie.overview = data.overview;
            var genres = data.genres;
            for (var i = 0; i < genres.length; ++i) {
                genres[i] = genres[i].name;
            }
            genres = genres.join(", ");
            movie.genres = genres;
            if( typeof data.poster !== 'undefined' || data.poster_path !== '' ) {
                movie.poster = "https://image.tmdb.org/t/p/w185"+data.poster_path;
            }
            else {
                movie.poster = '../../../images/no-poster.png';
            }
            movie.fanart = "https://image.tmdb.org/t/p/original"+data.backdrop_path;

            if( data.trailers.youtube.length > 0 ) {
                movie.trailer = "https://www.youtube.com/watch?v="+data.trailers.youtube[0].source;
            }

            if( Object.keys(movies).length == index ) {
                console.log(movies);
                callback(movies);
            }

            index++;
        }).error(function () {
            utilities.showPrompt("An uncaughtException was found", "<span>The moviedb service is unavailable. Please try it again later</span>.", "ok", function(answer) {
            });
            callback("error");
        });
    });
};

//Exports
module.exports.getMetadata = getMetadata;