angular.module('gift-tapes')

.filter('spaceToBreaks', function() {
	return function(value) {
		return angular.isString(value) ? value.replace(/\s+/gi, '\n') : value;
	}
})

.controller('CustomizeCtrl', function($scope, $uibModal, $http, playlistId, userId) {

	$scope.choosePhoto = function() {
		var modal = $uibModal.open({
			templateUrl: 'templates/modals/choosePhoto.html',
			controller: 'ChoosePhotoCtrl',
			size: 'lg'
		});

		modal.result.then(function(imageUrl) {
			$scope.imageUrl = imageUrl;
		});
	};

	$scope.chooseAlbumTitle = function () {
		var modal = $uibModal.open({
			templateUrl: 'templates/modals/chooseTitle.html',
			controller: 'ChooseTitleCtrl',
			size: 'lg'
		});

		modal.result.then(function (title) {
			$scope.title = title;
		});
	};

	$scope.saveCustomization = function () {
		$http.post('/api/playlists/' + playlistId() + '/customization?userId=' + userId(), {
			image_url: $scope.imageUrl,
			album_title: $scope.title
		}).then(function (data) {
			alert('Saved!');
		});
	};
});
