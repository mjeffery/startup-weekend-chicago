var uuid = require('tiny-uuid4');
var Errors = require('./errors');
var Promise = require("bluebird");
var pg = require('pg');
var connectionString = process.env.DATABASE_URL + "?ssl=true";

var Playlists = function(){
    var data = {};
    var shares = {};

    function addPlaylist(userId){
        var id = uuid();

        if(!data.hasOwnProperty(userId)){
            data[userId] = {};
        }

        data[userId][id] = {songs: []};

        return id;
    }

    function getPlaylists(userId){
        return new Promise(function(resolve){
            pg.connect(connectionString, function(err, client, done) {
                if(err) {
                    return console.error('error fetching client from pool', err);
                }
                client.query('SELECT * FROM playlist WHERE user_id = $1', [userId], function(err, result) {
                    done();

                    if(err) {
                        return console.error('error running query', err);
                    }
                    resolve(result.rows);
                });
            });
        });
    }

    function getPlaylist(userId, playlistId){

        return new Promise(function(resolve){
            pg.connect(connectionString, function(err, client, done) {
                if(err) {
                    return console.error('error fetching client from pool', err);
                }
                client.query('SELECT * FROM playlist WHERE user_id = $1 and id = $2', [userId, playlistId], function(err, result) {
                    done();

                    if(err) {
                        return console.error('error running query', err);
                    }
                    resolve(result.rows);
                });
            });
        });
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

    return {
        addPlaylist: Promise.promisify(addPlaylist),
        getPlaylists: getPlaylists,
        getPlaylist: Promise.promisify(getPlaylist),
        addSong: Promise.promisify(addSong),
        createShare: Promise.promisify(createShare),
        getShare: Promise.promisify(getShare)
    };
};

module.exports = Playlists;