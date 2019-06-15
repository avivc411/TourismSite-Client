// POI controller
angular.module("myApp")
    .controller("AfterLoginController", function ($window, $scope, $http, $rootScope) {
        self = this;
       var u= $rootScope.user;
        alert ("user is:"+u);



            var req = {
                method: 'GET',
                url: 'http://localhost:3000/categories/private/getPopular',
                headers: {
                    'x-auth-token':$window.sessionStorage.getItem("token")
                },
                data: {}
            };

            $http(req).then(function(response) {
                if (response.data.message===undefined) {
                   $scope.FirstPopularpoint = response.data.twoPopularPointsInUsersCategories[0];
                    $scope.SecondPopularpoint = response.data.twoPopularPointsInUsersCategories[1];
                    console.log("temp is: "+$scope.FirstPopularpoint);
                    alert("good ");
                }
                else
                    alert("Failed "+response.data.message);
                console.log(response.data);
            }, function errorCallback(response) {
                alert("error - "+response);
                console.log(response);
                console.log("error!")
            });





    });