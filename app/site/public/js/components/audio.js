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
        var element = ko.observable();
        var visible = ko.observable(!!melody._id);

        initialize();

        function pauseCondition(_melody) {
            // if (_melody._id == melody._id) {
            element().pause();
            // }
        }


        function stopCondition(_melody) {
            // if (_melody._id == melody._id) {
            sound.pause();
            sound.currentTime = 0;
            // }
        }


        function playCondition(_melody) {
            if (_melody._id == melody._id) {
                element().play();
            }
        }


        function hideCondition(_melody) {
            if (_melody._id == melody._id) {
                visible(false);
            }
        }

        function initialize() {
            socket.on('disable.melody', hideCondition);
            socket.on('play.melody', playCondition);
            socket.on('pause.melody', pauseCondition);
            socket.on('stop.melody', stopCondition);
        }

        function dispose() {}

        return {
            visible: visible,
            melody: melody,
            element: element,
            dispose: dispose
        };
    };
});