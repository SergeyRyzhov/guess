define([
  'knockout',
  'underscore',
  'storage',
  'constants',
  'localization',
  'amplify',
  'socketio'
], function (ko, _, storage, constants, localization, amplify, socketio) {
  'use strict';

  var socket = socketio();

  return function (params) {
    var melody = params || {};
    var element = ko.observable();

    initialize();

    function pauseCondition(_melody) {
      // if (_melody._id == melody._id) {
      element().pause();
      // }
    }


    function playCondition(_melody) {
      if (_melody._id == melody._id) {
        element().play();
      }
    }

    function initialize() {
      socket.on('play.melody', playCondition);
      socket.on('pause.melody', pauseCondition);
    }

    function dispose() {
    }

    return {
      mediaUrl: melody.url,
      mediaType: melody.type,
      score: melody.score,
      element: element,
      dispose: dispose
    };
  };
});