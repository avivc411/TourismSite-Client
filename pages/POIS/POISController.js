// POI controller
angular.module("myApp")
    .controller("POISController", function ($scope, $http) {
        self = this;
        $scope.points=[];
        $http.get("http://localhost:3000/points/getAllPoints")
            .then(function (response) {
                $scope.points=response.data.points;
            }, function (response) {
                alert(response.statusText)
            })
    });