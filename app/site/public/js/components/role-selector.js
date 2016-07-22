define([
    'knockout',
    'underscore',
    'storage',
    'constants',
    'localization',
    'amplify',
    'json!/api/game',
], function(ko, _, storage, constants, localization, amplify, game) {
    'use strict';

    return function(params) {
        var nextComponent = 'game-player';

        var password = ko.observable('');

        var passSubscription = password.subscribe(join);

        function join(value) {
            if (!value || value.length < 4)
                return;

            value == '2705' && params.view('game-mngr');
            value == '0507' && params.view('game-view');
            value == '2907' && params.view('game-player') || params.team(1);
            value == '0512' && params.view('game-player') || params.team(2);
        }

        function dispose(params) {
            passSubscription.dispose();
        }

        return {
            password: password,
            // join: join,
            // team1Text: params.players[0].title,
            // team2Text: params.players[1].title,
            // managerText: 'Ведущий',
            // viewText: 'Наблюдатель',
            dispose: dispose
        };
    };
});