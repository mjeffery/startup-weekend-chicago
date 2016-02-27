angular.module('gift-tapes')

.controller('MusicSearchCtrl', function($scope, soundCloudSearchService) {
	$scope.playlist = [];
	$scope.songs = [];

	$scope.search = function(query) {
		soundCloudSearchService.find(query)
			.then(function(results) {
				$scope.songs = _.filter(results, function(song) {
					return !_.some($scope.playlist, { id: song.id });	
				});
			});
	};

	$scope.add = function(song) {
		$scope.playlist.push(song);
	}
	
	$scope.remove = function(song) {
		var idx = _.findIndex($scope.playlist, { id: song.id });
		if(idx > 0) 
			$scope.playlist.splice(idx, 1);
	}
});
