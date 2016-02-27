console.log('\'Allo \'Allo!');

angular.module('gift-tapes', ['ngRoute'])
	.factory('userId', function(){
		var userId = 1;

		function getUserId(){
			return userId;
		}

		function setUserId(id){
			userId = id;
		}

		return {getUserId: getUserId, setUserId: setUserId}
	})
	.factory('Shares', function($resource){
		return $resource('/api/shares/:id');
	})
	.factory('Playlist', {

	})
	.controller('DoesItWorkCtrl', function($scope) {
		$scope.itWorks = true;
	});


