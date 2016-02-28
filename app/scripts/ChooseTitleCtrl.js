angular.module('gift-tapes')

.controller('ChooseTitleCtrl', function($scope) {
    $scope.title = '';

    $scope.save = function () {
        $scope.$close($scope.title);
    }
});
