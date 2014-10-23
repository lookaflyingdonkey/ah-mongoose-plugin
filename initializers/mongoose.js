var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

exports.mongoose = function(api, next) {
  
  api.mongoose = {
    mongoose: mongoose,
    connection: null,
    models: null,
    _start: function(api, next) {
      next();
    },
    _teardown: function(api, next) {
      next();
    },
    init: function(callback) {
      if(api.mongoose.models === null) {
        api.mongoose.models = {};
      }
      var dir = path.normalize(api.config.mongoose.model_path);
      fs.readdirSync(dir).forEach(function(file) {
        var nameParts = file.split("/");
        var name = nameParts[(nameParts.length - 1)].split(".")[0];
        if(name.indexOf('-') > -1) {
          name = name.split("-")[1];
        }
        api.mongoose.models[name] = require(api.config.mongoose.model_path + '/' + file);
      });
      callback();
    },
    connect: function(callback) {
      if(api.config.mongoose.debug) {
        api.mongoose.mongoose.set('debug', true);
      }
      if(api.mongoose.models === null) {
        api.mongoose.init();
      }
      api.mongoose.mongoose.connect(api.config.mongoose.connection_string);
      api.mongoose.connection = mongoose.connection;
      api.mongoose.connection.on('error', console.error.bind(console, 'mongoose error:'));
    },
    disconnect: function(callback) {
      api.mongoose.mongoose.disconnect(callback);
    }
  };
  next();
}