'use strict';

angular.module('myApp.view1', ['ngRoute'])

.controller('View1Ctrl', ["$scope","currentAuth",function($scope,currentAuth) {
        //Sign in
    $scope.signIn = function(){
        var email = $scope.email;
		var password = $scope.password;
			$scope.authObj.$signInWithEmailAndPassword(email,password).then(function(data){
			console.log("welcome");
			
		}).catch(function(error){
          	var errorCode = error.code;
			var errorMessage = error.message;
			console.log("Error code: " + errorCode);
			console.log("Error message: " + errorMessage);
		});
    };
	console.log("controller view1");
	
	
	
}]);