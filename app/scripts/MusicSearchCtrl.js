angular.module('gift-tapes')

.controller('MusicSearchCtrl', function($scope, soundCloudService) {
	$scope.songs = [];
	$scope.search = function(query) {
		soundCloudService.find(query)
			.then(function(results) {
				$scope.songs = results;
			});
	};
});
