var $ = require('cheerio');
var settings = require('../settings.js');
var https = require('https');

var kickassEndpoint = settings.readConfig('kickassEndpoint');
var baseUrl = kickassEndpoint.substr(kickassEndpoint.indexOf('://')+3);
if( kickassEndpoint.match(/^http:\/\/.*/) ) {
    var protocol = require('http');
    var port = 80;
}
else if( kickassEndpoint.match(/^https:\/\/.*/) ) {
    var protocol = require('https');
    var port = 443;
}

exports.scrape = function(category, query, field, page, callback){
  if( field === null ) {
      field = 'seeders';
  }
  if( !page ){
      page = 1;
  }
  var gunzip = require('zlib').createGunzip();
  var req = protocol.request({
    host: baseUrl,
    port: port,
    path: '/usearch/'+encodeURIComponent(query)+'%20category:'+category+'/'+page+'/?field='+field+'&sorder=desc',
    method: 'GET',
    headers: { 'user-agent': 'Mozilla/5.0', 'accept-encoding': 'gzip' }
  });
  req.on('response', function(response){
      console.log(response);
    var data = '';
    response.pipe(gunzip);
    gunzip.on('data', function(chunk){
      data += chunk;
    });
    gunzip.on('end', function(){
      var torrents = [];
        var count;
        $('h2', '#mainSearchTable', data).each(function(i, e){
            count = $(e)[0].children[1].children[0].data.split(" ").pop();
        });

      $('.even, .odd', data).each(function(i, e){
        var cell = $(e).children('td').first();
        if(cell.children('.iaconbox').children('.imagnet').attr('href')){
          var hash = cell.children('.iaconbox').children('.imagnet').attr('href').split(':')[3].split('&')[0],
            title = cell.children('.torrentname').children('.markeredBlock').children('a').text(),
            size = cell.next('td').text(),
            size_arr = size.split(' ');
          torrents.push({
            count: count,
            link: baseUrl+cell.children('.torrentname').children('.normalgrey').attr('href'),
            title: title,
            hash: hash.toString(),
            size: Math.ceil(size_arr[1] == 'GB' ? parseFloat(size_arr[0]) * 1024 * 1024 * 1024 : (size_arr[1] == 'MB' ? parseFloat(size_arr[0]) * 1024 * 1024 : parseFloat(size_arr[0]))),
            formated_size: size,
            seeder: parseInt(cell.next('td').next('td').next('td').next('td').text()),
            leecher: parseInt(cell.next('td').next('td').next('td').next('td').next('td').text()),
            date: cell.next('td').next('td').next('td').text()
          });
        }
      });
      callback(null, torrents);
    });
  });
  req.on('error', function(e){
    callback(new Error(e.message), null);
  });
  req.end();
}

exports.categories = ["0", "anime", "other-anime", "applications", "windows", "mac-software", "unix", "ios", "android", "handheld-applications", "other-applications", "books", "ebooks", "comics", "magazines", "textbooks", "fiction", "non-fiction", "audio-books", "academic", "other-books", "games", "pc-games", "mac-games", "ps2", "xbox360", "wii", "handheld-games", "nds", "psp", "ps3", "ios-games", "android-games", "other-games", "movies", "3d-movies", "music-videos", "movie-clips", "handheld-movies", "ipad-movies", "highres-movies", "bollywood", "concerts", "dubbed-movies", "asian", "documentary", "trailer", "other-movies", "music", "mp3", "aac", "lossless", "transcode", "other-music", "other", "pictures", "sound-clips", "covers", "wallpapers", "tutorials", "unsorted", "tv", "other-tv", "xxx", "xxx-video", "xxx-hd-video", "xxx-pictures", "xxx-magazines", "xxx-books", "hentai", "other-xxx"];