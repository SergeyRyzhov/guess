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
    var melody = params || {};
    var element = ko.observable();

    function play() {
      element().play();
    }
    var groups = _.map(game.categories, function (category) {
      var melodies = ko.observableArray();

      require(['json!/api/melody/category/' + category.id], function (melodiesData) {
        melodies(melodiesData);
      });

      return {
        title: category.title,
        melodies: melodies
      }
    });

    return {
      groups: groups
    };
  };
});