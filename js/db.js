var Datastore = require('nedb')
var path = require('path')
var dataPath = global.window.nwDispatcher.requireNwGui().App.dataPath;

var loadDB = function (db) {
    var favorites = new Datastore({
        filename: path.join(dataPath, db),
        autoload: true
    });

    return favorites;
}

//Exports
module.exports.loadDB = loadDB;