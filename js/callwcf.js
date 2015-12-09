var sha1 = require('sha1');
var utilities = require('../js/utilities.js');
var settings = require('../js/settings.js');
var cache = require('../js/cache.js');
var ts = require('../js/kickasstorrents/torrentScraper.js');
var translations = require('../js/translations.js');

var data_path = global.window.nwDispatcher.requireNwGui().App.dataPath;
var cachePath = data_path+"/cache";

var ytsEndpoint = settings.readConfig('ytsEndpoint');
var eztvEndpoint = settings.readConfig('eztvEndpoint');

function parseYtsData(cacheFile, data, movies, callback) {
    $.each(data.data.movies, function (key, val) {

        var movie =  {
            "id" : val.id,
            "title" : val.title,
            "imdbCode" : val.imdb_code,
            "poster" : val.medium_cover_image
        };

        movies[val.id] = movie;
    });

    cache.setCache(cacheFile, cachePath, JSON.stringify(movies));
    callback(movies);
}

//External functions
var searchMovies = function (sort, keywords, genre, limit, page, order, callback) {
    if( genre === undefined ) {
        genre = '';
    }
    $ = window.$;

    var movies = {};
    var ytsUrl = ytsEndpoint+"list_movies.json?limit="+limit+"&genre="+genre+"&query_term="+keywords+"&order_by="+order+"&page="+page+"";
    //var ytsUrl = ytsEndpoint+"list_movies.json?sort_by="+sort+"&limit="+limit+"&genre="+genre+"&query_term="+keywords+"&order_by="+order+"&page="+page+"";
    console.log(ytsUrl);

    // Check if request is cached
    var hash = sha1(ytsUrl);
    cache.getCacheIfValid(hash, cachePath, 3600, function(result) {
        if( result == null ) {
            console.log("Get remote content");
            $.getJSON(ytsUrl, function (data) {
            }).success(function (data) {
                if (data.status == 'ok' || data.data !== undefined ) {
                    parseYtsData(hash, data, movies, callback);
                }
                else {
                    callback("error");
                }
            }).error(function () {
                utilities.showPrompt("An uncaughtException was found", "<span>"+translations.translate("Yts is unavailable. Please try it again later")+"</span>.", "ok", function(answer) {
                });
                callback("error");
            });
        } else {
            console.log("Get cached content");
            callback(JSON.parse(result));
        }
    });
};

//External functions
var searchMovieDetail = function (id, callback) {
    $ = window.$;

    console.log(ytsEndpoint+"movie_details.json?movie_id="+id+"&with_images=true");
    $.getJSON(ytsEndpoint+"movie_details.json?movie_id="+id+"&with_images=true", function (data) {
    }).success(function (data) {
            if (data.status == 'ok' || data.data !== undefined ) {
                var movie =  {
                    "id" : data.data.id,
                    "title" : data.data.title,
                    "movieYear" : data.data.year,
                    "imdbCode" : data.data.imdb_code,
                    "genre" : data.data.genres,
                    "rating" : data.data.rating,
                    "trailer" : data.data.yt_trailer_code,
                    "runtime" : data.data.runtime,
                    "overview" : data.data.description_full,
                    "tagline" : data.data.description_intro,
                    "ageRating": data.data.mpa_rating,
                    "poster" : data.data.images.medium_cover_image,
                    "fanart" : data.data.images.background_image,
                    "torrents": data.data.torrents
                };

                callback(movie);
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
var searchSeries = function (sort, keywords, genre, limit, page, callback) {
    if( genre === undefined ) {
        genre = 'All';
    }

    if( keywords === undefined ) {
        keywords = '';
    }
    $ = window.$;

    var ezTvUrl = eztvEndpoint+"shows/"+page+"?sort="+sort+"&limit="+limit+"&genre="+genre+"&keywords"+keywords+"&order=-1";
    console.log(ezTvUrl);

    // Check if request is cached
    var hash = sha1(ezTvUrl);
    cache.getCacheIfValid(hash, cachePath, 3600, function(result) {
        if( result == null ) {
            console.log("Get remote content");
            $.getJSON(ezTvUrl, function (data) {
            }).success(function (data) {
                if (data !== undefined) {
                    // Cache the result
                    cache.setCache(hash, cachePath, JSON.stringify(data));
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
        } else {
            console.log("Get cached content");
            callback(JSON.parse(result));
        }
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
module.exports.searchMovieDetail = searchMovieDetail;
module.exports.searchSeries = searchSeries;
module.exports.searchSerieDetail = searchSerieDetail;
module.exports.searchAnimes = searchAnimes;
module.exports.searchAnimeDetail = searchAnimeDetail;
module.exports.searchTorrents = searchTorrents;