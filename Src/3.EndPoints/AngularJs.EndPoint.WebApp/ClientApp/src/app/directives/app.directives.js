// Custom directive for password confirmation validation
angular
  .module("myApp")
  .directive("compareTo", function () {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo",
      },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$validators.compareTo = function (modelValue) {
          return modelValue === scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function () {
          ngModel.$validate();
        });
      },
    };
  })
  .directive("singleFileUploader", function ($http, $timeout) {
  return {
    restrict: "E",
    scope: {
      file: "=",
      onComplete: "&",
      uploadUrl: "@",
      deleteUrl: "@",
      maxSize: "@", // مگابایت
      allowedTypes: "@", // comma separated
    },
    templateUrl: "app/directives/templates/template.view.html",
    link: function (scope, element) {
      var input = element.find("input");
      var allowedTypes = scope.allowedTypes
        ? scope.allowedTypes.split(",")
        : [];

      // انتخاب فایل
      input.on("change", function (e) {
        var f = e.target.files[0];
        if (!f) return;

        $timeout(function () {
          // Validation
          if (allowedTypes.length && allowedTypes.indexOf(f.type) === -1) {
            alert("نوع فایل مجاز نیست: " + f.name);
            return;
          }
          if (scope.maxSize && f.size > scope.maxSize * 1024 * 1024) {
            alert("حجم فایل بیشتر از حد مجاز است: " + f.name);
            return;
          }

          // set file
          scope.file = { file: f, name: f.name, size: f.size, progress: 0 };

          // پیش‌نمایش تصویر
          if (f.type.startsWith("image/")) {
            var reader = new FileReader();
            reader.onload = function (ev) {
              $timeout(function () {
                scope.file.preview = ev.target.result;
              });
            };
            reader.readAsDataURL(f);
          } else if (f.type.includes("excel")) {
            scope.file.preview = "📊 فایل Excel";
          } else if (f.type === "text/plain") {
            scope.file.preview = "📄 فایل متنی";
          } else if (f.type === "application/pdf") {
            scope.file.preview = "📄 فایل PDF";
          } else {
            scope.file.preview = "📁 فایل";
          }

          // Reset input so the same file can be re-selected
          e.target.value = "";
        });
      });

      // حذف فایل
      scope.remove = function () {
        if (scope.file && scope.file.id && scope.deleteUrl) {
          $http.delete(scope.deleteUrl + "/" + scope.file.id)
            .catch(function () {
              alert("حذف فایل با مشکل مواجه شد!");
            });
        }
        scope.file = null;
        input.val(null);
      };

      // آپلود فایل
      scope.upload = function () {
        if (!scope.file || !scope.file.file) return;

        var formData = new FormData();
        formData.append("file", scope.file.file);

        $http.post(scope.uploadUrl, formData, {
          headers: { "Content-Type": undefined },
          transformRequest: angular.identity,
          uploadEventHandlers: {
            progress: function (e) {
              if (e.lengthComputable) {
                $timeout(function () {
                  scope.file.progress = Math.round((e.loaded / e.total) * 100);
                });
              }
            }
          }
        }).then(function (res) {
          scope.file.id = res.data.id;
          scope.file.url = res.data.url;
          scope.file.file = null;
          scope.file.progress = null;

          alert("آپلود شد: " + scope.file.name);

          // اجرای callback بعد از آپلود موفق
          if (scope.onComplete) {
            scope.onComplete({ file: scope.file, response: res.data });
          }
        }, function () {
          alert("آپلود انجام نشد");
        });
      };
    }
  };
});
