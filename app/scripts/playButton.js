angular.module('gift-tapes')

.directive('playButton', function() {
	return {
		scope: {
			url: '@'
		},
		templateUrl: 'templates/playButton.html',
		link: function(scope, elem, attrs) {

		}
	};
});
