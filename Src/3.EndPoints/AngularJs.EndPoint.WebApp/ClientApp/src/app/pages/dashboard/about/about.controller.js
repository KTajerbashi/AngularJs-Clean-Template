angular.module('myApp').controller('AboutController', [function() {
  var vm = this;
  
  vm.pageTitle = 'About Us';
  vm.description = 'This is a sample AngularJS application with Node.js backend.';
  vm.team = [
    { name: 'John Doe', role: 'Developer' },
    { name: 'Jane Smith', role: 'Designer' },
    { name: 'Mike Johnson', role: 'Project Manager' }
  ];
}]);