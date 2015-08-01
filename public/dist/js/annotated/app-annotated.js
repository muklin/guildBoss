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
angular.module("Char",[])
.controller('CharCtrl', ['$scope','$location','$route', function($scope,$location,$route) {
	
	
	$scope.guildName = "Adventurous Water Rats Inc.";
	$scope.divisionName = "Security";
	
	var charIndex = 0;
	$scope.next = function(){
		console.log("next");
		if(charIndex == chars.length-1){
			charIndex = 0;
		}else{
			charIndex++;	
		}
	};
	$scope.prev = function(){
		console.log("prev");
		if(charIndex === 0){
			charIndex = chars.length-1;
		}else{
			charIndex--;	
		}
	};
	$scope.char = $scope.chars[charIndex];
	
	
}]);
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

angular.module('Main', [])
.controller('MainCtrl', ['$scope','$rootScope', function($scope,$rootScope) {
	$scope.realName = $rootScope.loginDetails.loginData.realName;
	$scope.guildName = "Adventurous Water Rats Inc.";
	$scope.guildMS = "\"" + "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."+"\"";
	$scope.divisions=[
		{divisionName:"Security",url:"/#/guild/1/division/1"}
	];
	
	$scope.charSlideView="/views/char.html";
}])
.controller('DivisionCtrl', ['$scope','$route', function($scope,$route) {	
	$scope.divisionID = $route.current.pathParams.divisionID;
	
	if($scope.divisionID==1){
		$scope.guildName="Adventurous Water Rats Inc.";
		$scope.divisionName="Security";
		console.log("Set default names "+ $scope.divisionName);
	}else{
		$scope.guildName="Unknonwn";
		$scope.divisionName="";
	}
}]);
angular.module('Nav', ['ngRoute'])
.controller('NavCtrl', ['$scope','$rootScope','$location', function($scope,$rootScope,$location) {
	$scope.include="/views/nav.html";
	$scope.go = function ( path ) {
		$location.path( path );
	};
	
	$scope.navs=[{
		name:"Home",
		url:"/",
		subMenu:[]
	},{
		name:"Guilds",
		url:"/guilds",
		subMenu:[]
	},{
		name:"Division",
		url:"/division/1",
		subMenu:[{
			name:"Missions",
			url:"/division/1/missions/",
		}]
	},{
		name:"Library",
		url:"/library",
		subMenu:[]
	},{
		name:"Logout",
		url:"/logout",
		subMenu:[]
	}];
}]);