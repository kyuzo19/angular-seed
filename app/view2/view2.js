'use strict';

angular.module('myApp.view2', ['ngRoute'])

.controller('View1Ctrl2', ["$scope","currentAuth","refArray","$timeout",function($scope,currentAuth,refArray,$timeout) {
	
	$scope.createUser = function(){
    	refArray.$add({
			email: $scope.email,
			firstname:$scope.firstname,
			lastname:$scope.lastname,
			middlename:$scope.middlename,
			password:$scope.password
		   
	   }).then(function(){
			$scope.authObj.$createUserWithEmailAndPassword($scope.email,$scope.password).then(function(firedata){
				console.log("firebase user id: " + firedata.uid);
				
			}).catch(function(error){
				console.log("Error: " + error);
			});
			console.log("add succeeded");
			$scope.create = 1;
			$timeout(function () {
     			$scope.create = 0;
				$scope.clear();
				$scope.authObj.$signOut();
    		}, 2000);
		
		})
		
		
	}
   
}]);