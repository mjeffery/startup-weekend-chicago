angular.module('gift-tapes')

.controller('CustomizeCtrl', function($scope, $uibModal) {

	$scope.choosePhoto = function() {
		var modal = $uibModal.open({
			templateUrl: 'templates/modals/choosePhoto.html',
			controller: 'ChoosePhotoCtrl',
			size: 'lg'
		});

		modal.result.then(function(imageUrl) {

		});
	};

	$scope.chooseAlbumTitle = function () {
		var modal = $uibModal.open({
			templateUrl: 'templates/modals/chooseTitle.html',
			controller: 'ChooseTitleCtrl',
			size: 'lg'
		});

		modal.result.then(function (title) {

		});
	};

	$scope.doStep2 = function() {

	}

});
