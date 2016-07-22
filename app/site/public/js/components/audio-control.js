define([
    'knockout',
    'underscore',
    'storage',
    'constants',
    'localization',
    'amplify',
    'socketio'
], function(ko, _, storage, constants, localization, amplify, socketio) {
    'use strict';

    var socket = socketio();

    return function(params) {
        var melody = params || {};
        var visible = ko.observable(!!melody._id);

        //initialize();

        function play() {
            socket.emit('play.melody', melody);
        }

        function dispose(params) {

        }

        function hideCondition(_melody) {
            if (_melody._id == melody._id) {
                visible(false);
            }
        }

        socket.on('disable.melody', hideCondition);
        return {
            score: melody.score,
            name: melody.name,
            play: play,
            dispose: dispose,
            visible: visible
        };
    };
});