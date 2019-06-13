// About controller
angular.module("myApp")
    .controller("HomeController", function ($scope, $http, $window) {
        $scope.function=function () {
            let loggedIn=$window.sessionStorage.getItem("token");
            console.log(loggedIn);
        }
    });