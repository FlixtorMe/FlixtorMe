var utilities = require('../js/utilities.js');
var settings = require('../js/settings.js');
var ts = require('../js/kickasstorrents/torrentScraper.js');
var translations = require('../js/translations.js');

var ytsEndpoint = settings.readConfig('ytsEndpoint');
var eztvEndpoint = settings.readConfig('eztvEndpoint');
var provider = settings.readConfig('metaProvider');

function parseYtsData(data, movies, imdbIds, callback) {
    $.each(data.MovieList, function (key, val) {

        var movie =  {
            "title" : val.MovieTitleClean.replace(/\([^)]*\)|1080p|DIRECTORS CUT|EXTENDED|UNRATED|3D|[()]/g, ''),
            "movieYear" : val.MovieYear,
            "imdbCode" : val.ImdbCode,
            "rating" : val.MovieRating,
            "torrents":{}
        };

        if( val.Quality === '1080p' ) {
            movie.torrents['1080p'] = val.TorrentMagnetUrl;
        }
        else if( val.Quality === '720p' ) {
            movie.torrents['720p'] = val.TorrentMagnetUrl;
        }
        else {
            movie.torrents['unknown'] = val.TorrentMagnetUrl;
        }

        if(movies.hasOwnProperty(val.ImdbCode)){
            var tmpMovie = movies[val.ImdbCode];
            if( val.Quality === '1080p' ) {
                tmpMovie.torrents['1080p'] = val.TorrentMagnetUrl;
            }
            else if( val.Quality === '720p' ) {
                tmpMovie.torrents['720p'] = val.TorrentMagnetUrl;
            }
            else {
                tmpMovie.torrents['unknown'] = val.TorrentMagnetUrl;
            }

            return true;
        }

        imdbIds.push(val.ImdbCode);
        movies[val.ImdbCode] = movie;

        /* OMDB API
         $.each(movies, function (index, movie) {
         var url = "http://www.omdbapi.com/?i="+movie.imdbCode+"&plot=full&r=json";
         $.getJSON(url, function (data) {
         }).success(function (data) {
         movie.runtime = data.Runtime;
         movie.overview = data.Plot;
         if (typeof data.poster !== 'undefined' || data.poster_path !== '' ) {
         movie.poster = data.Poster;
         }
         else {
         movie.poster = '../images/no-poster.png';
         }
         movie.fanart = data.Poster;
         if( movies.length+-1 == index ) {
         console.log(movies);
         callback(movies);
         }
         }).error(function () {
         utilities.showPrompt("An uncaughtException was found", "<span>The OMDB service is unavailable. Please try it again later</span>.", "ok", function(answer) {
         });
         callback("error");
         });
         });*/
    });

    if( provider == 'themoviedb' ) {
        /* THE Movie DB API */
        $.each(movies, function (index, movie) {
            var url = "http://api.themoviedb.org/3/movie/"+movie.imdbCode+"?api_key=a7e7f09a1273d6b663a4ea3c86859375&append_to_response=trailers";
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
                        movie.poster = '../images/no-poster.png';
                    }
                    movie.fanart = "https://image.tmdb.org/t/p/original"+data.backdrop_path;
                    if( movies.length+-1 == index ) {
                        console.log(movies);
                        callback(movies);
                    }
                    if( data.trailers.youtube.length > 0 ) {
                        movie.trailer = "https://www.youtube.com/watch?v="+data.trailers.youtube[0].source;
                    }

                }).error(function () {
                    utilities.showPrompt("An uncaughtException was found", "<span>"+translations.translate("The moviedb service is unavailable. Please try it again later")+"</span>.", "ok", function(answer) {
                    });
                    callback("error");
                });
        });
    }
    else {
        /* TRAKT API */
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
                        movies[item.imdb_id]['poster'] = '../images/no-poster.png';
                    }
                    else {
                        var newChars = '-300';
                        var position = item.images.poster.lastIndexOf(".");
                        var tmpOne = item.images.poster.substr(0, position);
                        var tmpTwo = item.images.poster.substr(position, item.images.poster.length);
                        var moviePoster = tmpOne + newChars + tmpTwo;
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
            utilities.showPrompt("An uncaughtException was found", "<span>"+translations.translate("Trakt service is unavailable. Please try it again later")+"</span>.", "ok", function(answer) {
            });
            callback("error");
        });
    }
}

//External functions
var searchMovies = function (sort, keywords, genre, limit, page, order, callback) {
    if( genre === undefined ) {
        genre = 'All';
    }
    $ = window.$;

    var movies = {};
    var imdbIds = [];
    console.log(ytsEndpoint+"list.json?sort="+sort+"&limit="+limit+"&genre="+genre+"&keywords="+keywords+"&order="+order+"&set="+page+"");
    $.getJSON(ytsEndpoint+"list.json?sort="+sort+"&limit="+limit+"&genre="+genre+"&keywords="+keywords+"&order="+order+"&set="+page+"", function (data) {
    }).success(function (data) {
        if (data.status !== 'fail' || data.MovieList !== undefined ) {
            parseYtsData(data, movies, imdbIds, callback);
        }
        else {
            callback("error");
        }
    }).error(function () {
        utilities.showPrompt("An uncaughtException was found", "<span>"+translations.translate("Yts is unavailable. Please try it again later")+"</span>.", "ok", function(answer) {
        });
        callback("error");
    });
};

//External functions
var searchSeries = function (sort, keywords, genre, limit, page, callback) {
    if( genre === undefined ) {
        genre = 'All';
    }

    if( keywords === undefined ) {
        keywords = '';
    }
    $ = window.$;

    console.log(eztvEndpoint+"shows/"+page+"?sort="+sort+"&limit="+limit+"&genre="+genre+"&keywords"+keywords+"&order=-1");
    $.getJSON(eztvEndpoint+"shows/"+page+"?sort="+sort+"&limit="+limit+"&genre="+genre+"&keywords="+keywords+"&order=-1", function (data) {
    }).success(function (data) {
        if (data !== undefined) {
            callback(data);
        }
        else {
            callback("error");
        }
    }).error(function () {
        utilities.showPrompt("An uncaughtException was found", "<span>"+translations.translate("Eztv is unavailable. Please try it again later")+"</span>.", "ok", function(answer) {
        });
        callback("error");
    });
};

//External functions
var searchSerieDetail = function (id, callback) {
    $ = window.$;

    console.log(eztvEndpoint+"show/"+id+"");
    $.getJSON(eztvEndpoint+"show/"+id+"", function (data) {
    }).success(function (data) {
        if (data._id !== '') {
            callback(data);
        }
        else {
            callback("error");
        }
    }).error(function () {
        utilities.showPrompt("An uncaughtException was found", "<span>"+translations.translate("Eztv is unavailable. Please try it again later")+"</span>.", "ok", function(answer) {
        });
        callback("error");
    });
};

var searchAnimes = function (page, type, sort, genre, keywords, status, order, limit, callback) {
    $ = window.$;

    var url = 'http://ptp.haruhichan.com/list.php?'+'page='+page+'&type='+type+'&sort='+sort+'&order='+order+'&search='+keywords+'&genres='+genre+'&status='+status+'&limit='+limit;
    console.log(url);
    $.getJSON(url, function (data) {
    }).success(function (data) {
        if(!data || (data.error && data.error !== 'No data returned')) {
            callback("error");
        }
        else {
            callback(data);
        }
    }).error(function () {
        utilities.showPrompt("An uncaughtException was found", "<span>"+translations.translate("Haruhichan is unavailable. Please try it again later")+"</span>.", "ok", function(answer) {
        });
        callback("error");
    });
};

var searchAnimeDetail = function (id, callback) {
    $ = window.$;

    var url = 'http://ptp.haruhichan.com/anime.php?'+'id='+id;
    $.getJSON(url, function (data) {
    }).success(function (data) {
        if(!data || (data.error && data.error !== 'No data returned')) {
            callback("error");
        }
        else {
            callback(data);
        }
    }).error(function () {
        utilities.showPrompt("An uncaughtException was found", "<span>"+translations.translate("Haruhichan is unavailable. Please try it again later")+"</span>.", "ok", function(answer) {
        });
        callback("error");
    });
};

//External functions
var searchTorrents = function (keywords, category, sortBy, page, callback) {
    $ = window.$;
    ts.getTorrents(keywords, { kickasstorrents: category}, null, sortBy, page, function(err, torrents){
        if(err) {
            console.log(err);
            callback("error");
        }
        else {
            callback(torrents);
        }
    });
};

//Exports
module.exports.searchMovies = searchMovies;
module.exports.searchSeries = searchSeries;
module.exports.searchSerieDetail = searchSerieDetail;
module.exports.searchAnimes = searchAnimes;
module.exports.searchAnimeDetail = searchAnimeDetail;
module.exports.searchTorrents = searchTorrents;