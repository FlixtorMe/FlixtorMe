var used_providers = ['kickasstorrents'];

function format_size(size){
  size = parseInt(size);
  return size > 1073741824 ? (size/1073741824).toFixed(2)+' GB' : (size/1048576).toFixed(2)+' MB';
}

exports.getProviders = function(callback){
  callback(used_providers);
}

exports.getTorrents = function(query, categories, providers, sortBy, page, callback){
  providers = providers || used_providers;
  providers.forEach(function(provider){
      var provider_mod = require('./'+provider);
      provider_mod.scrape(categories && categories[provider] || '0', query, sortBy, page, function(err, torrents){
          callback(err, torrents);
      });
  });
}