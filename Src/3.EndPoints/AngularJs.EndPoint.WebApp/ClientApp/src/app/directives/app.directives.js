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
            $http
              .delete(scope.deleteUrl + "/" + scope.file.id)
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

          $http
            .post(scope.uploadUrl, formData, {
              headers: { "Content-Type": undefined },
              transformRequest: angular.identity,
              uploadEventHandlers: {
                progress: function (e) {
                  if (e.lengthComputable) {
                    $timeout(function () {
                      scope.file.progress = Math.round(
                        (e.loaded / e.total) * 100
                      );
                    });
                  }
                },
              },
            })
            .then(
              function (res) {
                scope.file.id = res.data.id;
                scope.file.url = res.data.url;
                scope.file.file = null;
                scope.file.progress = null;

                alert("آپلود شد: " + scope.file.name);

                // اجرای callback بعد از آپلود موفق
                if (scope.onComplete) {
                  scope.onComplete({ file: scope.file, response: res.data });
                }
              },
              function () {
                alert("آپلود انجام نشد");
              }
            );
        };
      },
    };
  });

app.directive(
  "fileManager",
  function ($rootScope, $http, apiService, $timeout) {
    return {
      restrict: "E",
      replace: true,
      require: "ngModel",
      templateUrl: "/app/templates/fileManager.tpl.html?ver=" + ver,
      scope: {
        model: "=ngModel",
        ngEntityName: "=",
        ngEntityId: "=",
        ngMethodName: "=",
        onComplete: "&",
        ngArchive: "@",
        ngSaveEntity: "@",
        ngStorage: "=",
        ngTitle: "@",
        ngRemoveMethod: "@",
        folder: "@",
        allow: "@",
      },

      link: function ($scope, element, attrs, ngModelCtrl) {
        /* ---------------- INIT ---------------- */

        $scope.id = Math.floor(Math.random() * 10000);
        $scope.progress = 0;
        $scope.progressVisible = false;

        $scope.fileUploaderTitle = $scope.ngTitle || "آپلود فایل";

        $scope.options = {
          isUploaded: false,
          isImage: false,
          isExcel: false,
          isFile: false,
        };

        const emptyModel = {
          id: 0,
          fileName: null,
          filePath: null,
          fileType: null,
          fileSize: null,
        };

        if (!$scope.model) {
          $scope.model = angular.copy(emptyModel);
        }

        /* ---------------- URL HELPERS ---------------- */

        const uploadUrl = () => {
          return $scope.ngArchive === "true" || $scope.ngStorage === "archive"
            ? `/api/AttachmentFile/UploadFileToArchive?folderName=${$scope.folder}`
            : `/api/AttachmentFile/UploadFileToSystem?folderName=${$scope.folder}`;
        };

        const removeMethod = () => $scope.ngRemoveMethod || "RemoveAttachment";

        const service = new apiService($scope.ngEntityName);

        /* ---------------- FILE TYPE ---------------- */

        function detectFileType(file) {
          $scope.options = {
            isUploaded: true,
            isImage: false,
            isExcel: false,
            isFile: false,
          };

          if (!file) return;

          if (
            file.fileType?.includes("image") ||
            file.type?.includes("image")
          ) {
            $scope.options.isImage = true;
          } else if (file.fileName?.endsWith(".xlsx")) {
            $scope.options.isExcel = true;
          } else {
            $scope.options.isFile = true;
          }
        }

        /* ---------------- UIKIT UPLOADER ---------------- */

        let uploader;

        function initUploader() {
          destroyUploader();

          const settings = {
            action: uploadUrl(),
            allow: $scope.allow || "*.*",

            loadstart: function () {
              $timeout(() => {
                $scope.progressVisible = true;
                $scope.progress = 0;
              });
            },

            progress: function (percent) {
              $timeout(() => {
                $scope.progress = Math.ceil(percent);
              });
            },

            allcomplete: function (response) {
              $timeout(() => handleUploadComplete(JSON.parse(response)));
            },
          };

          const input = element[0].querySelector(`#FileUploader-${$scope.id}`);
          const drop = element[0].querySelector(
            `#FileUploaderDrop-${$scope.id}`
          );

          if (input) uploader = UIkit.uploadSelect(input, settings);
          if (drop) UIkit.uploadDrop(drop, settings);
        }

        function destroyUploader() {
          if (uploader && uploader.abort) {
            uploader.abort();
          }
          uploader = null;
        }

        /* ---------------- UPLOAD COMPLETE ---------------- */

        function handleUploadComplete(res) {
          $scope.progressVisible = false;

          if (!res.success) {
            $rootScope.fnError("آپلود فایل ناموفق بود");
            return;
          }

          const data = res.data;

          angular.extend($scope.model, {
            id: data.id,
            fileName: data.fileName,
            filePath: data.filePath,
            fileSize: data.fileSize,
            fileType: data.fileType,
          });

          detectFileType($scope.model);

          if ($scope.ngSaveEntity === "true") {
            const method = $scope.ngMethodName || "UploadAttachment";

            service
              .put(method, {
                id: $scope.ngEntityId,
                attachmentId: data.id,
              })
              .then(() => {
                $scope.onComplete?.({ model: $scope.model, result: data });
                $rootScope.fnSuccess("آپلود فایل با موفقیت انجام شد");
              });
          } else {
            $scope.onComplete?.({ model: $scope.model, result: data });
            $rootScope.fnSuccess("آپلود فایل با موفقیت انجام شد");
          }
        }

        /* ---------------- REMOVE FILE ---------------- */

        $scope.clearFile = function () {
          if (!$scope.model.id) return;

          service
            .put(removeMethod(), {
              id: $scope.ngEntityId,
              attachmentId: $scope.model.id,
            })
            .then(() => {
              angular.copy(emptyModel, $scope.model);
              $scope.options.isUploaded = false;
              initUploader();
            });
        };

        /* ---------------- WATCH MODEL ---------------- */

        $scope.$watch("model.id", function (val) {
          if (val > 0) {
            detectFileType($scope.model);
          }
        });

        /* ---------------- START ---------------- */

        $timeout(initUploader, 100);

        /* ---------------- DESTROY ---------------- */

        $scope.$on("$destroy", destroyUploader);
      },
    };
  }
);
