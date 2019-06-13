// About controller
angular.module("myApp")
.controller("AboutController", function ($scope, $rootScope, $window) {
    // button click count
    $scope.btnCount = 0;
    $scope.myFunc = function() {
        $scope.btnCount++;
        $rootScope.user="moshe";
        $rootScope.token="token";
        $window.sessionStorage.setItem("token", "shit");
        console.log("in about: "+$window.sessionStorage.getItem("token"));
    };
});