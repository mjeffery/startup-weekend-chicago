angular.module('gift-tapes', ['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/shares/:id', {
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