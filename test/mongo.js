process.env.NODE_ENV = 'test';
process.env.PROJECT_ROOT = process.cwd() + "/../..";

var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

describe('ah-mongoose-plugin: Setup', function() {

  before(function(done) {
    this.timeout(5000);
    actionhero.start(function(err, a) {
      api = a;
      api.mongoose.connect();
      api.mongoose.connection.once('open', function callback () {
        done();
      });
    })
  });

  after(function(done) {
    actionhero.stop(function(err) {
      api.mongoose.disconnect(done);
    });
  });
  
  describe('ah-mongoose-plugin: Mongoose Object', function() {
    
    it('should exist', function() {
      should.exist(api.mongoose);
      api.mongoose.should.be.an('object');
    });
    
    it('should have a models object on it', function() {
      should.exist(api.mongoose.models);
      api.mongoose.models.should.be.an('object');
    });
    
    it('should be connected to the database', function() {
      api.mongoose.connection.readyState.should.equal(1);
    });
    
  });

});