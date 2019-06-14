// Login controller
angular.module("myApp")
    .controller("LoginController", function ($window,$scope, $http,$rootScope) {
        self=this;
        $scope.submitLogin=function f() {
            console.log("ok start login");
            var data = {
                username: $scope.userNameGet,
                password: $scope.passwordGet
            }
            console.log(data.username);
            console.log(data.password);
            $http.post('http://localhost:3000/users/login', data)
                .then(function successCallback(response) {
                    console.log("RESPONSE:",response.data);
                    if (response.data.message==undefined) {
                        $window.sessionStorage.setItem("token", response.data);
                        $rootScope.user=$scope.userNameGet;
                        alert("Logged in!" );
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