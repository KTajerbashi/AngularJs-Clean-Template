angular.module('myApp').controller('ContactController', ['$http', function ($http) {
    var vm = this;

    vm.pageTitle = 'Contact Us';
    vm.contactInfo = {
        email: 'info@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, City, State 12345'
    };

    vm.contactForm = {
        name: '',
        email: '',
        message: ''
    };

    vm.submitForm = function () {
        alert("Submit")
        if (vm.contactForm.name && vm.contactForm.email && vm.contactForm.message) {
            //   $http.post('/api/contact', vm.contactForm)
            //     .then(function(response) {
            //       vm.successMessage = 'Thank you for your message!';
            //       vm.contactForm = { name: '', email: '', message: '' };
            //     })
            //     .catch(function(error) {
            //       vm.errorMessage = 'There was an error sending your message.';
            //     });
        }
    };
}]);