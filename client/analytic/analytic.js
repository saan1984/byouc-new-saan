
var pie = angular.module("analytic",[
	'chart.js',
	'analytic.service',
	'ngRoute'
]);


pie.controller('PieCtrl',function($scope,AnalyticService,$routeParams){
	var reportName = $routeParams.reportName;
	console.log("reportName",reportName)
	var promiseAnalytic = AnalyticService.getAnalytic(reportName);
	$scope.reportAnalytic = {};
	console.log();
	//graph 1
	$scope.automatedTestArray = [];
	$scope.unautomatedTestArray = [];
	$scope.labelsAutomationStatus = ["TestCase Automated", "TestCase UnAutomated"];
	$scope.dataAutomation = [0,0];
	//graph 2
	$scope.passedTestArray = [];
	$scope.failedTestArray = [];
	$scope.labelsTestStatus = ["TestCase Passed", "TestCase Failed"];
	$scope.dataTest = [0,0];
	//graph 3
	$scope.groupData = [];
	$scope.passedGroupArray = [];
	$scope.failedGroupArray = [];
	$scope.labelsGroupTestStatus = ["TestCase Passed", "TestCase Failed"];
	$scope.dataGroup = [0,0];
	var getNewGroupData = function(){
		return{
			"groupName":"",
			"passedTest":[],
			"failedTest":[]
		};
	};
	$scope.handleChartClick = function(){
		alert("d")
	}
	promiseAnalytic.then(function(response){
		var reportData = response.data;
		$scope.reportAnalytic = response.data;
		$scope.getAnalyticPerReport($scope.reportAnalytic.report);
		//graph1
		$scope.dataAutomation[0] = $scope.automatedTestArray.length;
		$scope.dataAutomation[1] = $scope.unautomatedTestArray.length;

		//graph 2
		$scope.dataTest[0] = $scope.passedTestArray .length;
		$scope.dataTest[1] = $scope.failedTestArray .length;

		//graph3 default
		$scope.dataGroup[0] = $scope.groupData[0].passedTest.length;
		$scope.dataGroup[1] = $scope.groupData[0].failedTest.length;
		$scope.currentGroup = $scope.groupData[0].groupName;
		console.log("$scope.groupData",$scope.groupData);
	});
	//graph 3
	$scope.getAnalyticPerReport = function(inArray){
		angular.forEach(inArray,function(report,index){
			var useCases = report.useCases;
			var groupName = report.groupName;
			var newGroup = getNewGroupData();
			newGroup.groupName = groupName;
			console.log("groupName",groupName);
			angular.forEach(useCases,function(usecase,index){
				var isAutomated = $scope.getAutomationStatusPerCase(usecase);
				var isTestPassed = $scope.getTestCasePassed(usecase);

				//graph2
				if(isAutomated){
					$scope.automatedTestArray.push(usecase)
				}else{
					$scope.unautomatedTestArray.push(usecase);
				}

				//graph2
				if(isTestPassed){
					$scope.passedTestArray.push(usecase);
					newGroup.passedTest.push(usecase)
				}else{
					$scope.failedTestArray.push(usecase);
					newGroup.failedTest.push(usecase)
				}
			});
			$scope.groupData.push({
				"groupName":groupName,
				"passedTest":newGroup.passedTest,
				"failedTest": newGroup.failedTest
			})
		})

	};
	$scope.handleGroup = function(group){
		$scope.currentGroup = group.groupName;
		$scope.dataGroup[0] = group.passedTest.length;
		$scope.dataGroup[1] = group.failedTest.length;
	}
	$scope.getAutomationStatusPerCase = function(usecase){
		return usecase.automationStatus;
	}

	$scope.getTestCasePassed = function(usecase){
		return usecase.testStatus;
	}
	//usecase: per report no of test passed vs failed
	//usecase: per group passed vs failed
	//usecase: per report no of usecases vs no of automated
});