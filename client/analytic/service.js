var pie = angular.module("analytic.service",[]);

pie.service('AnalyticService', function($http) {

		var getAnalytic = function(reportName) {
			//var promise = $http.get('analytic/data.json');
			var promise = $http.get('/api/report/'+reportName);
			return promise;
		}

	return {"getAnalytic":getAnalytic};
});