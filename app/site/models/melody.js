var mongodb = require('../tools/mongodb.js');

var Schema = mongodb.schema;
var mongo = mongodb.mongo;

var schema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true }
});

schema.methods = {};

schema.statics = {
  load: function (name, cb) {
    this.find({ name: name })
      .exec(cb);
  },

  list: function (options, cb) {
    this.find(options.criteria)
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  },

  create: function (name, path, callback) {
    var Model = this;
    this.load(name, function (err, melody) {
      if (err || !melody) {
        callback(err, null, false);
      }

      var result = new Model({ name: name, path: path });
      result.save(function (err) {
        callback(err, result, true);
      });
    });
  }
};

var model;

if (mongo.models.Melody) {
  model = mongo.model('Melody');
} else {
  model = mongo.model('Melody', schema);
}

module.exports = model;
