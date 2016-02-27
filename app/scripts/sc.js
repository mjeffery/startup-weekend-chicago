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

    function search(songName) {
        return SC.get('/tracks', {
            q: songName
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