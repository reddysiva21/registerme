var scotchTodo = angular.module('login', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/')
        .success(function(users) {
            $scope.users = users;
            console.log(users);
            // need to load the all users by default on page load
            $http.post('/listusers')
                .success(function(users){
                    $scope.formData = {}; 
                    $scope.users = users;
                    console.log(users);
                }) 
                .error(function(data){
                    console.log('Error: ' + data);
                });
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createUser = function() {
        $http.post('/', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                //$scope.response = data; 
                $scope.msg = data;
                console.log(data);
                $http.post('/listusers')
                    .success(function(users){
                        $scope.formData = {}; 
                        $scope.users = users;
                        console.log(users);
                    }) 
                    .error(function(data){
                        console.log('Error: ' + data);
                    });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        
    };
}