angular.module('gift-tapes')
    .config(function ($locationProvider){
        $locationProvider.html5Mode(false).hashPrefix('!');
    })
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
				.when('/', {
					templateUrl: 'templates/musicSearch.html',
					controller: 'MusicSearchCtrl'
				})
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
				.when('/customize', {
					templateUrl: 'templates/customize.html',
					controller: 'CustomizeCtrl'
				})
                .when('/playlists/:id', {
                    templateUrl: 'templates/playlist.html',
                    controller: 'PlaylistsCtrl',
                    resolve: {
                        playlist: function(){
                            return {songs: [1,2,3]};
                        }
                    }
                })
                .when('/playlists', {
                    templateUrl: 'templates/playlists.html',
                    controller: 'PlaylistsCtrl'
                })
                .when('/account', {
                    templateUrl: 'templates/account.html',
                    controller: 'PlaylistsCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);
