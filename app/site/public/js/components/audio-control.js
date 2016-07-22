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

    //initialize();

    function play() {
      socket.emit('play.melody', melody);
    }

    function dispose(params) {

    }

    return {
      score: melody.score,
      name: melody.name,
      play: play,
      dispose: dispose
    };
  };
});