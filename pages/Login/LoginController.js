// Login controller
angular.module("myApp")
    .controller("LoginController", function ($window, $scope, $http, $rootScope,$location) {
        self=this;

        $scope.submitLogin=function f() {
            var data = {
                username: $scope.userNameGet,
                password: $scope.passwordGet
            };
            console.log(data.username);
            console.log(data.password);
            $http.post('http://localhost:3000/users/login', data)
            .then(function successCallback(response) {
                console.log("RESPONSE:",response.data);
                if (response.data.message===undefined) {
                    $window.sessionStorage.setItem("token", response.data);
                    $rootScope.user=$scope.userNameGet;

                    const req = {
                        method: 'GET',
                        url: 'http://localhost:3000/points/private/getFavoritesPoints',
                        headers: {
                            'x-auth-token':$window.sessionStorage.getItem("token")
                        }
                    };

                    $http(req).then(function(response) {
                        $window.sessionStorage.setItem('favoritesPoints', JSON.stringify(response.data.points));
                    }, function errorCallback(response) {
                        alert(response.statusText);
                    });
                    alert("Logged in!" );
                    $location.path('/AfterLogin');

                }
                else{
                    alert("Error! " + response.data.message);
                }
            }, function errorCallback(response) {
                alert("error "+ response.data);

            });
        console.log('done login try');
    }
    });