// POI controller
angular.module("myApp")
    .controller("POIController", function ($window, $scope, $http, $rootScope) {
        console.log($rootScope.point);
        self = this;
        $scope.point=$rootScope.point;
        $scope.ranks=[1,2,3,4,5];
        $scope.reviews=[];

        $scope.$watch(function() {
            return $rootScope.point;
        }, function() {
            $scope.point = $rootScope.point;
            /*ff();*/
        }, true);

        /*$http.get('http://localhost:3000/points/getLastTwoReviews', {pointName:$rootScope.point.name})
            .then(function successCallback(response) {
                console.log("RESPONSE:", response.data);
                $scope.reviews = response;
                alert("Logged in!");
            }, function errorCallback(response) {
                alert("error " + response.data);
            });*/

        /*
        function ff () {
            console.log($scope.point.name)
            var na=$scope.point.name;
            alert(na);
            var data = {
                pointName: na
            };
            $http.get('http://localhost:3000/points/getLastTwoReviews', data)
                .then(function successCallback(response) {
                    console.log("RESPONSE:", response.data);
                    $scope.reviews = response;
                    alert("Logged in!");
                }, function errorCallback(response) {
                    alert("error " + response.data);

                });
        }
        */

        // rank point
        $scope.rank=function (){
            //alert ($window.sessionStorage.getItem("token"));
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/points/private/rankPoint',
                headers: {
                    'x-auth-token':$window.sessionStorage.getItem("token")
                },
                data: { pointName: $scope.point.name, rank:$scope.selectedRank }
            };
            $http(req).then(function(response) {
                if (response.data.message==undefined)
                    alert("Rank done ");
                else
                    alert("Failed "+response.data.message);
                console.log(response.data);
            }, function errorCallback(response) {
                alert("error - "+response);
                console.log(response);
                console.log("error!")
            });
        };

        // review point
        $scope.sendReview=function (){
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/points/private/writeReviewOnPoint',
                headers: {
                    'x-auth-token':$window.sessionStorage.getItem("token")
                },
                data: { pointName: $scope.point.name, review:$scope.review }
            };
            $http(req).then(function(response) {
                alert("Rank done ");
                console.log(response.data);
            }, function errorCallback(response) {
                alert("error - "+response.data );
                console.log(response);
                console.log("error!")
            });
        }
    });