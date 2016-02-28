var express = require('express');
var router = express.Router();

var uuid = require('tiny-uuid4');
var aws = require('aws-sdk');
var path = require('path');

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

router.get('/sign_s3', function(req, res, next) {
	var key = uuid() + path.extname(req.query.file_name);

	aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
	var s3 = new aws.S3();
	var s3_params = {
		Bucket: S3_BUCKET,
		Key: key,
		Expires: 60,
		ContentType: req.query.file_type,
		ACL: 'public-read'
	};

	s3.getSignedUrl('putObject', s3_params, function(err, data) {
		var return_data;

		if(err) {
			return_data = {
				error: true,
				msg: err
			};
		}
		else {
			return_data = {
				error: false,
				signed_request: data,
				url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + key,
				file_type: req.query.file_type
			};
		}
			
		res.write(JSON.stringify(return_data));
		res.end();
	});
});

module.exports = router;
	
