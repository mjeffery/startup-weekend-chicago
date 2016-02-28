var uuid = require('tiny-uuid4');
var Errors = require('./errors');
var Promise = require("bluebird");
var pg = require('pg');
var connectionString = process.env.DATABASE_URL + "?ssl=true";

var Playlists = function(){
    var data = {1:{1:{songs: []}}};
    var shares = {};

    function addPlaylist(userId){
        return runQuery('INSERT INTO playlist (user_id) VALUES ($1) RETURNING id', [userId]);
    }

    function getPlaylists(userId){
        return runQuery('SELECT * FROM playlist WHERE user_id = $1', [userId]);
    }

    function getPlaylist(userId, playlistId){
        return Promise.all([
            doesPlayListExist(userId, playlistId),
            runQuery('SELECT * FROM song WHERE playlist_id = $1', [playlistId])
        ]).then(function(result){
            return result[1];
        }).catch(function(err){
            console.log (err);
            throw(err);
        });
    }

    function addSong(userId, playlistId, spotifyId){
        return Promise.all([
            doesPlayListExist(userId, playlistId),
            runQuery('INSERT INTO song (playlist_id, spotify_id) VALUES ($1, $2) RETURNING id', [playlistId, spotifyId])
            ]).then(function(result){
                return result[1];
            }).catch(function(err){
                console.log (err);
                throw(err);
        });
    }

    function doesUserExist(userId) {
        return runQuery('SELECT * FROM user2 WHERE user_id = $1', [userId, playlistId]).
            then(function(result){
                if(result.length != 1){
                    throw("Playlist does not exist for user");
                }
            });
    }

    function doesPlayListExist(userId, playlistId){
        return runQuery('SELECT * FROM playlist WHERE user_id = $1 AND id = $2', [userId, playlistId]).
            then(function(result){
                if(result.length != 1){
                    throw("Playlist does not exist for user");
                }
            });
    }

    function createShare(userId, playlistId){
        doesUserExist(userId);
        doesPlayListExist(userId, playlistId);

        var id = uuid();

        data[userId][playlistId]['shareId'] = id;

        shares[id] = {
            userId,
            playlistId
        };

        return id;
    }

    function getShare(id){
        var share = shares[id];

        return getPlaylist(share.userId, share.playlistId);
    }

    function runQuery(queryStr, params){
        return new Promise(function(resolve){
            pg.connect(connectionString, function(err, client, done) {
                if(err) {
                    return console.error('error fetching client from pool', err);
                }
                client.query(queryStr, params, function(err, result) {
                    done();

                    if(err) {
                        return console.error('error running query', err);
                    }
                    resolve(result.rows);
                });
            });
        })

    }

    return {
        addPlaylist: addPlaylist,
        getPlaylists: getPlaylists,
        getPlaylist: getPlaylist,
        addSong: addSong,
        createShare: Promise.promisify(createShare),
        getShare: Promise.promisify(getShare)
    };
};

module.exports = Playlists;