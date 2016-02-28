angular.module('gift-tapes')
    .controller('PlaylistsCtrl', function($scope, Playlists, spotifyService) {
        $scope.playlist = [];
        $scope.album_title = "";
        $scope.albumImageUrl = "asdf";

        Playlists.get()
            .$promise
            .then(function(response){
                return response.playlist.map(
                    function(song){
                        console.log(song);
                        $scope.albumTitle = song.album_title;
                        $scope.albumImageUrl = song.album_image_url;
                        return song.spotify_id;
                    }
                )
            })
            .then(function(ids) {
                return spotifyService.getSongs(_.uniq(ids));
            })
            .then(function (songs) {
                console.log(songs);
                $scope.playlist = songs;
            });
    });
