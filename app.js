let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
        })
        .when('/register', {
            templateUrl: 'pages/register/draft.html',
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

angular.module('myApp').controller('AppCtrl', function($scope, $window, $rootScope) {
    $scope.fun=function () {
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