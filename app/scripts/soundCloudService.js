angular.module('gift-tapes')

.service('soundCloudService', function($q) {
	SC.initialize({
		client_id: '7e01342942e42d7d02020e8abb81cdd4',
		redirect_uri: 'http://localhost:9000/soundcloud-auth-cb.html'
	});

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

	function player(songId) {
		var retVal = SC.stream('/tracks/' + songId);
		return $q.when(retVal);
	}

	return {
		find: find,
		player: player
	};
});
