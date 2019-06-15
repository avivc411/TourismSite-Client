// About controller
angular.module("myApp")
    .controller("FavoritesController", function ($window, $filter, $scope, $http) {
        self = this;
        $scope.points=JSON.parse($window.sessionStorage.getItem('favoritesPoints'));

        $scope.$watch(function() {
            return $window.sessionStorage.getItem("favoritesPoints");
        }, function() {
            if($window.sessionStorage.getItem("favoritesPoints")!=null)
                $scope.points=JSON.parse($window.sessionStorage.getItem('favoritesPoints'));
        }, true);

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
            if(index<$scope.points.length && index>=0){
                let tmp=$scope.points[index+1];
                $scope.points[index+1]=$scope.points[index];
                $scope.points[index]=tmp;
            }
        };

        $scope.savePoints = function () {
            let data = buildData($scope.points, JSON.parse($window.sessionStorage.getItem('toDelete')));
            console.log("saving: "+data.points);
            let uri = 'http://localhost:3000/points/private/addPointsToFavorites';
            $http({
                method: 'PUT',
                url: uri,
                headers: {'x-auth-token':$window.sessionStorage.getItem("token")},
                data: data
            }).then(function(response){
                console.log(response.data);
                $window.sessionStorage.removeItem('favoritesPoints');
                $window.sessionStorage.setItem('favoritesPoints',JSON.stringify($scope.points));
                alert("Favorites Saved Successfully");
            }, function(response){
                console.log(response.data);
            });
        };
    });

function buildData(favoritesPoints, toDelete) {
    let data={
        points:[],
        toDelete:[]
    };
    let i=0;
    angular.forEach(favoritesPoints, function(point){
        data.points[i]={
           name:point.name,
           internalRank:i
       };
        i++;
    });
    i=0;
    angular.forEach(toDelete, function(point){
        data.toDelete[i]={
            name:point.name,
        };
        i++;
    });
    return data;
}