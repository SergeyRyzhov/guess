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

    return function(params) {
        var players = params.players;
        var currentMelody = ko.observable();
        var team = ko.observable();
        var hasMelody = ko.observable();
        var hasAnswer = ko.observable();
        var advanced = ko.observable(false);


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

        function player(id) {
            return _.findWhere(players, { _id: id });
        }

        function right(teamid, bonus) {
            bonus = bonus || 0;
            var score = currentMelody().score + bonus;

            player(teamid).score += score;
            socket.emit('players.update', players);
            socket.emit('disable.melody', currentMelody());


            hasMelody(false);
            hasAnswer(false);
        }


        function continuePlay() {
            socket.emit('play.melody', currentMelody());
            hasMelody(false);
            hasAnswer(false);
        }

        var groups = _.map(game.categories, function(category) {
            var melodies = ko.observableArray();

            require(['json!/api/melody/category/' + category.id], function(melodiesData) {
                melodies(melodiesData);
            });

            return {
                title: category.title,
                melodies: melodies
            }
        });

        function add(teamid, score) {
            player(teamid).score += score;
            socket.emit('players.update', players);
        }

        function playCurrent() {

            socket.emit('play.melody', currentMelody());
        }

        function pauseAll() {

            socket.emit('pause.all.melody');
        }

        function stopAll() {

            socket.emit('stop.all.melody');
        }

        return {
            hasMelody: hasMelody,
            hasAnswer: hasAnswer,
            groups: groups,
            melody: currentMelody,
            team: team,
            right: right,
            continuePlay: continuePlay,
            rightFirstText: ko.computed(function() {
                var audio = currentMelody() || {};
                return player(1).title + ' +' + audio.score;
            }),
            rightSecondText: ko.computed(function() {
                var audio = currentMelody() || {};
                return player(2).title + ' +' + audio.score;
            }),
            firstText: ko.computed(function() {
                return player(1).title;
            }),
            secondText: ko.computed(function() {
                return player(2).title;
            }),
            add: add,
            playCurrent: playCurrent,
            pauseAll: pauseAll,
            stopAll: stopAll,
            advanced:advanced
        }
    };
});