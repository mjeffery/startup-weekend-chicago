angular.module('gift-tapes')

.controller('UploadPhotoCtrl', function($scope, $window) {

	$('#file_input').on('change', function(event) {
		var input = document.getElementById('file_input');
		if(input.files && input.files[0]) {
			var canvas = document.getElementById('preview-canvas');
			var ctx = canvas.getContext('2d');
			
			var img = new Image();
			img.src = $window.URL.createObjectURL(input.files[0]);
			
			img.onload = function() {
				var size = fitAspect(img.width, img.height, 500, 1000);

				canvas.width = size.w;
				canvas.height = size.h;

				ctx.drawImage(img, 0, 0, size.w, size.h);
			}
		}
	});

	$scope.uploadPicture = function() {
		
	}
	
	function fitAspect(w, h, maxw, maxh) {
		var ratio = Math.min(maxw / w, maxh / h);
		return { 
			w: Math.round(w*ratio), 
			h: Math.round(h*ratio)
		};
	}

});
