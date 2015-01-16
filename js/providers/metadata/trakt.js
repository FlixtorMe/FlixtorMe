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
    var API_ENDPOINT = "http://api.trakt.tv/";
    var MOVIE_PATH = 'movie';
    var API_KEY = "24f87043f125cd2f9e8b48c114c0d6b3";
    var url = API_ENDPOINT+MOVIE_PATH+"/summaries.json/"+API_KEY+"/"+imdbIds.join(',')+"/full";

    console.log(url);
    $.getJSON(url, function (data) {
    }).success(function (data) {
            if( data.status === "failure" ) {
                callback("error");
            }
            else {
                $.each(data, function (key, item) {
                    movies[item.imdb_id]['trailer'] = item.trailer;
                    movies[item.imdb_id]['runtime'] = item.runtime;
                    movies[item.imdb_id]['overview'] = item.overview;
                    movies[item.imdb_id]['tagline'] = item.tagline;
                    movies[item.imdb_id]['runtime'] = item.trailer;

                    if (typeof item.images.poster === 'undefined' || item.images.poster === '' || ~ item.images.poster.toString().indexOf('poster-dark') ) {
                        movies[item.imdb_id]['poster'] = '../../../images/no-poster.png';
                    }
                    else {
                        var moviePoster = item.images.poster.replace("/original/", "/thumb/");
                        movies[item.imdb_id]['poster'] = moviePoster;
                    }

                    movies[item.imdb_id]['fanart'] = item.images.fanart;

                    var genres = item.genres;
                    for (var i = 0; i < genres.length; ++i) {
                        genres[i] = genres[i].replace(" ", "-");
                    }
                    genres = genres.join(", ");
                    movies[item.imdb_id]['genres'] = genres;

                });

                callback(movies);
            }
        }).error(function () {
            utilities.showPrompt("An uncaughtException was found", "<span>The trakt service is unavailable. Please try it again later</span>.", "ok", function(answer) {
            });
            callback("error");
        });
};

//Exports
module.exports.getMetadata = getMetadata;