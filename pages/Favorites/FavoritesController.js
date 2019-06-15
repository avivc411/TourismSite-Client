// About controller
angular.module("myApp")
    .controller("FavoritesController", function ($window, $filter, $scope, $http) {
        self = this;
        $scope.points=JSON.parse($window.sessionStorage.getItem('favoritesPoints'));
        console.log($scope.points);

        $scope.sortRank = function(event){
            $scope.points=$filter('orderBy')($scope.points, 'rank');
            if ($scope.checked === event.target.value)
                $scope.checked = false
        };

        $scope.sortCat = function(event){
            $scope.points=$filter('orderBy')($scope.points, 'category');
            if ($scope.checked === event.target.value)
                $scope.checked = false
        };

        $scope.itemUp = function(point){
            let index = $scope.points.findIndex( element => element.name === point.name);
            if(index>0){
                let tmp=$scope.points[index-1];
                $scope.points[index-1]=$scope.points[index];
                $scope.points[index]=tmp;
            }
        };

        $scope.itemDown = function(point){
            let index = $scope.points.findIndex( element => element.name === point.name);
            if(index<$scope.points.length){
                let tmp=$scope.points[index+1];
                $scope.points[index+1]=$scope.points[index];
                $scope.points[index]=tmp;
            }
        };

        $scope.savePoints = function () {
            const req = {
                method: 'PUT',
                url: 'http://localhost:3000/points/private/addPointsToFavorites',
                headers: {
                    'x-auth-token':$window.sessionStorage.getItem("token")
                }
            };
            let data= {
                points:[]
            };
            angular.foreach($scope.points, function(point){

            })
        };
    });