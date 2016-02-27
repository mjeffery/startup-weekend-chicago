angular.module('gift-tapes')

.controller('MusicSearchCtrl', function($scope, soundCloudSearchService) {
	$scope.songs = [];
	$scope.search = function(query) {
		soundCloudSearchService.find(query)
			.then(function(results) {
				$scope.songs = results;
			});
	};
});
