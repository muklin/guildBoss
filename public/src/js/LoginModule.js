angular.module('Login', ['ngRoute','satellizer'])
.controller('LoginCtrl',['$scope','$rootScope','$auth','$location', function($scope,$rootScope,$auth,$location) {
	$scope.username = "";
	$scope.password = "";
	
    $scope.authenticate = function(provider) {
		$auth.authenticate(provider);
    };
	
	$scope.login = function(){
		if(!$rootScope.loginDetails.login($scope.username,$scope.password)){
			$scope.message="Login Unsuccessful, try again.";
		}else{
			//reload "page" with logged in status.
			$scope.message="";
			$location.path("/");
		}
	};
	$scope.newAcct = function(){
		$location.path("/newAcct");
	};
}])
.controller('NewAcctCtrl',['$scope','$rootScope','$auth','$location','$q','$http', function($scope,$rootScope,$auth,$location,$q,$http) {
	if($rootScope.loginDetails.loginData.loggedIn === true){
		$location.path("/");
	}
	$scope.acctTypeOptions = [{
			id:1, 
			name:"Player"
		},{
			id:2,
			name:"New Campaign (as GM)"
		}];
	
	$scope.newCreated = false;

	$scope.userDtls = {
		email : "",
		password : "",
		acctType : {id:0,name:""},
		firstName : "",
		lastName : "",
		campaignCode : ""
	};
	
	$scope.create= function(){
		$http.post('/createAcct', $scope.userDtls)		
		.success(function(data, status, headers, config) {
			$scope.newCreated = true;
		}).error(function(data, status, headers, config) {
			$scope.message = "There was an error, please try again.";
		});
	};
}])
.controller('LogoutCtrl',['$scope','$rootScope','$auth','$location', function($scope,$rootScope,$auth,$location) {
	$rootScope.loginDetails.logout();
	$location.path("/login");
}])
.factory("loginService",['$http','$q',function($http,$q){
	
	this.loginData = {
		loggedIn : false,
		realName : "",
		username : "",
		password : "",
	};
	
	this.logout = function(username,password){
		//TODO add backend to logout.
		this.loginData.realName = "";
		this.loginData.username = "";
		this.loginData.password = "";
		this.loginData.loggedIn = false;
	};
		
	this.login = function(username,password) {
		$rootScope.working = true;
		$http.get("/login",this.loginData)
			.then(function(response) {
				$rootScope.working = false;
				if (response) {
					return this.loginData.loggedIn;
				} else {
					// invalid response
					return $q.reject(response.data);
				}

			}, function(response) {
				// something went wrong
				return $q.reject(response.data);
			});
		
	};
	return this;
}])
.config(['$authProvider', function($authProvider) {
	
    $authProvider.facebook({
      clientId: '624059410963642'
    });
    $authProvider.google({
      clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
    });	

}]);
