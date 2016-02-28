angular.module('gift-tapes')

.controller('UploadPhotoCtrl', function($scope, $window, imageService) {
	$('#file_input').on('change', function(event) {
		var input = document.getElementById('file_input');
		if(input.files && input.files[0]) {
			var img = new Image();
			img.src = $window.URL.createObjectURL(input.files[0]);

			imageService.resize(img)
				.then(function(resizedImg) {

				});
		}
	});

	$scope.uploadPicture = function(w, h, maxw, maxh) {
		
	}

});
