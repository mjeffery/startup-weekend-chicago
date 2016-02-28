var express = require('express');
var router = express.Router();
var Playlists = require('../../data/playlists');

var playlists = Playlists();

function error(res, err){
    res.status(500).json({message:err.message});
}

router.use('/playlists', function(req, res, next){
    req.userId = req.query.userId;
    next();
});

router.use('/shares', function(req, res, next){
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

router.post('/playlists', function(req, res, next) {

    var id = playlists.addPlaylist(req.userId)
        .then(function(id){
            res.json({playlistId: id})
        }, function(err){
            error(res, err);
        });
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

router.post('/playlists/:id', function(req, res, next){
    var playlistId = req.params.id;
    var spotifyId = req.query.spotifyId;
    playlists.addSong(req.userId, playlistId, spotifyId)
        .then(function(list){
            res.json({id: playlistId, playlist: list});
        }, function(err){
            error(res, err);
        });
});

router.post('/shares/', function(req, res, next) {
    var playlistId = req.query.playlistId;
    var email_address = req.query.emailAddress;
    var physical_address = req.query.physicalAddress;
    console.log("foo");
    playlists.createShare(req.userId, playlistId, email_address, physical_address)
        .then(function(id){
            res.json({share: id});
        }, function(err){
            console.log(err);
            error(res, err);
        });
});

router.get('/shares/:id', function(req, res, next) {
    var id = req.params.id;
    console.log("ID: " + id);
    playlists.getShare(id)
        .then(function(list){
            res.json({playlists: list});
        }, function(err){
            error(res, err);
        });
});


router.post('/playlists/:id/customization', function(req, res, next) {
	var playlistId = req.params.id;
	var data = {
		image_url: req.body.image_url,
		album_title: req.body.album_title
	};

	playlists.setCustomization(playlistId, data)
		.then(function() {
			res.status(200);
			res.end();
		})
		.catch(function(err) {
			error(res, err);
		});
});

module.exports = router;
