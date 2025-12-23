angular.module("myApp").controller("FileUploaderController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    var vm = this;

    vm.afterUpload = function(file, response){
        console.log("فایل آپلود شد:", file);
        console.log("Response from server:", response);
        // اینجا می‌توانید هر عملیاتی بعد از آپلود انجام دهید
    };
  },
]);
