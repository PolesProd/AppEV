(function () {
  'use strict';

  // Finances controller
  angular
    .module('finances')
    .controller('FinancesController', FinancesController);

  FinancesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'financeResolve'];

  function FinancesController ($scope, $state, $window, Authentication, finance) {
    var vm = this;

    vm.authentication = Authentication;
    vm.finance = finance;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Finance
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.finance.$remove($state.go('finances.list'));
      }
    }

    // Save Finance
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.financeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.finance._id) {
        vm.finance.$update(successCallback, errorCallback);
      } else {
        vm.finance.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('finances.view', {
          financeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
