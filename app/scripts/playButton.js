angular.module('gift-tapes')

.directive('playButton', function(soundCloudService) {
	var player;
	return {
		scope: {
			id: '@'
		},
		templateUrl: 'templates/playButton.html',
		link: function(scope, elem, attrs) {
			scope.actionText = 'Play';
			scope.playAudio = function () {
				if (scope.actionText === 'Play') {
					scope.actionText = 'Pause';
					soundCloudService.player(scope.id).then(function (ret) {
						player = ret;
						player.play();
					});
				} else {
					scope.actionText = 'Play';
					if (player) {
						player.pause();
					}
				}

			}
		}
	};
});
