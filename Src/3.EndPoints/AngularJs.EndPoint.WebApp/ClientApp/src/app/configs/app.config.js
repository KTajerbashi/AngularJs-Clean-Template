angular.module('myApp')
  .config(['$routeProvider', '$controllerProvider', '$provide', '$compileProvider',
    function ($routeProvider, $controllerProvider, $provide, $compileProvider) {

      // Enable HTML5 mode for clean URLs (remove the '#' from URL)
      // Note: This requires server-side configuration for deep links
      // $locationProvider.html5Mode(true);

      // Register providers for later use
      var app = angular.module('myApp');
      app.controller = $controllerProvider.register;
      app.service = $provide.service;
      app.factory = $provide.factory;
      app.directive = $compileProvider.directive;

      $routeProvider
        // .when('/home', {
        //   templateUrl: 'app/pages/dashboard/home/home.view.html',
        //   controller: 'HomeController',
        //   controllerAs: 'vm',
        //   css: 'app/pages/dashboard/home/home.style.css'
        // })
        // .when('/about', {
        //   templateUrl: 'app/pages/dashboard/about/about.view.html',
        //   controller: 'AboutController',
        //   controllerAs: 'vm',
        //   css: 'app/pages/dashboard/about/about.style.css'
        // })
        // .when('/contact', {
        //   templateUrl: 'app/pages/dashboard/contact/contact.view.html',
        //   controller: 'ContactController',
        //   controllerAs: 'vm',
        //   css: 'app/pages/dashboard/contact/contact.style.css'
        // })
        // .when('/forms', {
        //   templateUrl: 'app/pages/common/forms/forms.view.html',
        //   controller: 'FormsController',
        //   controllerAs: 'vm',
        //   css: 'app/pages/common/forms/forms.style.css'
        // })
        // .when('/form-validations', {
        //   templateUrl: 'app/pages/common/formValidations/formValidations.view.html',
        //   controller: 'FormValidationsController',
        //   controllerAs: 'vm',
        //   css: 'app/pages/common/formValidations/formValidations.style.css'
        // })
        // .when('/forms', {
        //   templateUrl: 'app/pages/common/forms/forms.view.html',
        //   controller: 'FormsController',
        //   controllerAs: 'vm',
        //   resolve: {
        //     load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
        //       return $ocLazyLoad.load({
        //         name: 'myApp',
        //         files: [
        //           'app/pages/common/forms/forms.controller.js',
        //           'app/pages/common/forms/forms.style.css'
        //         ]
        //       });
        //     }]
        //   }
        // })
        // .when('/form-validations', {
        //   templateUrl: 'app/pages/common/formValidations/formValidations.view.html',
        //   controller: 'FormValidationsController',
        //   controllerAs: 'vm',
        //   resolve: {
        //     load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
        //       return $ocLazyLoad.load({
        //         name: 'myApp',
        //         files: [
        //           'app/pages/common/formValidations/formValidations.controller.js',
        //           'app/pages/common/formValidations/formValidations.style.css'
        //         ]
        //       });
        //     }]
        //   }
        // })
        
        .when('/home', {
          templateUrl: 'app/pages/dashboard/home/home.view.html',
          controller: 'HomeController',
          controllerAs: 'vm',
          resolve: {
            load: ['$q', '$rootScope', function ($q, $rootScope) {
              var deferred = $q.defer();
              // Load dependencies for home if needed
              deferred.resolve();
              return deferred.promise;
            }]
          }
        })
        .when('/about', {
          templateUrl: 'app/pages/dashboard/about/about.view.html',
          controller: 'AboutController',
          controllerAs: 'vm',
          resolve: {
            load: ['$q', '$rootScope', function ($q, $rootScope) {
              var deferred = $q.defer();
              // Load dependencies for home if needed
              deferred.resolve();
              return deferred.promise;
            }]
          }
        })
        .when('/contact', {
          templateUrl: 'app/pages/dashboard/contact/contact.view.html',
          controller: 'ContactController',
          controllerAs: 'vm',
          resolve: {
            load: ['$q', '$rootScope', function ($q, $rootScope) {
              var deferred = $q.defer();
              // Load dependencies for home if needed
              deferred.resolve();
              return deferred.promise;
            }]
          }
        })

        .when('/forms', {
          templateUrl: 'app/pages/common/forms/forms.view.html',
          controller: 'FormsController',
          controllerAs: 'vm',
          resolve: {
            // load: ['$ocLazyLoad', function ($ocLazyLoad) {
            //   return $ocLazyLoad.load([
            //     'app/pages/common/forms/forms.controller.js',
            //     'app/pages/common/forms/forms.style.css'
            //   ]);
            // }]
            load: ['$q', '$rootScope', function ($q, $rootScope) {
              var deferred = $q.defer();
              // Load dependencies for home if needed
              deferred.resolve();
              return deferred.promise;
            }]
          }
        })
        .when('/form-validations', {
          templateUrl: 'app/pages/common/formValidations/formValidations.view.html',
          controller: 'FormValidationsController',
          controllerAs: 'vm',
          resolve: {
            // load: ['$ocLazyLoad', function ($ocLazyLoad) {
            //   return $ocLazyLoad.load([
            //     'app/pages/common/formValidations/formValidations.controller.js',
            //     'app/pages/common/formValidations/formValidations.style.css'
            //   ]);
            // }]
            load: ['$q', '$rootScope', function ($q, $rootScope) {
              var deferred = $q.defer();
              // Load dependencies for home if needed
              deferred.resolve();
              return deferred.promise;
            }]
          }
        })

        .otherwise({
          redirectTo: '/home'
        });
    }]);

// Make app registry available globally
var app = angular.module('myApp');