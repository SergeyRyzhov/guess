var mongodb = require('../tools/mongodb.js');

var Schema = mongodb.schema;
var mongo = mongodb.mongo;

var _ = require('underscore');

var Role = require('./role');

var schema = new Schema({
  role: { type: Schema.ObjectId, ref: 'Role', required: true },
  user: { type: Schema.ObjectId, ref: 'User', required: true }
});

schema.methods = {

};

schema.statics = {
  load: function (user, cb) {
    this.find({ user: user._id })
			.populate('user', 'email username phone')
			.populate('role', 'name level')
      .exec(cb);
  },

  list: function (options, cb) {
    this.find(options.criteria)
			.populate('user', 'email username phone')
			.populate('role', 'name level')
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  },

  create: function (user, roleName, callback) {
    var Model = this;
    Role.load(roleName, function (err, role) {
      if (err || !role) {
        callback(err, null, false);
      }

      Model.findOne({ user: user._id, role: role._id }, function (err, result) {
        if (err || result) {
          callback(err, result, false)
        } else {
          result = new Model({ user: user._id, role: role._id });

          result.save(function (err) {
            callback(err, result, true);
          });
        }
      });
    });
  }
};

var model;

if (mongo.models.Access) {
  model = mongo.model('Access');
} else {
  model = mongo.model('Access', schema);
}

module.exports = model;
