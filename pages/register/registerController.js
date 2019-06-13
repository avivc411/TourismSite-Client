// register controller
angular.module("myApp")
    .controller("registerController", function ($scope,$http) {
        self = this;


        $http.get('http://localhost:3000/getCountries').then(function(response){
            console.log('entered??')
            var temp=response.data.countries;
            $scope.countries=temp;
            // $scope.countries=temp[0]["countryName"];
            console.log(temp[0]["countryName"]);
        });

        $http.get('http://localhost:3000/categories/getCategories').then(function(response){
            console.log('entered categories')
          //  var categ=response.data.result;
           var categ=response.data.categories;
            $scope.categories=categ;
            // $scope.countries=temp[0]["countryName"];
           // console.log(categ[0]["result"]);
            $scope.selectionCategory=[];
            $scope.toggleSelectionCategory=function f(name){
                var idx = $scope.selectionCategory.indexOf(name);
                if (idx > -1) {
                    // is currently selected
                    $scope.selectionCategory.splice(idx, 1);
                    console.log('ok deleted');
                    console.log($scope.selectionCategory);
                }
                else {
                    $scope.selectionCategory.push(name);
                    console.log('ok inserted');
                    console.log($scope.selectionCategory);
                }
            }
        });
        $http.get('http://localhost:3000/users/getAllQuestions').then(function(response){
            console.log('entered questions')
            var temp=response.data;
            console.log(temp)
            $scope.questions=temp;
        });

        $scope.submitReg=function t() {
            console.log("ok submit");
            alert($scope.lastNameGet);
            var data = {
                username: $scope.userNameGet,
                password: $scope.passwordGet,
                firstName: $scope.firstNameGet,
                lastName: $scope.lastNameGet,
                city: "beersheva",
                country: "Israel",
                email: "yanis@gmail.com",
                categories: [{name: "Fun"}, {name: "Museums"}],
                question1: "1",
                answer1: "yes",
                question2: "2",
                answer2: "yes"
            }


            $http.post('http://localhost:3000/users/register', data)

        .then(function successCallback(response) {
            console.log("success!")
    }, function errorCallback(response) {
            alert("error");
            console.log("error!")
    });




            /*
            .then(function (response) {
            console.log('register try')
            var temp = response.data;
            if (temp)
            console.log('success');
            else
                console.log('error');

             */
            //});
            console.log('done register try');
        }
    });

