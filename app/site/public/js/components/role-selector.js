define([
  'knockout',
  'underscore',
  'storage',
  'constants',
  'localization',
  'amplify',
  'json!/api/game',
], function (ko, _, storage, constants, localization, amplify, game) {
  'use strict';

  return function (params) {
    var nextComponent = 'game-player';
    function join(role) {
      if (role == 'manager') {
        nextComponent = 'game-mngr';
      }
      if (role == 'view') {
        nextComponent = 'game-view';
      }

      params.view(nextComponent)
    }

    return {
      join: join,
      team1Text: params.players[0].title,
      team2Text: params.players[1].title,
      managerText: 'Ведущий',
      viewText: 'Наблюдатель',
    };
  };
});