define([
  'knockout',
  'underscore',
  'storage',
  'constants',
  'localization',
  'amplify'
], function (ko, _, storage, constants, localization, amplify) {
  'use strict';

	var socket = socketio();
  return function (params) {
    function testPause() {
      // amplify.publish('pause.all.request');
      var player = _.findWherer(params.players, { _id: params.team });
      socket.emit('answer', player);
    }
    return { testPause: testPause };
  };
});