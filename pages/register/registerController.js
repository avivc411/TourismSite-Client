// register controller
angular.module("myApp")
    .controller("registerController", function ($scope,$http) {
        self = this;
        $scope.userName=12;

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



    });

