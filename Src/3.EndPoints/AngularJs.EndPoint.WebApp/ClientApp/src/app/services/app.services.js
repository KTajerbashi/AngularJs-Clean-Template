angular.module('myApp').service('cssInjector', ['$document', 
function($document) {
  this.inject = function(cssUrl) {
    var head = $document.find('head');
    var link = $document[0].createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssUrl;
    head.append(link);
  };
  
  this.removeAll = function() {
    // var links = $document.find('link[rel="stylesheet"]');
    // links.each(function() {
    //   var link = angular.element(this);
    //   if (link.attr('href').indexOf('app/pages/') !== -1) {
    //     link.remove();
    //   }
    // });
  };
}]);