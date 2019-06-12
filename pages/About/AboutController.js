// About controller
angular.module("myApp")
.controller("AboutController", function ($scope, $http) {
    // button click count
    $scope.btnCount = 0;
    $scope.myFunc = function() {
        $scope.btnCount++;
    };
});