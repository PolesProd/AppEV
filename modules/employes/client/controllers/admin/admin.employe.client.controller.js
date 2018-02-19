(function () {
  'use strict';

  angular
    .module('employes.admin')
    .controller('EmployesAdminController', EmployesAdminController);

  EmployesAdminController.$inject = ['$scope', '$state', '$window', '$element', 'employeResolve', 'Authentication', 'Notification'];

  function EmployesAdminController($scope, $state, $window, $element, employe, Authentication, Notification) {
    var vm = this;

    vm.employe = employe;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.myDate = new Date();
    vm.isOpen = false;

    $scope.responsables = ['Hamid Mouhoub', 'Marie Demarsac', 'Mustafa Malki'];
    $scope.types = ['CDI', 'CDD', 'CDDI' , 'Renouvelé' , 'Licencié'];
    $scope.dates = new Date();

    $scope.searchTerm;
    $scope.clearSearchTerm = function() {
      $scope.searchTerm = '';
    };

    // The md-select directive eats keydown events for some quick select
    // logic. Since we have a search input here, we don't need that logic.
    $element.find('input').on('keydown', function(ev) {
      ev.stopPropagation();
    });

    // Remove existing Employe
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.employe.$remove(function () {
          $state.go('admin.employes.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Employe deleted successfully!' });
        });
      }
    }

    // Save Employe
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.employeForm');
        return false;
      }

      // Create a new employe, or update the current instance
      vm.employe.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.employes.list'); // should we send the User to the list or the updated Employe's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Employe saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Employe save error!' });
      }
    }
  }
}());
