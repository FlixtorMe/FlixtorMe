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

function parseYtsData(cacheFile, data, movies, imdbIds, callback) {
    $.each(data.MovieList, function (key, val) {

        var movie =  {
            "title" : val.MovieTitleClean.replace(/\([^)]*\)|1080p|DIRECTORS CUT|EXTENDED|UNRATED|3D|[()]/g, ''),
            "movieYear" : val.MovieYear,
            "imdbCode" : val.ImdbCode,
            "rating" : val.MovieRating,
            "trailer" : "",
            "runtime" : "",
            "overview" : "",
            "tagline" : "",
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

    var provider = settings.readConfig('metaProvider');

    // Include meta provider
    var metaProvider = require('../js/providers/metadata/'+provider+'.js');

    metaProvider.getMetadata(movies, imdbIds, function(result) {
        if( result == "error" ) {
            callback("error");
        }
        else {
            // Cache the result
            cache.setCache(cacheFile, cachePath, JSON.stringify(movies));
            callback(movies);
        }
    });
}

//External functions
var searchMovies = function (sort, keywords, genre, limit, page, order, callback) {
    if( genre === undefined ) {
        genre = 'All';
    }
    $ = window.$;

    var movies = {};
    var imdbIds = [];
    var ytsUrl = ytsEndpoint+"list.json?sort="+sort+"&limit="+limit+"&genre="+genre+"&keywords="+keywords+"&order="+order+"&set="+page+"";
    console.log(ytsUrl);

    // Check if request is cached
    var hash = sha1(ytsUrl);
    cache.getCacheIfValid(hash, cachePath, 3600, function(result) {
        if( result == null ) {
            console.log("Get remote content");
            $.getJSON(ytsUrl, function (data) {
            }).success(function (data) {
                if (data.status !== 'fail' || data.MovieList !== undefined ) {
                    parseYtsData(hash, data, movies, imdbIds, callback);
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
module.exports.searchSeries = searchSeries;
module.exports.searchSerieDetail = searchSerieDetail;
module.exports.searchAnimes = searchAnimes;
module.exports.searchAnimeDetail = searchAnimeDetail;
module.exports.searchTorrents = searchTorrents;