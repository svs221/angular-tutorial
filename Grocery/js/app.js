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

app.service("GroceryService", function(){
  var groceryService = {};
  groceryService.gItems =  [
        {id: 1, completed: true, itemName: 'milk', date: new Date("October 1, 2014 11:13:00")},
        {id: 2, completed: true, itemName: 'cookies', date: new Date("October 1, 2014 11:13:00")},
        {id: 3, completed: true, itemName: 'ice cream', date: new Date("October 1, 2014 11:13:00")},
        {id: 4, completed: true, itemName: 'potatoes', date: new Date("October 2, 2014 11:13:00")},
        {id: 5, completed: true, itemName: 'cereal', date: new Date("October 3, 2014 11:13:00")},
        {id: 6, completed: true, itemName: 'bread', date: new Date("October 3, 2014 11:13:00")},
        {id: 7, completed: true, itemName: 'eggs', date: new Date("October 4, 2014 11:13:00")},
        {id: 8, completed: true, itemName: 'tortillas', date: new Date("October 5, 2014 11:13:00")}
    ];

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
      entry.id = groceryService.getNewId();
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
