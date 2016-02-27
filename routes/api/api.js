var express = require('express');
var router = express.Router();

var playlists = require('./playlists-endpoint');

router.use('/api', playlists);

module.exports = router;

