// register controller
angular.module("myApp")
    .controller("registerController", function ($scope,$http) {
        self = this;
        $scope.userName=12;

        $http.get('http://localhost:3000/getCountries').then(function(response){
            console.log('entered??')
            var temp=response.data;
            $scope.countries=temp;
           // $scope.countries=temp[0]["countryName"];
            console.log(temp[0]["countryName"]);
        });
    });

