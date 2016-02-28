var express = require('express');
var router = express.Router();

var playlists = require('./playlists-endpoint');
var s3 = require('./s3');

router.use('/', playlists);
router.use('/', s3);

module.exports = router;

