console.log('\'Allo \'Allo!');

angular.module('gift-tapes', ['ngRoute', 'ngSanitize'])
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
	.factory('Shares', function($resource){
		return $resource('/api/shares/:id', {userId: '@userId'});
	})
	.factory('Playlist', function($resource){
		return $resource('/api/playlists/:id', {userId: '@userId'});
	})
	.controller('DoesItWorkCtrl', function($scope) {
		$scope.itWorks = true;
	});


