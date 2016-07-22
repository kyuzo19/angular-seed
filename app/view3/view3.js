'use strict';

angular.module('myApp.view3', ['ngRoute'])

.controller('View1Ctrl3', ["$scope","refArray",function($scope,refArray) {
    $scope.delete = function(user){
		refArray.$remove(user).then(function(ref){
			console.log("deleted");
            alert("deleted");
		}) 
	};
	$scope.edit = function(user){
		$scope.firstname = user.firstname;
		$scope.lastname = user.lastname;
		$scope.email = user.email;
		$scope.middlename = user.middlename;
		$scope.editForm = 1;
		$scope.id = user.$id;
	}
	$scope.updateUser =function(){
		var id = $scope.id;
		var record = $scope.employees.$getRecord(id);
		record.firstname = $scope.firstname;
		record.lastname = $scope.lastname;
		record.middlename = $scope.middlename;
		record.email = $scope.email;
		$scope.employees.$save(record).then(function(){
			console.log("successfully updated");
            alert("Update Successfull")
			
		});
		$scope.editForm =0;
	}
  
}]);