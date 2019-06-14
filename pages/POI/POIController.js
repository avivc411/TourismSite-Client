// POI controller
angular.module("myApp")
.controller("POIController", function ($window,$scope, $http,$rootScope) {
    self = this;
    $scope.point=$rootScope.point;


    $scope.ranks=[1,2,3,4,5];

    $scope.$watch(function() {
        return $rootScope.point;
    }, function() {
        $scope.point = $rootScope.point;
    }, true);


    $scope.rank=function f(){
    //alert ($window.sessionStorage.getItem("token"));
    var req = {
        method: 'POST',
        url: 'http://localhost:3000/points/private/rankPoint',
        headers: {
            'x-auth-token':$window.sessionStorage.getItem("token")
        },
        data: { pointName: $scope.point.name, rank:$scope.selectedRank }
    }
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
}

});