function init(router) {
  // var authenticator = require('../tools/authenticator');
  // var tokenModel = require(__common + '/models/token');
  // var telegramUserModel = require(__bot + '/models/telegramUser');
  // var _ = require('underscore');
  // var constants = require('../constants');


  router.get('/api/melody/category/:id', function (req, res, next) {
    //console.log(req.params);
    switch (Number(req.params.id)) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5: {
        res.send([{
          score: 10,
          url: '/audio/Leningrad - Exponat.mp3',
          type: 'audio/mpeg'
        },
          {
            score: 20,
            url: '/audio/Leschenko - Black eyes.mp3',
            type: 'audio/mpeg'
          }]);
        return;
      }
    }
  });
}
module.exports = { init: init };
