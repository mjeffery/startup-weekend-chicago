angular.module('gift-tapes')

.directive('playButton', function(spotifyService) {
	var player;
	return {
		scope: {
			id: '@',
		},
		templateUrl: 'templates/playButton.html',
		link: function(scope, elem, attrs) {
			scope.actionText = 'play';
			scope.playAudio = function () {
				if (scope.actionText === 'play') {
					scope.actionText = 'pause';
					spotifyService.player(scope.id).then(function (ret) {
						player = ret;
						player.play();
					});
				} else {
					scope.actionText = 'play';
					if (player) {
						player.pause();
					}
				}

			}
		}
	};
});
