angular.module('gift-tapes')

.controller('DrawingCtrl', function($scope) {

})

.directive('gtDrawing', function() {
	return {
		templateUrl: 'templates/drawing.html',
		controller: 'DrawingCtrl',
		scope: {
			width: '@',
			height: '@'
		},
		link: function(scope, elem, attrs) {
			
		}
	}
});
