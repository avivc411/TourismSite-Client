// About controller
angular.module("myApp")
    .controller("FavoritesController", function ($window, $filter, $scope, $http) {
        self = this;
        $scope.points=[];
        $scope.searchName='';
        const req = {
            method: 'GET',
            url: 'http://localhost:3000/points/private/getFavoritesPoints',
            headers: {
                'x-auth-token':$window.sessionStorage.getItem("token")
            }
        };

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


        $http(req).then(function(response) {
            $scope.points=$filter('orderBy')(response.data.points, 'rank');
            $scope.pointsBackup=$scope.points;
        }, function errorCallback(response) {
            alert(response.statusText);
        });
    });