window.sc = function() {
    SC.initialize({
        client_id: '7e01342942e42d7d02020e8abb81cdd4',
        redirect_uri: 'http://localhost:9000/soundcloud-auth-cb.html'
    });

    var loggedIn = false;

    function login() {
        return SC.connect().then(function (data) {
            loggedIn = true;
            return data;
        });
    }

    /**
     * @name Song
     *
     * @type {{
     *      title: string,
     *      streamUrl: string,
     *      author: string
     * }}
     */

    /**
     *
     * @param songName string
     * @returns {Promise.<Song>}
     */
    function search(songName) {
        return SC.get('/tracks', {
            q: songName,
            streamable: true
        }).then(function (tracks) {
            var songs = [];
            tracks.forEach((track) => {
                songs.push({
                    title: track.title,
                    streamUrl: track.stream_url,
                    author: track.user.username
                });
            });
            return songs;
        });
    }

    function isLoggedIn() {
        return loggedIn;
    }

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        search: search
    }
}();