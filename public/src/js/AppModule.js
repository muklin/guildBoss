angular.module('guildBossApp', ['ngRoute','Login','Nav','Main','Char'])
.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/login',{
		templateUrl : '/views/login.html',
		controller : "LoginCtrl"
	});
	$routeProvider.when('/newAcct',{
		templateUrl : '/views/newAcct.html',
		controller : "NewAcctCtrl"
	});
	$routeProvider.when('/logout',{
		templateUrl : '/views/logout.html',
		controller : "LoginCtrl"
	});
	$routeProvider.when('/',{
		templateUrl : '/views/home.html',
		controller : "MainCtrl"
	});
	$routeProvider.when('/guild',{
		templateUrl : '/views/guildList.html',
		controller : "GuildCtrl"
	});
	$routeProvider.when('/division/:divisionID',{
		templateUrl : '/views/division.html',
		controller : "DivisionCtrl"
	});
	$routeProvider.when('/char/:charID',{
		templateUrl : '/views/char.html',
		controller : "CharCtrl"
	});
	
	$routeProvider.otherwise({
		redirectTo : '/views/blank.html'
	});
}])
.controller('AppCtrl', ['$scope','$rootScope','$location','loginService', function($scope,$rootScope,$location,loginService) {
	$rootScope.loginDetails = loginService;
	$scope.working = false;
	$scope.loggedIn = $rootScope.loginDetails.loginData.loggedIn;
	
	$scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){  
		if ($rootScope.loginDetails.loginData.loggedIn !== true && newValue != '/newAcct' && newValue != '/login'){
			$location.url("/login");
		}
	});
	
	
}]);