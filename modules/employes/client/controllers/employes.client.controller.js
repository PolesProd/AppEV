(function() {
  'use strict';

  angular
    .module('employes')
    .controller('EmployesController', EmployesController);

  EmployesController.$inject = ['$scope', '$state', '$window', 'employeResolve', 'Authentication'];

  function EmployesController($scope, $state, $window, employe, Authentication) {
    var vm = this;

    vm.authentication = Authentication;
    vm.employe = employe;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.disabled = undefined;

    vm.disable = function() {
      vm.disabled = true;
    };

    $scope.types = [
      { name: 'CDI', value: false },
      { name: 'CDD', value: false },
      { name: 'CDDI', value: false },
      { name: 'Renouvelé', value: false },
      { name: 'Licencié', value: false }
    ];

    $scope.responsables = [
      { name: 'Hamid MOUHOUB' },
      { name: 'Marie DEMARSAC' },
      { name: 'Mustafa MALKI' }
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
          employeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());