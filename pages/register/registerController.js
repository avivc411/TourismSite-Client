// poi controller
angular.module("myApp")
    .controller("registerController", function ($scope,$http) {
        self = this;
        $scope.userName=12;

        $http.get('http://localhost:3000/getCountries').then(function(response){
            console.log('entered??')
            $scope.userName=response.data;
            console.log(response.data);

        });
    });
