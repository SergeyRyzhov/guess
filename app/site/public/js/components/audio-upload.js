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
    function testPause() {
      amplify.publish('pause.all.request');
    }
    return { testPause: testPause };
  };
});