angular.module('myApp')
    // Custom filter for phone number formatting (optional)
    .filter('phoneFormat', function () {
        return function (phone) {
            if (!phone) return '';
            // Simple phone formatting - you can customize this
            var cleaned = ('' + phone).replace(/\D/g, '');
            var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3];
            }
            return phone;
        };
    });