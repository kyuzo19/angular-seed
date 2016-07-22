'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'myApp.view1',
  	'myApp.view2',
	'myApp.view3',
	'firebase'
]).run(["$rootScope","$location", function($rootScope,$location){
	$rootScope.$on("$routeChangeError", function(event, next, previous, error){
		if(error === "AUTH_REQUIRED"){
			$location.path("/view1");
		}
	});
}]).directive("testDirect", function(){
	return{
		restrict: 'E',
		templateUrl: 'view3/update.html'
	}
})
	
.config(["$routeProvider", "$locationProvider", function($routeProvider,$locationProvider){
		$locationProvider.hashPrefix('!');
			$routeProvider
				.when("/view1" , {
			  		controller: "View1Ctrl",
			  		templateUrl: "view1/view1.html",
			  		resolve: {
						"currentAuth": ["Auth", function(Auth) {
								return Auth.$waitForSignIn();
							}]
					}
						
			
				})
				.when("/view2",{
					controller: "View1Ctrl2",
					templateUrl: "view2/view2.html",
					resolve: {
						"currentAuth": ["Auth", function(Auth){
							return Auth.$requireSignIn();
						}]
					}
				})
				.when("/view3",{
					controller: "View1Ctrl3",
					templateUrl: "view3/view3.html",
					resolve: {
						"currentAuth": ["Auth", function(Auth){
							return Auth.$requireSignIn();
						}]
					}
				})
 }])
.factory("firebase",function(){
	var config = {
    apiKey: "AIzaSyC3V_bAa7xrKnKsfb-nwsfGh-i9ptplu6Q",
    authDomain: "newfirebase-7820a.firebaseapp.com",
    databaseURL: "https://newfirebase-7820a.firebaseio.com",
    storageBucket: "newfirebase-7820a.appspot.com",
  };
  return firebase.initializeApp(config);
}).factory("Auth",["$firebaseAuth",function($firebaseAuth){
	return $firebaseAuth();
		
}]).factory("refArray",["$firebaseArray",function($firebaseArray){
	var  ref = firebase.database().ref()
	var users = ref.child("users");
	var array = $firebaseArray(users);
	return array;
}])
.controller("mainCtrl",["$scope","firebase","Auth","$route","refArray",function($scope,firebase,Auth,$route,refArray){
	$scope.employees = refArray;
	$scope.authObj = Auth;
	$scope.authObj.$onAuthStateChanged(function(user) {	
		$scope.authData = user;
		$scope.clear();
  		if (user) {
	  		console.log(user.uid);
			var firebaseUser = $scope.authObj.$getAuth();
			if (firebaseUser) {
  				console.log("Signed in as 1:", firebaseUser.uid);
			} else {
  				console.log("Signed out");
			}
			
  		} else {
			console.log("you're logged out")
  		}
		
	});
	
	$scope.clear = function(){
		$scope.email = $scope.password = ""; 
		$scope.email = $scope.firstname = $scope.lastname = $scope.middlename = $scope.password = "";
		console.log("clear");
		$route.reload();
	}
	
  console.log("mainctrl")

    
}]);
