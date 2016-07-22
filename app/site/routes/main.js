function init(router) {
	var constants = require('../constants/index');
	var settings = require('../tools/settings');
	var logger = require(__common + '/tools/logger')('main controller');

	router.get('/:culture', function (req, res, next) {
		if (constants.labels.hasCulture(req.params.culture))
			res.render('index', settings.extended(req, { user: req.user }));
		else
			res.redirect('/' + constants.settings.common.defaultCulture);
	});

	router.get('/', function (req, res, next) {
		if (req.cookies.culture)
			res.redirect('/' + req.cookies.culture);
		else
			res.redirect('/' + constants.settings.common.defaultCulture);
	});

	router.get('/:culture/components/:name', function (req, res, next) {
		logger.debug('User for component', req.user);
		if (constants.labels.hasCulture(req.params.culture))
			res.render('components/' + req.params.name, settings.extended(req, { user: req.user }));
		else
			res.render('components/error', settings.default(req));
	});
}
module.exports = { init: init };
