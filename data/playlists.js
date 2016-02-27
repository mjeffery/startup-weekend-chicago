var uuid = require('tiny-uuid4');
var Errors = require('./errors');
var Promise = require("bluebird");

var Playlists = function(){
    var data = {};

    function addPlaylist(userId){
        var id = uuid();

        if(!data.hasOwnProperty(userId)){
            data[userId] = {};
        }

        data[userId][id] = {songs: []};

        return id;
    }

    function getPlaylists(userId){
        var results = [];

        pg.connect(connectionString, function(err, client, done) {
            if(err) {
                done();
                console.log(err);
                return { success: false, data: err};
            }

            var query = client.query("SELECT * FROM playlist WHERE user_id=($1)", [userId]);

            query.on('row', function(row) {
                results.push(row);
            });

            query.on('end', function() {
                done();
                return results;
            });

        });
    }

    function getPlaylist(userId, playlistId){
        doesUserExist(userId);
        doesPlayListExist(userId, playlistId);

        return data[userId][playlistId];
    }

    function addSong(userId, playlistId, url){
        doesUserExist(userId);
        doesPlayListExist(userId, playlistId);

        data[userId][playlistId]['songs'].push(url);

        return data[userId][playlistId];
    }

    function doesUserExist(userId) {
        if(!data.hasOwnProperty(userId)) {
            throw Errors.UserNotFound
        }
    }

    function doesPlayListExist(userId, playlistId){
        if(!data[userId].hasOwnProperty(playlistId)) {
            throw Errors.PlaylistNotFound;
        }
    }

    return {
        addPlaylist: Promise.promisify(addPlaylist),
        getPlaylists: Promise.promisify(getPlaylists),
        getPlaylist: Promise.promisify(getPlaylist),
        addSong: Promise.promisify(addSong)

    };
};

module.exports = Playlists;