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

        var firstPointName;
        var secondPointName;
        $scope.showFirst=true;
        $scope.showSecond=true;

        $http(reqest).then(function(response) {
            console.log("response is: "+response.data.points.length);
            if (response.data.points.length>0) {
               if (response.data.points.length===2) {
                   firstPointName = response.data.points[0].point;
                   secondPointName = response.data.points[1].point;
                   getFirstSavedPoints(firstPointName);
                   getSecondSavedPoints(secondPointName);
                   $scope.showFirst=false;
                   $scope.showSecond=false;
               }
               else{
                   firstPointName = response.data.points[0].point;
                   getFirstSavedPoints(firstPointName);
                   $scope.showFirst=false;
                   alert("User has only 1 saved point");
               }
            }
            else
                alert("Failed - User didnt save any points yet");
        }, function errorCallback(response) {
            alert("error - "+response);
            console.log(response);
            console.log("error!")
        });


        // get the saved points of the user
        getFirstSavedPoints=function(pointName){
            $http({
                method: 'GET',
                url: 'http://localhost:3000/points/getPoint/'+pointName,
            }).then(function successCallback(response) {
                $scope.FirstSavedpoint=response.data.points[0];
                console.log("FirstSaved: "+$scope.FirstSavedpoint);
                console.log(response.data.points[0]);
            }, function errorCallback(response) {
                console.log(response.data);
            });
        }


        // get the saved points of the user
        getSecondSavedPoints=function(pointName){
            $http({
                method: 'GET',
                url: 'http://localhost:3000/points/getPoint/'+pointName,
            }).then(function successCallback(response) {
                $scope.SecondSavedpoint=response.data.points[0];
                console.log("FirstSaved: "+$scope.SecondSavedpoint);
                console.log(response.data.points[0]);
            }, function errorCallback(response) {
                console.log(response.data);
            });

        }


    });