define([
  'knockout',
  'underscore',
  'storage',
  'constants',
  'localization',
  'amplify',
  'json!/api/melody'
], function (ko, _, storage, constants, localization, amplify, melodies) {
  'use strict';

  return function (params) {
    var melody = params || {};
    var element = ko.observable();

    function play() {
      element().play();
    }

    return {
      groups: [
        {
          title: 'Категория 1',
          melodies: melodies
        },        
        {
          title: 'Категория 2',
          melodies: melodies
        }
      ]
    };
  };
});