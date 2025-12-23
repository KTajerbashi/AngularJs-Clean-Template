angular
.module('myApp')
.controller('FormValidationsController', ['$http', function($http) {
  var vm = this;
  
  vm.pageTitle = 'Form Validations Page';
  vm.welcomeMessage = 'Welcome to our AngularJS application!';
  vm.features = [
    'Single Page Application',
    'Node.js Backend',
    'RESTful API',
    'Responsive Design'
  ];
  
  vm.getServerTime = function() {
    alert("A");
    // $http.get('/api/time')
    //   .then(function(response) {
    //     vm.serverTime = response.data.time;
    //   })
    //   .catch(function(error) {
    //     console.error('Error fetching time:', error);
    //   });
  };
}]);