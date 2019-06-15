let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
    // homepage
        .when('/', {
            templateUrl: 'pages/Home/Home.html',
            controller : 'HomeController as HomeCtrl'
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
        .when('/AfterLogin', {
            templateUrl: 'pages/AfterLogin/AfterLogin.html',
            controller : 'AfterLoginController as AfterLoginCtrl'
        })
        // other
        .otherwise({ redirectTo: '/' });
});

angular.module('myApp').controller('AppCtrl', function($scope, $window, $rootScope) {
    $window.sessionStorage.setItem("toDelete", JSON.stringify([]));

    $rootScope.isFavorite=function(point){
        if($window.sessionStorage.getItem("token")===undefined
            || point===undefined
            || point.name===undefined)
            return false;
        $rootScope.favoritesPoints=JSON.parse($window.sessionStorage.getItem('favoritesPoints'));
        let index = $rootScope.favoritesPoints.findIndex( element => element.name === point.name);
        return index >= 0;
    };

    $rootScope.$watch(function() {
        return $window.sessionStorage.getItem('favoritesPoints')!=null;
    }, function() {
        if($window.sessionStorage.getItem('favoritesPoints')!=null)
            $rootScope.favoritesPoints=JSON.parse($window.sessionStorage.getItem('favoritesPoints'));
    }, true);

    $rootScope.showPoint=function(point){
        console.log("change");
        $rootScope.point=point;
        $rootScope.watched=true;
    };

    $rootScope.removeFromFavorites = function(point){
        const toDelete=JSON.parse($window.sessionStorage.getItem("toDelete"));
        toDelete.push(point);
        $window.sessionStorage.setItem("toDelete", JSON.stringify(toDelete));

        $rootScope.favoritesPoints=JSON.parse($window.sessionStorage.getItem('favoritesPoints'));
        let index = $rootScope.favoritesPoints.findIndex( element => element.name === point.name);
        $rootScope.favoritesPoints.splice(index, 1);
        console.log("deleted--------"+$rootScope.favoritesPoints);
        $window.sessionStorage.removeItem('favoritesPoints');
        $window.sessionStorage.setItem('favoritesPoints', JSON.stringify($rootScope.favoritesPoints));
    };

    $rootScope.addToFavorites = function(point){
        $rootScope.favoritesPoints.push(point);
        $window.sessionStorage.setItem('favoritesPoints', JSON.stringify($rootScope.favoritesPoints));
        const toDelete=JSON.parse($window.sessionStorage.getItem("toDelete"));
        let index=toDelete.findIndex(element=> element.name=point.name);
        if(index!==-1)
            toDelete.splice(index, 1);
        $window.sessionStorage.setItem("toDelete", JSON.stringify(toDelete));
    };

    $scope.logout = function(){
        $window.sessionStorage.removeItem("token");
        $window.sessionStorage.clear();
        $rootScope.user=undefined;
    };

    $scope.$watch(function() {
        return $rootScope.user;
    }, function() {
        if($rootScope.user)
            $scope.user = $rootScope.user;
        else $scope.user='guest';
    }, true);

    $scope.$watch(function() {
        return $window.sessionStorage.getItem("token");
    }, function() {
        $scope.loggedIn = $window.sessionStorage.getItem("token")!=null;
    }, true);

    $scope.$watch(function() {
        return $window.sessionStorage.getItem('favoritesPoints');
    }, function() {
        if($window.sessionStorage.getItem('favoritesPoints')!=null) {
            $scope.favoritesPointsCount=JSON.parse($window.sessionStorage.getItem('favoritesPoints')).length;
        }
    }, true);
});