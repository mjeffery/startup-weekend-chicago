angular.module('gift-tapes')
    .controller('ShareCtrl', ['$scope', 'playlist', function($scope, playlist) {
        $scope.playlist = playlist;
    }]);