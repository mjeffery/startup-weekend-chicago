console.log('\'Allo \'Allo!');

angular.module('gift-tapes', [])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider
				.when('/playlists', {
					templateUrl: 'templates/playlists.html',
					controller: 'PlaylistsCtrl',
					resolve: {
						playlists
					}
				})
				.otherwise({
					redirectTo: '/'
				});
	}])
	.factory('userId', function(){
		var userId = 1;

		function getUserId(){
			return userId;
		}

		function setUserId(id){
			userId = id;
		}

		return
	})
	.controller('DoesItWorkCtrl', function($scope) {
		$scope.itWorks = true;
	});


