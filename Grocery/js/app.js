/**
 *
 */
var app = angular.module('groceryListApp', ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl: "views/list.html",
            controller: "HomeController"
        })
        .when("/addItem",{
            templateUrl: "views/inputItem.html",
            controller: "GroceryListItemsController"
        })
        .when('/addItem/edit/:id',{
            templateUrl: 'views/inputItem.html',
            controller: 'GroceryListItemsController'
        })
        .otherwise({
            redirectTo: "/"
        })
});

app.service("GroceryService", function($http){
  var groceryService = {};

      groceryService.gItems = [];

      $http.get("data/server_data.json")
        .then(function(response) {
            groceryService.gItems = response.data;

            for (var item in groceryService.gItems) {
              groceryService.gItems[item].date = new Date(groceryService.gItems[item].date);
            }
          },
          function(response) {
            alert("Something went wrong!");
          });

  groceryService.findById = function(id){
      for(var item in groceryService.gItems){
          if(groceryService.gItems[item].id === id) {
              // console.log(groceryService.groceryItems[item]);
              return groceryService.gItems[item];
          }
      }
  };


      groceryService.getNewId = function(){

          if(groceryService.newId){
              groceryService.newId++;
              return groceryService.newId;
          }
          else{
              var maxId = _.max(groceryService.gItems, function(entry){
                return entry.id;
              })
              groceryService.newId = maxId.id + 1;
              return groceryService.newId;
          }
      };

      groceryService.removeItem = function(entry){
          var index = groceryService.gItems.indexOf(entry);
          groceryService.gItems.splice(index, 1);
      };

  groceryService.save = function(entry) {

    var updated = groceryService.findById(entry.id);
    if (updated) {
      updated.completed = entry.completed;
      updated.itemName = entry.itemName;
      updated.date = entry.date;
    }
    else {
      $http.get("data/added_item.json")
        .then(function(response) {
            entry.id = response.data.newId;
          },
          function(response) {
            alert("Something went wrong!");
          });

      groceryService.gItems.push(entry);
    }
  };

  groceryService.mark = function(entry){
    entry.completed = !entry.completed;
  }

  return groceryService;

});

app.controller("HomeController", ["$scope", "GroceryService", function($scope, GroceryService) {

    $scope.groceryItems = GroceryService.gItems;
    $scope.appTitle = "Grocery List";

    $scope.removeItem = function(entry){
      GroceryService.removeItem(entry);
  };

    $scope.mark = function(entry){
      GroceryService.mark(entry);
    };

    $scope.$watch( function(){ return GroceryService.gItems; }, function(groceryItems) {
    $scope.groceryItems = groceryItems;
  })

}]);

app.controller("GroceryListItemsController", ["$scope", "$routeParams", "$location", "GroceryService", function($scope, $routeParams, $location, GroceryService){

    if(!$routeParams.id) {
        $scope.groceryItem = {id: 0, completed: false, itemName: "", date: new Date()};
    }
    else{
        $scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id)));
    }

    $scope.save = function(){
        GroceryService.save( $scope.groceryItem );
        $location.path("/");
    };

}]);

app.directive("svsGroceryItem",function(){
  return{
      restrict: "E",
      templateUrl: "views/item.html"
  }
});
