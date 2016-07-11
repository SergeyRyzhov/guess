function init(router) {
	var authenticator = require('../tools/authenticator');
	var userModel = require(__common + '/models/user');
	var accessModel = require(__common + '/models/access');
	var logger = require(__common + '/tools/logger')('auth');
	var _ = require('underscore');

	router.post('/auth/password', function (req, res, next) {
		userModel.findOne({
			_id: req.user._id
		}, function (err, user) {

			var success = false;
			var message = '';

			if (!err) {

				if (req.body.newPassword == req.body.newPassword2) {

					if (user.authenticate(req.body.oldPassword)) {
						user.password = req.body.newPassword;
						user.save(function () {
						});
						success = true;
					}
				}
			}
			else {
				message = err;
			}

			if (success)
				res.redirect('/');
			else
				res.send({
					message: message,
					success: success
				});
		});
	});

	function authorizeNew(user, role, req, res) {
		accessModel.create(user, role || 'GameMaster', function (err, access, c) {
			if (err) {
				logger.error('Failed to create access rights', err);
			}

			var publicModel = {
				_id: user._id,
				username: user.username,
				email: user.email,
				phone: user.phone,
				accessLevel: access.role.level,
				isAuthenticated: true
			};

			authenticator.sign(res, publicModel);

			res.redirect('/');
		});
	}

	function authorizeExists(user, role, req, res) {
		accessModel.load(user, function (err, accesses, c) {
			if (err) {
				logger.error('Failed to load accress rights', err);
			}

			logger.debug('Access', accesses);

			var publicModel = {
				_id: user._id,
				username: user.username,
				email: user.email,
				phone: user.phone,
				accessLevel: _.chain(accesses).map(function (access) { return access.role.level; }).max().value(),
				isAuthenticated: true
			};

			logger.debug('User', publicModel);
			authenticator.sign(res, publicModel);

			res.redirect('/');
		});
	}

	router.post('/auth/signin', function (req, res, next) {
		userModel.findOne({
			$or: [
				{ username: req.body.login },
				{ email: req.body.login },
				{ phone: req.body.login }
			]
		}, function (err, user) {
			if (err) {
				logger.error('Failed signin', err);
			}

			if (!err && user) {
				if (user.authenticate(req.body.password)) {
					authorizeExists(user, null, req, res);
					return;
				}
			}
			res.redirect('/');
		});
	});

	router.post('/auth/signup', function (req, res, next) {
		userModel.create({
			username: req.body.username,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password,
		}, function (err, user) {
			if (err) {
				logger.error('Failed signup', err);
			} else {
				authorizeNew(user, null, req, res);
				return;
			}


			res.redirect('/');
		});
	});

	router.post('/auth/logout', function (req, res, next) {
		authenticator.logout(res);
		res.redirect('/');
	});
}

module.exports = { init: init };
