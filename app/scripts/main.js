console.log('\'Allo \'Allo!');

angular.module('gift-tapes', ['ngRoute'])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider
				.when('/share/:id', {
					templateUrl: 'templates/playlists.html',
					controller: 'PlaylistsCtrl',
					resolve: {
						playlist: function($q, $routeParams, Shares){
							return $q(function(resolve, reject) {
								Shares.get($routeParams.id, resolve, reject)
							})
						}
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

		return {getUserId, setUserId}
	})
	.factory('Shares', function($resource){
		return $resource('/api/shares/:id');
	})
	.controller('DoesItWorkCtrl', function($scope) {
		$scope.itWorks = true;
	});


