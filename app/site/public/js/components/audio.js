define([
  'knockout',
  'underscore',
  'storage',
  'constants',
  'localization',
  'amplify'
], function (ko, _, storage, constants, localization, amplify) {
  'use strict';

  return function (params) {
    var element = ko.observable();
    function play(params) {
      element().play();
    }
    return {
      mediaUrl: "/audio/leningrad%20-%20exponat.mp3",
      mediaType: "audio/mpeg",
      play: play,
      element: element
    };
  };
});