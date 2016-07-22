function init(router) {
    // var authenticator = require('../tools/authenticator');
    // var tokenModel = require(__common + '/models/token');
    // var telegramUserModel = require(__bot + '/models/telegramUser');
    // var _ = require('underscore');
    // var constants = require('../constants');


    router.get('/api/game', function(req, res, next) {
        res.send({
            categories: [{
                id: 1,
                title: 'В платье белом'
            }, {
                id: 2,
                title: 'Безгранник'
            }, {
                id: 3,
                title: 'В мире животных'
            }, {
                id: 4,
                title: 'Яблочная'
            }, {
                id: 5,
                title: '4 стихии'
            }, {
                id: 6,
                title: 'Красной краской красят крышу'
            }, {
                id: 7,
                title: 'Апож'
            }],
            players: [{
                _id: 1,
                title: 'Лютики',
                score: 0
            }, {
                _id: 2,
                title: 'Васильки',
                score: 0
            }]
        });
    });
}

module.exports = { init: init };