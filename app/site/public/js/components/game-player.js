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
    var allowAnswer = ko.observable(false);

    socket.on('answer.alow', allowAnswer);
    function answer() {
      // amplify.publish('pause.all.request');
      var player = _.findWhere(params.players, { _id: params.team });
      socket.emit('answer', player);
    }
    return { answer: answer, allowAnswer: allowAnswer };
  };
});