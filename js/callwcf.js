var utilities = require('../js/utilities.js');
var ts = require('../js/kickasstorrents/torrentScraper.js');

//External functions
var searchMovies = function (sort, keywords, genre, limit, page, order, callback) {
    if( genre === undefined ) {
        genre = 'All';
    }
    $ = window.$;

    console.log("http://yts.re/api/list.json?sort="+sort+"&limit="+limit+"&genre="+genre+"&keywords="+keywords+"&order="+order+"&set="+page+"");
    var movies = [];
    var imdbIds = [];
    $.getJSON("https://yts.re/api/list.json?sort="+sort+"&limit="+limit+"&genre="+genre+"&keywords="+keywords+"&order="+order+"&set="+page+"", function (data) {
    }).success(function (data) {
        if (data.status !== 'fail' || data.MovieList !== undefined ) {
            $.each(data.MovieList, function (key, val) {

                var movie =  {
                    "title" : val.MovieTitleClean.replace(/\([^)]*\)|1080p|DIRECTORS CUT|EXTENDED|UNRATED|3D|[()]/g, ''),
                    "movieYear" : val.MovieYear,
                    "imdbCode" : val.ImdbCode,
                    "rating" : val.MovieRating,
                    "torrents":[{
                        "1080p":"",
                        "720p":"",
                        "unknown":""
                    }]
                };

                if( val.Quality === '1080p' ) {
                    movie.torrents[0]['1080p'] = val.TorrentMagnetUrl;
                }
                else if( val.Quality === '720p' ) {
                    movie.torrents[0]['720p'] = val.TorrentMagnetUrl;
                }
                else {
                    movie.torrents[0]['unknown'] = val.TorrentMagnetUrl;
                }


                var state = false;
                $.each(movies, function (index, movie) {
                    if( val.ImdbCode === movie['imdbCode'] ) {
                         if( val.Quality === '1080p' ) {
                            movie.torrents[0]['1080p'] = val.TorrentMagnetUrl;
                         }
                         else if( val.Quality === '720p' ) {
                            movie.torrents[0]['720p'] = val.TorrentMagnetUrl;
                         }
                         else {
                            movie.torrents[0]['unknown'] = val.TorrentMagnetUrl;
                         }

                        state = true;
                        return false;
                    }

                });
                if( state === true ) {
                    return true;
                }

                imdbIds.push(val.ImdbCode);
                movies.push(movie);
            });

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
                        $.each(movies, function (index, movie) {
                            if( item.imdb_id === movie['imdbCode'] ) {
                                movie.trailer = item.trailer;
                                movie.runtime = item.runtime;
                                movie.overview = item.overview;
                                movie.tagline = item.tagline;
                                movie.runtime = item.runtime;
                                movie.poster = item.images.poster;
                                movie.fanart = item.images.fanart;
                                var genres = item.genres;
                                for (var i = 0; i < genres.length; ++i) {
                                    genres[i] = genres[i].replace(" ", "-");
                                }
                                genres = genres.join(", ");
                                movie.genres = genres;
                            }
                        });
                    });

                    console.log(movies);
                    callback(movies);
                }
            }).error(function () {
                utilities.showPrompt("An uncaughtException was found", "<span class='text-danger'>Trakt service is unavailable. Please try it again later</span>.", "ok", function(answer) {
                });
                callback("error");
            });
        }
        else {
            callback("error");
        }
    }).error(function () {
        $.getJSON("https://yts.im/api/list.json?sort="+sort+"&limit="+limit+"&genre="+genre+"&keywords="+keywords+"&order="+order+"&set="+page+"", function (data) {
        }).success(function (data) {
            if (data.status !== 'fail' || data.MovieList !== undefined ) {
                $.each(data.MovieList, function (key, val) {

                    var movie =  {
                        "title" : val.MovieTitleClean.replace(/\([^)]*\)|1080p|DIRECTORS CUT|EXTENDED|UNRATED|3D|[()]/g, ''),
                        "movieYear" : val.MovieYear,
                        "imdbCode" : val.ImdbCode,
                        "rating" : val.MovieRating,
                        "torrents":[{
                            "1080p":"",
                            "720p":"",
                            "unknown":""
                        }]
                    };

                    if( val.Quality === '1080p' ) {
                        movie.torrents[0]['1080p'] = val.TorrentMagnetUrl;
                    }
                    else if( val.Quality === '720p' ) {
                        movie.torrents[0]['720p'] = val.TorrentMagnetUrl;
                    }
                    else {
                        movie.torrents[0]['unknown'] = val.TorrentMagnetUrl;
                    }


                    var state = false;
                    $.each(movies, function (index, movie) {
                        if( val.ImdbCode === movie['imdbCode'] ) {
                            if( val.Quality === '1080p' ) {
                                movie.torrents[0]['1080p'] = val.TorrentMagnetUrl;
                            }
                            else if( val.Quality === '720p' ) {
                                movie.torrents[0]['720p'] = val.TorrentMagnetUrl;
                            }
                            else {
                                movie.torrents[0]['unknown'] = val.TorrentMagnetUrl;
                            }

                            state = true;
                            return false;
                        }

                    });
                    if( state === true ) {
                        return true;
                    }

                    imdbIds.push(val.ImdbCode);
                    movies.push(movie);
                });

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
                            $.each(movies, function (index, movie) {
                                if( item.imdb_id === movie['imdbCode'] ) {
                                    movie.trailer = item.trailer;
                                    movie.runtime = item.runtime;
                                    movie.overview = item.overview;
                                    movie.tagline = item.tagline;
                                    movie.runtime = item.runtime;
                                    movie.poster = item.images.poster;
                                    movie.fanart = item.images.fanart;
                                    var genres = item.genres;
                                    for (var i = 0; i < genres.length; ++i) {
                                        genres[i] = genres[i].replace(" ", "-");
                                    }
                                    genres = genres.join(", ");
                                    movie.genres = genres;
                                }
                            });
                        });

                        console.log(movies);
                        callback(movies);
                    }
                }).error(function () {
                    utilities.showPrompt("An uncaughtException was found", "<span class='text-danger'>Trakt service is unavailable. Please try it again later</span>.", "ok", function(answer) {
                    });
                    callback("error");
                });
            }
            else {
                callback("error");
            }
        }).error(function () {
            utilities.showPrompt("An uncaughtException was found", "<span class='text-danger'>An uncaughtException was found</span>.", "ok", function(answer) {
            });
            callback("error");
        });
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

    console.log("http://eztvapi.re/shows/"+page+"?sort="+sort+"&limit="+limit+"&genre="+genre+"&keywords"+keywords+"&order=-1");
    $.getJSON("http://eztvapi.re/shows/"+page+"?sort="+sort+"&limit="+limit+"&genre="+genre+"&keywords="+keywords+"&order=-1", function (data) {
    }).success(function (data) {
        if (data !== undefined) {
            callback(data);
        }
        else {
            callback("error");
        }
    }).error(function () {
        utilities.showPrompt("An uncaughtException was found", "<span class='text-danger'>Eztv is unavailable. Please try it again later</span>.", "ok", function(answer) {
        });
        callback("error");
    });
};

//External functions
var searchSerieDetail = function (id, callback) {
    $ = window.$;

    console.log("http://eztvapi.re/show/"+id+"");
    $.getJSON("http://eztvapi.re/show/"+id+"", function (data) {
    }).success(function (data) {
        if (data._id !== '') {
            callback(data);
        }
        else {
            callback("error");
        }
    }).error(function () {
        utilities.showPrompt("An uncaughtException was found", "<span class='text-danger'>Eztv is unavailable. Please try it again later</span>.", "ok", function(answer) {
        });
        callback("error");
    });
};

//External functions
var searchTorrents = function (keywords, category, sortBy, page, callback) {
    $ = window.$;
    ts.getTorrents(keywords, { kickasstorrents: category}, null, sortBy, page, function(err, torrents){
        if(err) {
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
module.exports.searchTorrents = searchTorrents;