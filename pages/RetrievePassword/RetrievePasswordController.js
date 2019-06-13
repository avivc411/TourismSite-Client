// Retrieve password controller
angular.module("myApp")
    .controller("RetrievePasswordController", function ($scope,$http) {
        self = this;

        $http.get('http://localhost:3000/users/getAllQuestions').then(function(response){
            var temp=response.data;
            console.log(temp)
            $scope.questions=temp;
        });

        $scope.submitRecovery=function sr() {
            console.log("begin");
        }


        $scope.submitRecovery=function sr() {
            console.log("ok start recovery");
            var data = {
                username: $scope.userNameGet,
                questionID: $scope.selectedQuest.id,
                answer: $scope.AnsGet
            }
            $http.post('http://localhost:3000/users/restorePassword', data)
                .then(function successCallback(response) {
                    console.log("RESPONSE:",response.data[0].pass);
                    alert("GOOD! Your password is: " +response.data[0].pass);
                }, function errorCallback(response) {
                    alert("error "+response.data);
                    console.log(response.data);
                    console.log("error!")
                });

            console.log('done recovery try');
        }




    });