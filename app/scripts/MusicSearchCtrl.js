angular.module('gift-tapes')

.filter('notInList', function() {
	return function(arr, otherArr) {
		if(!angular.isArray(arr)) return arr;
		if(!angular.isArray(otherArr)) return otherArr;

		return _.filter(arr, function(item) {
			return !_.some(otherArr, { id: item.id });
		});
	}
})

.controller('MusicSearchCtrl', function($scope, spotifyService, notInListFilter) {
	$scope.playlist = [];
	$scope.songs = [];

	$scope.search = function(query) {
		if(!query)
			$scope.songs = [];
		else {
			spotifyService.find(query)
				.then(function(results) {
					$scope.songs = results;
				});
		}
	};

	$scope.$watch('query', function(newVal, oldVal) {
		$scope.search(newVal);
	});

	$scope.add = function(song) {
		if(!_.some($scope.playlist, { id: song.id }))
			$scope.playlist.push(song);
	};

	$scope.remove = function(song) {
		var idx = _.findIndex($scope.playlist, { id: song.id });
		if(idx >= 0)
			$scope.playlist.splice(idx, 1);
	};
});
