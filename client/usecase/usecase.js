var app = angular.module("byoucApp", ['usecase.service']);
app.controller("usecaseCtrl", function($scope, UsecaseService) {

    $scope.newField = {};
    $scope.editing = false;
    $scope.beingEditedField = {};

    var promiceUsecase = UsecaseService.getUsecase();

    promiceUsecase.then(function(response){
    		var reportData = response.data;
    		$scope.reportUsecase = reportData;
        console.log($scope.reportUsecase);
	  });

    $scope.sort = function(keyname){
           $scope.sortKey = keyname;   //set the sortKey to the param passed
           $scope.reverse = !$scope.reverse; //if true make it false and vice versa
       }

    $scope.editAppKey = function(usecase, group) {

        $scope.editing = $scope.beingEditedField.group = $scope.reportUsecase.report.indexOf(group);
        $scope.beingEditedField.usecase =  group.useCases.indexOf(usecase);
        $scope.newField = angular.copy(group);
    }

    $scope.saveField = function(index) {
        if ($scope.editing !== false) {
            $scope.reportUsecase.report[$scope.beingEditedField.group] = $scope.newField;
            $scope.editing = false;
        }
        console.log($scope.reportUsecase);
    };

});
