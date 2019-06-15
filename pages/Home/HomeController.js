// About controller
angular.module("myApp")
    .controller("HomeController", function ($scope, $rootScope, $http) {

        $scope.threeRandomPoints=function () {
            $scope.randomPoints=[];
            $http.get("http://localhost:3000/points/getAllPoints")
                .then(function(response){
                        let randomPoints=response.data.points;
                        let first=getRandomNumber(randomPoints.length),
                            second=getRandomNumber(randomPoints.length),
                            third=getRandomNumber(randomPoints.length);
                        while(second===first)
                            second=getRandomNumber(randomPoints.length);
                        while(third===first || third===second)
                            third=getRandomNumber(randomPoints.length);
                        $scope.firstPoint=randomPoints[first];
                        $scope.secondPoint=randomPoints[second];
                        $scope.thirdPoint=randomPoints[third];
                    },
                    function(response){
                        alert(response.statusText);
                    })
        };

        $scope.$watch(function() {
            return $rootScope.watched;
        }, function() {
            if($rootScope.watched) {
                $scope.randomPoints = $scope.threeRandomPoints();
                $rootScope.watched = false;
            }
        }, true);
    });

function getRandomNumber(range) {
    return Math.floor(Math.random()*range);
}