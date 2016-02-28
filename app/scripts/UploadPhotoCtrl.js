angular.module('gift-tapes')

.controller('UploadPhotoCtrl', function($scope, $window, $q, $http, dataURItoBlob) {

	$('#file_input').on('change', function(event) {
		var input = document.getElementById('file_input');
		if(input.files && input.files[0]) {
			var canvas = document.getElementById('preview-canvas');
			var ctx = canvas.getContext('2d');
			
			var img = new Image();
			img.src = $window.URL.createObjectURL(input.files[0]);
			
			img.onload = function() {
				//DOWNSCALING
				var size = fitAspect(img.width, img.height, 500, 1000);

				canvas.width = size.w;
				canvas.height = size.h;

				ctx.drawImage(img, 0, 0, size.w, size.h);

				//GREYSCALE
				var data = ctx.getImageData(0, 0, size.w, size.h).data;
				for(var i = 0; i < data.length; i += 4) {
					var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
					data[i] = data[i+1] = data[i+2] = brightness;
				}

				ctx.putImageData(imageData, 0, 0);
			}
		}
	});

	$scope.uploadPicture = function() {
		var input = document.getElementById('file_input');

		if(!input.files || !input.files[0]) return;
		var file = input.files[0];

		$http
			.get('/api/sign_s3', {
				params: {
					file_name: 'dummy.png', 
					file_type: 'image/png' 
				}
			})
			.then(function(resp) {
				var data = resp.data;
				if(data.error) 
					return $q.reject(data.msg);
				else {
					return sendToS3(data);
				}
			})
			.then(function(data) {

			});


	}

	function 

	function sendToS3(data) {
		var canvas = document.getElementById('preview-canvas');	
		var dataURI = canvas.toDataURL('image/png');
		var dataBlob = dataURItoBlob(dataURI);

		/*
		var fd = new FormData();
		fd.append('file', dataBlob, 'dummy.png');

		return $http
			.put(data.signed_request, fd, {
				transformRequest: angular.identity,
				headers: { 
					'x-amz-acl': 'public-read',
					'Content-Type': 'image/png' 
				}
			});

		*/
		var deferred = $q.defer();
		var xhr = new XMLHttpRequest();
		xhr.open("PUT", data.signed_request);
		xhr.setRequestHeader('x-amz-acl', 'public-read');
		xhr.setRequestHeader('Content-Type', 'image/png');
		xhr.onload = function() {
			if (xhr.status === 200) {
				deferred.resolve();
			}
		};
		xhr.onerror = function() {
			deferred.reject();
		};
		xhr.send(dataBlob);

		return deferred.promise;
	}
	
	function fitAspect(w, h, maxw, maxh) {
		var ratio = Math.min(maxw / w, maxh / h);
		return { 
			w: Math.round(w*ratio), 
			h: Math.round(h*ratio)
		};
	}

});
