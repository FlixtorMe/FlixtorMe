//External modules
var address = require('network-address');
var http = require('http');
var fs = require('fs');
var peerflix = require('peerflix');
var request = require('request');
var gui = window.require('nw.gui');
var win = gui.Window.get();
var requestManager = require('request');
var path = require('path');
var os = require('os');

//Internal modules
var subtitle = require('../js/subtitle.js');
var yifysubtitle = require('../js/yifysubtitle.js');
var settings = require('../js/settings.js');

var utilities = require('../js/utilities.js');

var translations = require('../js/translations.js');
translations.initialize();

//Global variables
var engine, subManager, enginePort, subPort, dataPath, cacheDir, url;

var playMovieTorrent = function (infoHash, imdbID) {
    var torrent;
    var streamingPort = settings.readConfig('streamingPort');
    var connectionLimit = settings.readConfig('connectionLimit');
    var dht = settings.readConfig('dht');
    cacheDir = settings.readConfig('cacheDir');
    dataPath = cacheDir;
    subPort = 3550;

    if( streamingPort === '' ) {
        enginePort = Math.floor(Math.random() * (65535 - 49152 + 1)) + 49152; //Choose port between 49152 and 65535
    }
    else {
        enginePort = streamingPort;
    }

    if (engine) {
        if (!engine.swarm._destroyed) {
            console.log("The engine is already starded!");
            return;
        }
    }

    engine = peerflix( "magnet:?xt=urn:btih:" + infoHash, {
        connections: parseInt(connectionLimit),
        dht: parseInt(dht),
        path: dataPath,
        port: parseInt(enginePort)
    });

    var started = Date.now();
    var wires = engine.swarm.wires;
    var swarm = engine.swarm;

    engine.on('ready', function() {
        console.log(engine.torrent);
        console.log(engine.tracker);

        subManager = yifysubtitle(subPort);
        subManager.searchSubtitles(imdbID, function (success) {
            if(!success) {
                engine.skipSubtitles = true;
            }

            engine.langFound = success;
        });

    });

    engine.server.on('listening', function () {
        if (!engine.server.address())
            return;

        var port = engine.server.address().port;
        console.log(port);

        var href = 'http://' + address() + ':' + port + '/';
        console.log('Server is listening on ' + href);
    });

    var statsLog = function () {
        var runtime = Math.floor((Date.now() - started) / 1000);

        console.log(utilities.toBytes(swarm.downloaded) + " - " + runtime + " - " + swarm.queued);

        if (!swarm._destroyed) {
            setTimeout(statsLog, 500);
        }
    };

    statsLog();

    engine.server.once('error', function (err) {
        engine.server.listen(0);
        console.log(err);
    });

    engine.server.listen(parseInt(enginePort));
};

var playTorrent = function (infoHash) {
    var torrent;
    var streamingPort = settings.readConfig('streamingPort');
    var connectionLimit = settings.readConfig('connectionLimit');
    var dht = settings.readConfig('dht');
    cacheDir = settings.readConfig('cacheDir');
    dataPath = cacheDir;
    subPort = 3550;

    if( streamingPort === '' ) {
        enginePort = Math.floor(Math.random() * (65535 - 49152 + 1)) + 49152; //Choose port between 49152 and 65535
    }
    else {
        enginePort = streamingPort;
    }

    if (engine) {
        if (!engine.swarm._destroyed) {
            console.log("The engine is already starded!");
            return;
        }
    }

    engine = peerflix( "magnet:?xt=urn:btih:" + infoHash, {
        connections: parseInt(connectionLimit),
        dht: parseInt(dht),
        path: dataPath,
        port: parseInt(enginePort)
    });

    var started = Date.now();
    var wires = engine.swarm.wires;
    var swarm = engine.swarm;

    engine.on('ready', function() {
        console.log(engine.torrent);
        console.log(engine.tracker);

        subManager = subtitle(subPort);
        subManager.searchSubtitles(engine.torrent.name, function (success) {
            if(!success) {
                engine.skipSubtitles = true;
            }

            engine.langFound = success;
        });

    });

    engine.server.on('listening', function () {
        if (!engine.server.address())
            return;

        var port = engine.server.address().port;
        console.log(port);

        var href = 'http://' + address() + ':' + port + '/';
        console.log('Server is listening on ' + href);
    });

    var statsLog = function () {
        var runtime = Math.floor((Date.now() - started) / 1000);

        console.log(utilities.toBytes(swarm.downloaded) + " - " + runtime + " - " + swarm.queued);

        if (!swarm._destroyed) {
            setTimeout(statsLog, 500);
        }
    };

    statsLog();

    engine.server.once('error', function (err) {
        engine.server.listen(0);
        console.log(err);
    });

    engine.server.listen(parseInt(enginePort));
};

var rmDir = function(dirPath) {
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
        }
    }
};

var stopDownload = function () {
    cacheDir = settings.readConfig('cacheDir');
    var clearCache = settings.readConfig('clearCache');

    dataPath = cacheDir;

    if (engine) {
        try {
            engine.destroy();
            engine.server.listen(0);
            engine.server.close();

            if(subManager) {
                subManager.server.close();
            }
        }
        catch (e)
        {
            console.log(e);
        }

        console.log("Download has stopped!");
        if( clearCache === true ) {
            rmDir(dataPath);
            console.log("Data has been deleted!");
        }

        return true;
    }

    return false;
};

var stopPlayer = function (backCount) {
    stopDownload();
    window.history.go(-backCount);
};

var closeApp = function () {
    stopDownload();
    var $ = window.$;

    //Disable prompt if VLC because VLC is always in front of every element.
    if($("#VLC").length) {
        gui.App.closeAllWindows();
        return;
    }

    //Ask the user if he really want to close the app
    var closeMessageConfirm = translations.translate('Confirm close');
    var closeMessage = translations.translate('You are about to close the application. Are you sure you want to continue?');
    utilities.showPrompt(closeMessageConfirm,closeMessage, "question", function (answer) {
        if(answer) {
            gui.App.closeAllWindows();
        }
    });
};

var getEngine = function() {
    return engine;
};

var getSubManager = function () {
    return subManager;
};

var getEnginePort = function () {
    return enginePort;
};

function toggleFullScreen() {
    if (win.isFullscreen) {
        win.leaveFullscreen();
    } else {
        win.enterFullscreen();
    }
    win.focus();
}

function minimize() {
    win.minimize();
}

function goBack() {
    if(engine) {
        stopDownload();
    }

    if(window.sessionStorage.history) {
        var  historyList = JSON.parse(window.sessionStorage.history);

        if(historyList.length > 0) {

            window.location = historyList[(historyList.length - 1)];
            var index = historyList.indexOf(historyList.length - 1);
            historyList.splice(index, 1);
            window.sessionStorage.history = JSON.stringify(historyList);
        }
    }
}

//url must be absolute
function go(url) {
    window.location = url;
    saveHistory(url);
}

function changeFrame (frame) {
    url = "app://host/frames/"+frame + ".html";
    window.location = url;
    saveHistory(url);
}

function saveHistory(url)
{
    url = window.location.href;
    if(window.location.href == path)
        return;

    var historyList = [];
    if(window.sessionStorage.history) {
        historyList = JSON.parse(window.sessionStorage.history);

        //check for back duplicate
        if(historyList.length > 0) {
            if(historyList[(historyList.length - 1)] == url) {
                return;
            }
        }
    }

    historyList.push(url);
    window.sessionStorage.history = JSON.stringify(historyList);
}

function getYoutubeID(ytID) {
    var tmpArray = ytID.split("watch?v=");
    return tmpArray[1];
}

function checkForUpdates() {
    if( !(window.sessionStorage.history) ) {
        var $ = window.$;
        var currentVersion = settings.readConfig('version');
        $.getJSON("http://update.flixtor.me", function (data) {
        }).success(function (data) {
                if( data.version !== currentVersion ) {
                    utilities.showPrompt(translations.translate("New Flixtor version"), "<span>"+translations.translate("A new Flixtor release is available. You can directly download it")+" <a id='download-url' href='javascript:void(0)'>"+translations.translate("here")+"</a></span>.", "ok", function(answer) {
                    });
                }
            }).error(function () {
        });
        $("body").on("click", "#download-url", function () {
            var platform = getPlatform();
            if( platform == 'win32' || platform == 'win64' ) {
                gui.Shell.openExternal("http://flixtor.me/download/Flixtor.exe");
            }
            else if( platform == 'darwin' ) {
                gui.Shell.openExternal("http://flixtor.me/download/Flixtor_mac.tar.gz");
            }
            else if( platform == 'linux' ) {
                if( os.arch() == 'x64' ) {
                    gui.Shell.openExternal("http://flixtor.me/download/Flixtor_linux64.tar.gz");
                }
                else {
                    gui.Shell.openExternal("http://flixtor.me/download/Flixtor_linux32.tar.gz");
                }
            }
            else {
                gui.Shell.openExternal("http://flixtor.me");
            }
        })
    }
}

//Disable file drop over
window.addEventListener("dragover", function (e) {
    e = e || event;
    e.preventDefault();
}, false);

//Disable file drop over the application
window.addEventListener("drop", function (e) {
    e = e || event;
    e.preventDefault();
}, false);

//Disable file drap
window.addEventListener("dragstart", function (e) {
    e = e || event;
    e.preventDefault();
}, false);

win.on("loaded", function (e) {
    //Check for internet connection on startup
    /*utilities.hasInternetConnection(function (hasInternet) {
        if (!hasInternet) {
            utilities.showPrompt("No internet access", "You don't have access to internet, please check your connection and try again.", "ok", function(answer) {
                gui.App.closeAllWindows();
            });
        }
    });*/

    //$(".top-titlebar-back-button").removeClass("hide");
});

var getPlatform = function() {
    return process.platform;
};

//Force the app to focus on startup
win.focus();

//Exports
module.exports.minimize = minimize;
module.exports.toggleFullScreen = toggleFullScreen;
module.exports.stopDownload = stopDownload;
module.exports.stopPlayer = stopPlayer;
module.exports.closeApp = closeApp;
module.exports.playTorrent = playTorrent;
module.exports.playMovieTorrent = playMovieTorrent;
module.exports.changeFrame = changeFrame;
module.exports.getEngine = getEngine;
module.exports.getSubManager = getSubManager;
module.exports.getEnginePort = getEnginePort;
module.exports.goBack = goBack;
module.exports.go = go;
module.exports.getYoutubeID = getYoutubeID;
module.exports.checkForUpdates = checkForUpdates;

process.on('uncaughtException', function (err) {
    /*utilities.hasInternetConnection(function (hasInternet) {
        if (hasInternet) {
        }
    });

    utilities.showPrompt("An uncaughtException was found", "Error: <span>" + err.message.toString() + "</span><br/>The program will end.", "ok", function(answer) {
        process.exit(1);
    });*/
});
