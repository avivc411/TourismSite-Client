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

        $scope.showRank = $window.sessionStorage.getItem("token")==null;

        $scope.$watch(function() {
            return $rootScope.point;
        }, function() {
            $scope.point = $rootScope.point;
            $scope.getReviews();
            $scope.updateNumOfViewers();
        }, true);

        $scope.getReviews=function(){
            $http({
                method: 'GET',
                url: 'http://localhost:3000/points/getLastTwoReviews/'+$rootScope.point.name,
            }).then(function successCallback(response) {
                var reviews=response.data.twoReviews;
                //console.log("reviews: "+ $scope.reviews.length);
                var uNameFirst = reviews[0].user;
                var uRevFirst = reviews[0].review;
                var uDateFirst = reviews[0].date.substring(0,10);
                let ansFirst="  Reviewer: "+uNameFirst+" Review: "+uRevFirst+" Publish Date: "+uDateFirst;
                $scope.reviewFirst=ansFirst;
                let ansSec="";
                $scope.reviewSecond=ansSec;
                if (reviews.length==2){
                    var uNameSec = reviews[1].user;
                    var uRevSec = reviews[1].review;
                    var uDateSec = reviews[1].date.substring(0,10);
                    let ansSec="  Reviewer: "+uNameSec+" Review: "+uRevSec+" Publish Date: "+uDateSec;
                    $scope.reviewSecond=ansSec;
                }

            }, function errorCallback() {
                $scope.reviews=[];
            });
        };


        $scope.updateNumOfViewers=function(){
            $http({
                method: 'GET',
                url: 'http://localhost:3000/points/getPoint/'+$rootScope.point.name,
            }).then(function successCallback(response) {
                console.log("num of viewers updated");
            }, function errorCallback(response) {
                console.log(response.data);
            });

        }





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