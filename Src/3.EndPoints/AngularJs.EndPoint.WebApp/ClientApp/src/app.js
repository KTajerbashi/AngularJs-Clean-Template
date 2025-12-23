angular.module('myApp', ['ngRoute', 'oc.lazyLoad'])
    .controller('MainController', ['$scope', '$http', function ($scope, $http) {
        var vm = this;
        vm.title = 'AngularJS with Node.js Server';
        vm.message = 'Hello World!';
        vm.serverData = null;

        // Make $scope available for header
        $scope.appTitle = 'My AngularJS App';

        vm.getData = function () {
            alert("Get Data");
            //   $http.get('/api/data')
            //     .then(function(response) {
            //       vm.serverData = response.data;
            //     })
            //     .catch(function(error) {
            //       console.error('Error fetching data:', error);
            //     });
        };
    }]);

var app = angular.module('myApp');