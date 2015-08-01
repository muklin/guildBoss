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