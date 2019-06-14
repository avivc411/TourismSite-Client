// POI controller
angular.module("myApp")
    .controller("POIController", function ($window, $scope, $http, $rootScope) {
        self = this;
        $scope.point=$rootScope.point;
        $scope.ranks=[1,2,3,4,5];
        $scope.selectedRank=0;
        $scope.reviews=[];
        console.log($rootScope.point);

        $http({
            method: 'GET',
            url: 'http://localhost:3000/points/getLastTwoReviews/'+$rootScope.point.name,
        }).then(function successCallback(response) {
            $scope.reviews=response.data;
        }, function errorCallback(response) {
            console.log(response.data);
        });

        $scope.$watch(function() {
            return $rootScope.point;
        }, function() {
            $scope.point = $rootScope.point;
            $scope.getReviews();
        }, true);

        $scope.getReviews=function(){
            $http({
                method: 'GET',
                url: 'http://localhost:3000/points/getLastTwoReviews/'+$rootScope.point.name,
            }).then(function successCallback(response) {
                $scope.reviews=response.data.twoReviews;
            }, function errorCallback() {
                $scope.reviews=[];
            });
        };

        // rank point
        $scope.rank=function (){
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/points/private/rankPoint',
                headers: {
                    'x-auth-token':$window.sessionStorage.getItem("token")
                },
                data: { pointName: $scope.point.name, rank: $scope.selectedRank }
            };

            $http(req).then(function(response) {
                if (response.data.message===undefined)
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