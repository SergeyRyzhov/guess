function init(router) {
	// var authenticator = require('../tools/authenticator');
	// var tokenModel = require(__common + '/models/token');
	// var telegramUserModel = require(__bot + '/models/telegramUser');
	// var _ = require('underscore');
	// var constants = require('../constants');


	router.get('/api/melody', function (req, res, next) {
		res.send([{
      score: 10,
      url: '/audio/Leningrad - Exponat.mp3',
      type: 'audio/mpeg'
    },
    {
      score: 20,
      url: '/audio/Leschenko - Black eyes.mp3',
      type: 'audio/mpeg'
    }])
	});

}
module.exports = { init: init };
