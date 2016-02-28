angular.module('gift-tapes')

    .service('spotifyService', function ($http, $sce) {
        SC.initialize({
            client_id: '7e01342942e42d7d02020e8abb81cdd4',
            redirect_uri: 'http://localhost:9000/soundcloud-auth-cb.html'
        });


        function find(query) {
            return $http.get('https://api.spotify.com/v1/search', {
                params: {
                    q: query,
                    type: 'track'
                }
            }).then((resp) => {
                console.log(resp);
                var songs = [];
                resp.data.tracks.items.forEach(function (track, i) {
                    if (i <= 10) {
                        songs.push(mapToSong(track));
                    }
                });
                return songs;
            });
        }

        function mapToSong(track) {
            return {
                title: track.name,
                artist: track.artists[0].name,
                id: track.id,
                streamUrl: track.preview_url
            }
        }

        function getSong(songId) {
            return $http.get('https://api.spotify.com/v1/tracks/' + songId).then((resp) => mapToSong(resp.data))
        }

        function player(songId) {
            return $http.get('https://api.spotify.com/v1/tracks/' + songId)
                .then((resp) => {
                    return new Audio(resp.data.preview_url);
                })
        }

        return {
            find: find,
            getSong: getSong,
            player: player
        };
    });
