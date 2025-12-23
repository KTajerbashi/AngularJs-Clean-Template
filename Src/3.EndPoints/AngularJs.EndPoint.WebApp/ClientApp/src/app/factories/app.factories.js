angular.module('myApp').factory('LazyLoadService', ['$ocLazyLoad', '$q',
  function($ocLazyLoad, $q) {
    
    var loadedModules = {};
    
    return {
      loadModule: function(moduleName, files) {
        if (loadedModules[moduleName]) {
          return $q.when(true);
        }
        
        return $ocLazyLoad.load({
          name: moduleName,
          files: files
        }).then(function() {
          loadedModules[moduleName] = true;
          return true;
        });
      },
      
      loadController: function(controllerName, files) {
        return $ocLazyLoad.load({
          files: files
        });
      },
      
      loadDashboard: function() {
        return this.loadModule('dashboard', [
          'app/pages/dashboard/dashboard.module.js',
          'app/pages/dashboard/dashboard.controller.js',
          'app/pages/dashboard/dashboard.style.css'
        ]);
      },
      
      loadSecurity: function() {
        return this.loadModule('security', [
          'app/pages/dashboard/security/security.module.js',
          'app/pages/dashboard/security/security.controller.js',
          'app/pages/dashboard/security/security.service.js'
        ]);
      }
    };
  }]);
