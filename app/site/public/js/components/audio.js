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
    var melody = params || {};
    var element = ko.observable();

    initialize();

    function play() {
      element().play();
    }

    function pause(){
      element().pause();
    }

    function initialize(){
      amplify.subscribe('pause.all.processed', pause);
    }

    function dispose(){
      amplify.unsubscribe('pause.all.processed', pause);
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