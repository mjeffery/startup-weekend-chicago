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
                resp.data.tracks.items.forEach(function (track) {
                    songs.push({
                        title: track.name,
                        artist: track.artists[0].name,
                        id: track.uri,
                        streamUrl: track.preview_url,
                        trustedUrl: getTrustedUrl(track.uri)
                    });
                });
                return songs;
            });
        }

        function getTrustedUrl(uri) {
            return $sce.trustAsUrl('https://embed.spotify.com/?uri=' + uri);
        }

        function player(songId) {
            return $http.get('https://api.spotify.com/v1/tracks/' + songId)
                .then((resp) => {
                    return new Audio(resp.data.preview_url);
                })
        }

        return {
            find: find,
            player: player
        };
    });
