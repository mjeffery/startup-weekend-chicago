angular.module('gift-tapes')

.service('soundCloudSearchService', function($q) {
	function find(query) {
		var retVal = SC.get('/tracks', {
			q: query,
			streamable: true
		}).then(function (tracks) {
			var songs = [];
			tracks.forEach((track) => {
				songs.push({
					title: track.title,
					id: track.id,
					streamUrl: track.stream_url,
					artist: track.user.username
				});
			});
			return songs;
		});

		return $q.when(retVal);
	}

	return {
		find: find
	};
});
