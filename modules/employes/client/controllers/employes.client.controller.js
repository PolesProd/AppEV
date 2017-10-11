(function () {
  'use strict';
  // employes controller
  angular
  .module('employes')
  .controller('EmployesController', EmployesController)
  .controller('ChangeProfilePictureController', ChangeProfilePictureController);

  EmployesController.$inject = ['$scope', '$state', '$location', '$window', 'Authentication', 'employeResolve', 'TeamsService', 'LotsService'];
  ChangeProfilePictureController.$inject = ['$scope', '$timeout', '$window', 'Authentication', 'FileUploader'];

  function EmployesController ($scope, $state, $window, $location, Authentication, employe, TeamsService, LotsService) {

    var vm = this;

    vm.authentication = Authentication;
    vm.employe = employe;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.team = TeamsService.query();

    $scope.teams = vm.team;
    $scope.teams.$promise.then(function (resourceArray) {
      $scope.item = [
        { name: resourceArray[0].name, ticked: false }
      ];
      // console.log($scope.item);
    });

    $scope.contrats = [
      { name: 'CDI', value: false },
      { name: 'CDD', value: false },
      { name: 'CDDI', value: false },
      { name: 'Renouvelé', value: false },
      { name: 'Licencié', value: false }
    ];

    $scope.status = [
      { name: 'Encadrant', value: false },
      { name: 'Chef d\'équipe', value: false },
      { name: 'Ouvrier', value: false }
    ];


    // Remove existing employe
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.employe.$remove($state.go('employes.list'));
      }
    }

    // Save employe
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.employeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.employe._id) {
        vm.employe.$update(successCallback, errorCallback);
      } else {
        vm.employe.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('employes.view', {
          employeId: res._id,
        });
      }

      function errorCallback(res) {
        vm.error= res.data.message;
      }
    }
  }

  function ChangeProfilePictureController($scope, $timeout, $window, Authentication, FileUploader) {
    
    $scope.employe = Authentication.employe;
    $scope.imageURL = $scope.employe.profileImageURL;

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/employes/:employeId/edit',
      alias: 'newProfilePicture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the employe selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the employe has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate employe object
      $scope.employe = Authentication.employe = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the employe has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change employe profile picture
    $scope.uploadProfilePicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.employe.profileImageURL;
    };
  }
}());
