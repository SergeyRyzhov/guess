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

        var currentMelody = ko.observable();
        var team = ko.observable();
        var hasMelody = ko.observable();
        var hasAnswer = ko.observable();

        socket.on('play.melody', function(_currentMelody) {
            hasMelody(true);
            hasAnswer(false);
            team({});
            currentMelody(_currentMelody);
        });

        socket.on('answer', function(_team) {
            console.log(_team);
            if (team().answerTime != undefined) {
                if (Date(_team.answerTime) < Date(team().answerTime))
                    team(_team);
            } else
                team(_team);
            hasAnswer(true);
        });

        // socket.on('play.melody', function(_team) {
        //     hasMelody(false);
        //     hasAnswer(false);
        // });

        var groups = _.map(game.categories, function(category) {
            var melodies = ko.observableArray();

            require(['json!/api/melody/category/' + category.id], function(melodiesData) {
                melodies(melodiesData);
            });

            socket.on('players.update', function(playersData) {
                players(playersData);
                hasMelody(false);
                hasAnswer(false);
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
            hasMelody: hasMelody,
            hasAnswer: hasAnswer,
            groups: groups,
            melody: currentMelody,
            team: team,
            players: players
        };
    };
});