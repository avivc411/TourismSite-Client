// POI controller
angular.module("myApp")
    .controller("AfterLoginController", function ($window, $scope, $http, $rootScope) {
        self = this;

        // get popular points
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


        // get saved points
        var reqest = {
            method: 'GET',
            url: 'http://localhost:3000/points/private/getLastTwoPoints',
            headers: {
                'x-auth-token':$window.sessionStorage.getItem("token")
            },
            data: {}
        };

        var pointName;
        $http(reqest).then(function(response) {
            if (response.data.message===undefined) {
                console.log("saved point : "+response.data.points[0].point);
                pointName=response.data.points[0].point;
                getSavedPoints(pointName);
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


        // get the saved points of the user
        getSavedPoints=function(pointName){
            $http({
                method: 'GET',
                url: 'http://localhost:3000/points/getPoint/'+pointName,
            }).then(function successCallback(response) {
                $scope.FirstSavedpoint=response.data.points[0];
                console.log("FirstSaved: "+$scope.FirstSavedpoint);
                console.log(response.data.points[0]);
                alert("success!");
            }, function errorCallback(response) {
                console.log(response.data);
            });

        }


    });