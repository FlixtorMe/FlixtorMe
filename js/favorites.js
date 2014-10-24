var Datastore = require('nedb')
var db = require('./db.js');

var favorites = db.loadDB("favorites.db");

var getFavorites = function (callback) {
    favorites.find({}, function (err, docs) {
        callback(docs);
    });
}

var addToFavorites = function (element) {
    favorites.insert(element, function (err, newDoc) {
    });
}

var removeFromFavorites = function (id) {
    favorites.remove({ imdbCode: id }, {}, function (err, numRemoved) {
    });
    favorites.remove({ imdb_id: id }, {}, function (err, numRemoved) {
    });
    favorites.remove({ id: id }, {}, function (err, numRemoved) {
    });
}
var checkIfFavorite = function (id, callback) {
    var favorite = false;
    favorites.findOne({ imdbCode: id }, function (err, mDoc) {
        if( mDoc !== null ) {
            favorite = true;
            callback(favorite);
        }
        else {
            favorites.findOne({ imdb_id: id }, function (err, sDoc) {
                if( sDoc !== null ) {
                    favorite = true;
                    callback(favorite);
                }
                else {
                    favorites.findOne({ id: id }, function (err, aDoc) {
                        if( aDoc !== null ) {
                            favorite = true;
                            callback(favorite);
                        }
                        else {
                            callback(favorite);
                        }
                    });
                }
            });
        }
    });
}

//Exports
module.exports.getFavorites = getFavorites;
module.exports.addToFavorites = addToFavorites;
module.exports.removeFromFavorites = removeFromFavorites;
module.exports.checkIfFavorite = checkIfFavorite;