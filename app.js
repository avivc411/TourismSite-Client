let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
    // homepage
        .when('/', {
        })
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller : 'registerController as regCtrl'
        })
        .when('/Login', {
            templateUrl: 'pages/Login/Login.html',
            controller : 'LoginController as LoginCtrl'
        })
        .when('/RetrievePassword', {
            templateUrl: 'pages/RetrievePassword/RetrievePassword.html',
            controller : 'RetrievePasswordController as RetrievePasswordCtrl'
        })
        .when('/About', {
            // this is a template url
            templateUrl: 'pages/About/About.html',
            controller : 'AboutController as AboutCtrl'
        })
        .when('/POIS', {
            templateUrl: 'pages/POIS/POIS.html',
            controller : 'POISController as POISCtrl'
        })
        .when('/POI', {
            templateUrl: 'pages/POI/POI.html',
            controller : 'POIController as POICtrl'
        })
        .when('/Favorites', {
            templateUrl: 'pages/Favorites/Favorites.html',
            controller : 'FavoritesController as FavoritesCtrl'
        })
        // other
        .otherwise({ redirectTo: '/' });
});

angular.module('myApp').controller('AppCtrl', function($scope, $window, $rootScope, $http) {
    $scope.fun=function () {
    };

    $scope.showPoint=function(point){
        $rootScope.point=point;
        $scope.threeRandomPoints();
    };

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

    $scope.logout = function(){
        $window.sessionStorage.removeItem("token");
        //$window.sessionStorage.clear();
        $rootScope.user=undefined;
    };

    $scope.$watch(function() {
        return $rootScope.user;
    }, function() {
        $scope.user = $rootScope.user;
    }, true);

    $scope.$watch(function() {
        return $window.sessionStorage.getItem("token");
    }, function() {
        $scope.loggedIn = $window.sessionStorage.getItem("token")!=null;
    }, true);
});

function getRandomNumber(range) {
    return Math.floor(Math.random()*range);
}