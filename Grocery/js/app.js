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
      //controller: "GroceryListItemsController"
    })

    .otherwise({
      redirectTo: "/"
    });


});

app.controller("HomeController", ["$scope", function($scope) {
    $scope.appTitle = "Grocery List";
}]);

app.controller("GroceryListItemsController", ["$scope", function($scope){
    $scope.groceryItems = [
        {itemName: 'milk', date: '2014-10-01'},
        {itemName: 'cookies', date: '2014-10-01'},
        {itemName: 'ice cream', date: '2014-10-02'},
        {itemName: 'potatoes', date: '2014-10-02'},
        {itemName: 'cereal', date: '2014-10-03'},
        {itemName: 'bread', date: '2014-10-03'},
        {itemName: 'eggs', date: '2014-10-04'},
        {itemName: 'tortillas', date: '2014-10-04'}
    ]

}])

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
