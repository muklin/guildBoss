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