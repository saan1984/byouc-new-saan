var app = angular.module("usecase.service", []);

app.service('UsecaseService', function($http) {

		var getUsecase = function() {
			var promise = $http.get('data.json')
				return promise;
		}

	return {"getUsecase":getUsecase};
});
