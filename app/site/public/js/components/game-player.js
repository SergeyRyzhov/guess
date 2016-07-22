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
        var players = ko.observable(params.players);
        var profile = ko.pureComputed(function() {
            return _.findWhere(players(), { _id: params.team() });
        });
        var allowAnswer = ko.observable(false);
        var allowAnswer = ko.observable(false);

        socket.on('answer.alow', allowAnswer);

        socket.on('players.update', function(playersData) {
            players(playersData);
        });

        function answer() {
            // amplify.publish('pause.all.request');
            var player = _.findWhere(params.players, { _id: params.team() });
            socket.emit('answer', player);
        }
        return { answer: answer, allowAnswer: allowAnswer, profile: profile };
    };
});