'use strict';

var careApp = angular.module('careApp',['ngRoute','analytic']);
careApp.controller('HomePageCtrl', function() {

});

careApp.config(['$routeProvider', function($routeProvider) {

	//Page Routing for Home page with productName, i.e, PTG
	$routeProvider.when('/', {
		templateUrl: '/home/page.html',
		controller: 'HomePageCtrl'
	});
	$routeProvider.when('/analytic/report/:reportName', {
		templateUrl: '/analytic/index.html',
		controller: 'HomePageCtrl'
	});
	$routeProvider.otherwise({redirectTo: '/error'});
}]);

