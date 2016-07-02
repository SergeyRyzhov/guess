define([
	'knockout',
	'underscore',
	'storage',
	'constants',
	'localization',
	'amplify',
	'socketio'
], function (ko, _, storage, constants, localization, amplify, socketio) {
	'use strict';

	var socket = socketio();

	amplify.subscribe('pause.all.request', function(){		
    socket.emit('pause', 'groupid');
	});

	socket.on('pause', function(groupid){
    amplify.publish('pause.all.processed');
  });
	
	return function (params) {
		return {
		}
	};
});