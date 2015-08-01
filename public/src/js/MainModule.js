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