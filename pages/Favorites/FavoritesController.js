// About controller
angular.module("myApp")
.controller("FavoritesController", function ($scope, $http) {
    self = this;
    $scope.points=[];
    $http.get("http://localhost:3000/points/getAllPoints")
        .then(function (response) {
            $scope.points=$filter('orderBy')(response.data.points, 'rank');
        }, function (response) {
            alert(response.statusText)
        });

    $scope.sortRank = function(){
        $scope.points=$filter('orderBy')($scope.points, 'rank');
    };

    $scope.sortCat = function(){
        $scope.points=$filter('orderBy')($scope.points, 'category');
    };
});