angular.module('gift-tapes')

.service('soundCloudSearchService', function($q) {
	function find(query) {
		var deferred = $q.defer();

		//TODO deferred.resolve() with the result of the query
		//TODO deferred.reject() with the error
		
		deferred.resolve([{ id: 24566, title: 'Never Gonna Give You Up', artist: 'Rick Astley' }]);

		return deferred.promise;
	}

	return {
		find: find
	};
});
