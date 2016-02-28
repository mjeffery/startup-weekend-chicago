angular.module('gift-tapes')

.factory('sendToS3', function($http, $q) {
	return function(blob, filename, content_type) {
		return $http
			.get('/api/sign_s3', {
				params: {
					file_name: filename,
					file_type: content_type
				}
			})
			.then(function(resp) {
				var data = resp.data;
				if(data.error) 
					return $q.reject(data.msg);
				else {
					return data;
				}
			})
			.then(function(data) {
				var deferred = $q.defer();

				var xhr = new XMLHttpRequest();
				xhr.open("PUT", data.signed_request);
				xhr.setRequestHeader('x-amz-acl', 'public-read');
				xhr.setRequestHeader('Content-Type', content_type);
				xhr.onload = function() {
					if (xhr.status === 200) {
						deferred.resolve(data.url);
					}
				};
				xhr.onerror = function() {
					deferred.reject();
				};
				xhr.send(blob);

				return deferred.promise;
			});

	}
});
