define([
    'knockout',
    'underscore',
    'storage',
    'constants',
    'localization',
    'amplify',
    'socketio',
    'json!/api/game',
], function(ko, _, storage, constants, localization, amplify, socketio, game) {
    'use strict';

    var socket = socketio();
    // socket.on('pause.all', function (groupid) {
    // 	amplify.publish('pause.all.processed');
    // });

    return function(params) {
        var players = ko.observable(params.players);
        var groups = _.map(game.categories, function(category) {
            var melodies = ko.observableArray();

            require(['json!/api/melody/category/' + category.id], function(melodiesData) {
                melodies(melodiesData);
            });

            socket.on('players.update', function(playersData) {
                players(playersData);
            });

            return {
                title: category.title,
                melodies: melodies
            }
        });

        function player(id) {
            return _.findWhere(players, { _id: id });
        }
        return {
            groups: groups,
            players: players
        };
    };
});