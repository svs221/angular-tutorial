
var app = angular.module('newApp',['ngRoute','tutorialApp']);

app.config(function($routeProvider){
  $routeProvider

    .when("/",{
      templateUrl: "tutorial.html",
      controller: "tutorialController"
    })

    .when("/tutorialSecond",{
      templateUrl: "tutorialSecond.html",
      controller: "TutorialController2"
    })

    //.when("/tutorialThird"),{
    //  templateUrl: "index.html"
    //})

    .otherwise({
      redirectTo: "/"

    });


});

app.controller("TutorialController2",["$scope",function($scope){
  $scope.secondTutorial = "This is the second Tutorial";
}]);
