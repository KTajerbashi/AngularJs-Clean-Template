angular.module('myApp').run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.loading = false;
    });

    $rootScope.$on('$routeChangeError', function () {
        $rootScope.loading = false;
    });
}]);