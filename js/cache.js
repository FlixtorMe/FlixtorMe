var fs = require('fs');
var moment = require('moment');

var getCacheIfValid = function (cacheFile, cacheFolder, ttl, callback) {
    var file = cacheFolder+"/"+cacheFile;
    fs.exists(file, function(exists) {
        if( exists ) {
            fs.stat(file, function(err, stat) {
                var startDate  = moment(stat.mtime.getTime());
                var endDate = moment(new Date().getTime());
                var secondsDiff = endDate.diff(startDate, 'seconds');
                if( secondsDiff > ttl ) {
                    fs.unlinkSync(file);
                    callback(null);
                } else {
                    fs.readFile(file, 'utf-8', function (err, data) {
                        if( err ) {
                            callback(null);
                        }
                        callback(data);
                    });
                }
            });
        } else {
            callback(null);
        }
    });
};

var setCache = function (cacheFile, cacheFolder, result) {
    var file = cacheFolder+"/"+cacheFile;
    fs.exists(cacheFolder, function(exists) {
        if( !exists ) {
            fs.mkdir(cacheFolder, 0777, function(err) {
                fs.writeFile(file, result, function (err) {
                    if (err) return console.log(err);
                });
            });
        } else {
            fs.writeFile(file, result, function (err) {
                if (err) return console.log(err);
            });
        }
    });
};

//Exports
module.exports.setCache = setCache;
module.exports.getCacheIfValid = getCacheIfValid;