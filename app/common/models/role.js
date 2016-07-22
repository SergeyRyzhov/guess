var mongodb = require('../tools/mongodb.js');

var Schema = mongodb.schema;
var mongo = mongodb.mongo;

var _ = require('underscore');

var schema = new Schema({
	name: { type: String, required: true },  
	level: { type: Number, required: true }	
});

schema.methods = {

};

schema.statics = {
	load: function (name, cb) {
		this.findOne({ name: name })
			.exec(cb);
	},

	list: function (options, cb) {
		this.find(options.criteria)
			.limit(options.perPage)
			.skip(options.perPage * options.page)
			.exec(cb);
	},

	create: function (name, level, callback) {
		var Model = this;
		this.findOne({ name: name }, function (err, result) {
			if (err || result) {
				callback(err, result, false)
			} else {
				result = new Model({
					name: name,
          level: level
				});
				result.save(function (err) {
					callback(err, result, true);
				});
			}
		});
	}
};

var model;

if (mongo.models.Role) {
	model = mongo.model('Role');
} else {
	model = mongo.model('Role', schema);
}

module.exports = model;
