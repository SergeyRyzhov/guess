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
	return function (params) {
		var view = ko.observable('role-selector');
		var players=game.players;
		return {
			view: view,
			players:players
		}
	};
});