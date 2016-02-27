angular.module('gift-tapes')
    .controller('ShareCtrl', function($scope, playlist) {
        $scope.playlist = playlist;
    });