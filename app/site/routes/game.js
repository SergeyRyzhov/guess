function init(router) {
  // var authenticator = require('../tools/authenticator');
  // var tokenModel = require(__common + '/models/token');
  // var telegramUserModel = require(__bot + '/models/telegramUser');
  // var _ = require('underscore');
  // var constants = require('../constants');


  router.get('/api/game', function (req, res, next) {
    res.send({
      categories: [
        {
          id: 1,
          title: 'Современные'
        },
        {
          id: 2,
          title: 'Золотые'
        },
        {
          id: 3,
          title: 'Из фильмов'
        },
        {
          id: 4,
          title: 'АПОЖ'
        },
        {
          id: 5,
          title: 'Рок'
        },
      ],
      players: [
        {
          id: 1,
          title: 'Лютики'
        },
        {
          id: 2,
          title: 'Васильки'
        }
      ]
    });
  });
}

module.exports = { init: init };
