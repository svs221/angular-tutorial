/**
 *
 */
var app = angular.module('groceryListApp', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider

    .when("/",{
      templateUrl: "views/gList.html",
      controller: "GroceryListItemsController"
    })

    .when("/addItem",{
      templateUrl: "views/inputItem.html",
      controller: "GroceryListItemsController"
    })

    .when("/addItem/:id",{
      templateUrl: "views/inputItem.html",
      controller: "GroceryListItemsController"
    })

    .otherwise({
      redirectTo: "/"
    });


});

app.service("GroceryService", function(){
  var groceryService = [];
  groceryService.gItems =  [
        {id: 1, completed: true, itemName: 'milk', date: '2014-10-00'},
        {id: 2, completed: true, itemName: 'cookies', date: '2014-10-01'},
        {id: 3, completed: true, itemName: 'ice cream', date: '2014-10-02'},
        {id: 4, completed: true, itemName: 'potatoes', date: '2014-10-02'},
        {id: 5, completed: true, itemName: 'cereal', date: '2014-10-03'},
        {id: 6, completed: true, itemName: 'bread', date: '2014-10-03'},
        {id: 7, completed: true, itemName: 'eggs', date: '2014-10-04'},
        {id: 8, completed: true, itemName: 'tortillas', date: '2014-10-04'}
    ];

    groceryService.save = function(entry){
      groceryService.gItems.push(entry);
    };

  return groceryService;


});

app.controller("HomeController", ["$scope", function($scope) {
    $scope.appTitle = "Grocery List";
}]);

app.controller("GroceryListItemsController", ["$scope", "$routeParams", "GroceryService", "$location", function($scope, $routeParams, GroceryService, $location){
    $scope.groceryItems = GroceryService.gItems;

    $scope.groceryItem = { id:7, completed:true, itemName: "cheese", date: new Date() }

    $scope.save = function(){
      GroceryService.save($scope.groceryItem);
      $location.path("/");
    }
    
}]);


/*
<li class="list-group-item text-center clearfix">
    <button type="button" class="btn btn-sm btn-success pull-left">
        <span class="glyphicon glyphicon-unchecked"></span>
    </button>
    <span style="font-weight:bold">Item 1</span>
    <button type="button" class="btn btn-sm btn-default pull-right">
        <span class="glyphicon glyphicon-pencil"></span>
    </button>
</li>
<li class="list-group-item text-center clearfix">
    <button type="button" class="btn btn-sm btn-success pull-left">
        <span class="glyphicon glyphicon-unchecked"></span>
    </button>
    <span style="font-weight:bold">Item 2</span>
    <button type="button" class="btn btn-sm btn-default pull-right">
        <span class="glyphicon glyphicon-pencil"></span>
    </button>
</li>
<li class="list-group-item text-center clearfix">
    <button type="button" class="btn btn-sm btn-success pull-left">
        <span class="glyphicon glyphicon-unchecked"></span>
    </button>
    <span style="font-weight:bold">Item 3</span>
    <button type="button" class="btn btn-sm btn-default pull-right">
        <span class="glyphicon glyphicon-pencil"></span>
    </button>
</li>
*/
