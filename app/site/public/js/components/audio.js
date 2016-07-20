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
  // amplify.subscribe('pause.all.request', function () {
  //   socket.emit('pause', 'groupid');
  // });

  // socket.on('pause', function (groupid) {
  //   amplify.publish('pause.all.processed');
  // });

  return function (params) {
    var melody = params || {};
    var element = ko.observable();

    initialize();

    function play() {
      element().play();
      socket.emit('current.melody', melody);
    }

    function pause() {
      element().pause();
    }


    function playCondition(id) {
      if (id == melody._id) {
        play();
      }
    }

    function initialize() {
      amplify.subscribe('pause.all.processed', pause);
      amplify.subscribe('play.melody', playCondition);
    }

    function dispose() {
      amplify.unsubscribe('pause.all.processed', pause);
      amplify.unsubscribe('play.melody', playCondition);
    }

    return {
      mediaUrl: melody.url,
      mediaType: melody.type,
      score: melody.score,
      play: play,
      element: element,
      dispose: dispose
    };
  };
});