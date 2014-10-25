var rpc = require('json-rpc2');
var main = require('./main.js');
var gui = window.require('nw.gui');
var win = gui.Window.get();
var server;

// Create server config
server = rpc.Server.$create({
    'websocket': true,
    'headers': {
        'Access-Control-Allow-Origin': '*'
    }
});

// Available json RPC functions
server.expose('toggleFullscreen', function (args, opt, callback) {
    if (win.isFullscreen) {
        win.leaveFullscreen();
    } else {
        win.enterFullscreen();
    }
    win.focus();
    callback(null, win.isFullscreen);
});

server.expose('minimizeWindow', function (args, opt, callback) {
    win.minimize();
    callback(null);
});

server.expose('closeWindow', function (args, opt, callback) {
    win.close();
    callback(null);
});

server.expose('goBack', function (args, opt, callback) {
    if(window.sessionStorage.history) {
        var  historyList = JSON.parse(window.sessionStorage.history);

        if(historyList.length > 0) {
            window.location = historyList[(historyList.length - 1)];
            var index = historyList.indexOf(historyList.length - 1);
            historyList.splice(index, 1);
            window.sessionStorage.history = JSON.stringify(historyList);
        }
    }
    callback(null);
});

server.expose('showMovies', function (args, opt, callback) {
    main.changeFrame('movies');
    callback(null, 'Movies');
});

server.expose('showSeries', function (args, opt, callback) {
    main.changeFrame('series');
    callback(null, 'Series');
});

server.expose('showAnimes', function (args, opt, callback) {
    main.changeFrame('animes');
    callback(null, 'Animes');
});

server.expose('showFavorites', function (args, opt, callback) {
    main.changeFrame('favorites');
    callback(null, 'Favorites');
});

server.expose('showSettings', function (args, opt, callback) {
    main.changeFrame('settings');
    callback(null, 'Settings');
});

// Listen Server
server.listen(8400);