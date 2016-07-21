define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'amplify',
	'socketio',
	'json!/api/game',
], function (ko, _, storage, constants, localization, amplify, socketio, game) {
	'use strict';

	var socket = socketio();

	// amplify.subscribe('pause.all.request', function () {
	// 	socket.emit('pause', 'groupid');
	// });

	// socket.on('pause', function (groupid) {
	// 	amplify.publish('pause.all.processed');
	// });

	return function (params) {
		var currentMelody = ko.observable();
		var team = ko.observable();
		var hasMelody = ko.observable();
		var hasAnswer = ko.observable();

		socket.on('play.melody', function (_currentMelody) {
			hasMelody(true);
			hasAnswer(false);
			team({});
			currentMelody(_currentMelody);
		});


		socket.on('answer', function (_team) {
			hasAnswer(true);
			console.log(_team);
			if (team().answerTime != undefined)				
			{
				if (Date(_team.answerTime) < Date(team().answerTime))
					team(_team);
			}
			else
					team(_team);
			/*hasMelody(true);
			currentMelody(_currentMelody);*/
		});

		function otherTeam() {

		}

		function right(bonus) {
			bonus = bonus || 0;
			var score = currentMelody().score + bonus;
			//amplify.publish()

			//socket.emit('pause', 'groupid');
			hasMelody(false);
			hasAnswer(false);
		}

		var groups = _.map(game.categories, function (category) {
			var melodies = ko.observableArray();

			require(['json!/api/melody/category/' + category.id], function (melodiesData) {
				melodies(melodiesData);
			});

			return {
				title: category.title,
				melodies: melodies
			}
		});

		return {
			hasMelody: hasMelody,
			hasAnswer: hasAnswer,
			groups: groups,
			melody: currentMelody,
			team: team
		}
	};
});