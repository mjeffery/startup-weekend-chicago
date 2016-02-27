var express = require('express');
var router = express.Router();
var Playlists = require('../../data/playlists');

var playlists = Playlists();

function error(res, err){
    res.status(500).send({message:err});
}

router.use('/', function(req, res, next){
    req.userId = req.query.userId;
    next();
});

router.get('/playlists', function(req, res, next) {
    playlists.getPlaylists(req.userId)
        .then(function(list){
            res.json({playlists: list});
        }, function(err){
            error(res, err);
        });
});

router.put('/playlists', function(req, res, next) {

    var id = playlists.addPlaylist(req.userId)
        .then(function(id){
            res.json({playlistId: id})
        }, function(err){
            error(res, err);
        });
    var obj = {playlistId: id};

    res.json(obj);
});

router.get('/playlists/:playlistId', function(req, res, next){
    var playlistId = req.params.playlistId;

    playlists.getPlaylist(req.userId, playlistId)
        .then(function(list){
            res.json({playlist: list});
        }, function(err){
            error(res, err);
        });
});

router.put('/playlists/:playlistId', function(req, res, next){
    var playlistId = req.params.playlistId;
    var url = req.params.url;
    playlists.addSong(req.userId, playlistId, url)
        .then(function(list){
            res.json({id: playlistId, playlist: list});
        }, function(err){
            error(res, err);
        });
});

module.exports = router;