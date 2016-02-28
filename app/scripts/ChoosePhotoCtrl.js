angular.module('gift-tapes')

.controller('ChoosePhotoCtrl', function($scope, $window, $q, $http, $uibModalInstance, dataURItoBlob) {
	$scope.selected = false;

	$uibModalInstance.rendered.then(function() {
		$('#file_input').on('change', function(event) {
			var input = document.getElementById('file_input');
			if(input.files && input.files[0]) {
				var canvas = document.getElementById('preview-canvas');
				downscale(input, canvas, 500, 1000)
					.then(function() { 
						grayscale(canvas);
						$scope.selected = true;
					});
			}
		});
	});

	function downscale(input, canvas, maxw, maxh) {
		var deferred = $q.defer();

		var ctx = canvas.getContext('2d');

		var img = new Image();
		img.src = $window.URL.createObjectURL(input.files[0]);

		img.onload = function() {
			var size = fitAspect(img.width, img.height, maxw, maxh);

			canvas.width = size.w;
			canvas.height = size.h;

			ctx.drawImage(img, 0, 0, size.w, size.h);
			deferred.resolve();
		}

		return deferred.promise;
	}

	function grayscale(canvas) {
		var ctx = canvas.getContext('2d');

		var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		var data = imgData.data;
		for(var i = 0; i < data.length; i += 4) {
			var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
			data[i] = data[i+1] = data[i+2] = brightness;
		}

		ctx.putImageData(imgData, 0, 0);
	}
		
	function fitAspect(w, h, maxw, maxh) {
		var ratio = Math.min(maxw / w, maxh / h);
		return { 
			w: Math.round(w*ratio), 
			h: Math.round(h*ratio)
		};
	}


});
