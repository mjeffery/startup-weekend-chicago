console.log('\'Allo \'Allo!');

angular.module('gift-tapes', ['ui.bootstrap', 'ngRoute', 'ngResource', 'ngSanitize', 'ngAnimate'])
	.factory('userId', function(){
		var userId = 1;

		return function(id){
			if(id){
				userId = id;
			} else return userId;
		};
	}).config(function ($sceProvider) {
		$sceProvider.enabled(false);
	})
	.factory('playlistId', function(){
		var playlistId = 1;

		return function(id){
			if(id){
				playlistId = id;
			} else return playlistId;
		};
	})
	.factory('Shares', function($resource, userId){
		return $resource('/api/shares/:id', {userId: userId()});
	})
	.factory('Playlists', function($resource, userId, playlistId){
		return $resource('/api/playlists/:id', {userId: userId(), id: playlistId(), 'spotifyId': '@spotifyId'});
	});
