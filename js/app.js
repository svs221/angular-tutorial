(function(){
'use strict';

angular.module('tutorialApp', [])

.factory("Calculations",function(){
  var calculations = [];
  calculations.timesTwo = function(a){
    return (a * 2);
  };

  return calculations;
})

.directive('welcomeMsg', function(){
  return{
    restrict: "AE",   // A = Attribute, E = Element, M = Comment, C = Class
    template: "<div>Hey, how are ya?</div>"
  }

})


.controller('tutorialController', tutorialController);

tutorialController.$inject = ['$scope','Calculations'];
function tutorialController($scope, Calculations){

$scope.tutorialObj = [];
$scope.tutorialObj.title = "Main Page";
$scope.tutorialObj.subTitle = "Subtitle";

$scope.tutorialObj.bind = 2;

$scope.tutorialObj.fname = "Skanda";
$scope.tutorialObj.lname = "Setty";

$scope.double = function(){
  $scope.tutorialObj.bind = Calculations.timesTwo($scope.tutorialObj.bind);
};

}

})();
