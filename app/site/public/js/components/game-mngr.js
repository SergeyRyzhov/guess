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

		function otherTeam() {

		}

		function right(bonus) {
			bonus = bonus || 0;
			var score = currentMelody().score + bonus;
			//amplify.publish()

			//socket.emit('pause', 'groupid');
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
			groups: groups,
			melody: currentMelody
		}
	};
});