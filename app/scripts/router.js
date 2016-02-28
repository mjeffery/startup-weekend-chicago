angular.module('gift-tapes')
    .config(function ($locationProvider){
        $locationProvider.html5Mode(false).hashPrefix('!');
    })
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/shares/:id', {
                    templateUrl: 'templates/playlist.html',
                    controller: 'PlaylistsCtrl',
                    resolve: {
                        playlist: function($q, $routeParams, Shares){
                            return $q(function(resolve, reject) {
                                Shares.get($routeParams.id, resolve, reject)
                            })
                        }
                    }
                })
				.when('/upload', {
					templateUrl: 'templates/upload-picture.html',
					controller: 'UploadPhotoCtrl'
				})
                .otherwise({
                    redirectTo: '/'
                });
        }]);
