# ah-mongoose-plugin

Uses mongoose to allow easy connection to MongoDB through mongoose and organises/exposes Mongoose models.

## Installation
- Install the plugin with npm-install ah-mongoose-plugin --save
- Add the plugin to your ActionHero config

As part of the setup a "models" folder will be created in your project root and a mongoose.js config file will be added to your config folder.

## Example Model User.js

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var Types = mongoose.Types;

    var userSchema = mongoose.Schema({
      createdAt: {
        type: Date,
        default: Date.now,
        required: true
      },
      updatedAt: {
        type: Date,
        required: false
      },
      email: {
        type: String,
        required: true
      },
      first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    });

    userSchema.virtual('full_name').get(function () {
      return this.first_name + ' ' + this.last_name;
    });

    // Create the mongoose model
    var _model = mongoose.model('User', userSchema);
    var _findByEmail = function(email, success, fail) {
      _model.findOne({email:email}, function(e, result) {
        if(e) {
          fail(e);
        } else {
         success(result);
       }
     });
    }

    module.exports = {    
      schema : userSchema,
      model : _model,
      findByEmail : _findByEmail
    }