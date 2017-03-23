(function () {
  'use strict';

  // Lots controller
  angular
    .module('lots')
    .controller('LotsController', LotsController);

  LotsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'lotResolve'];

  function LotsController ($scope, $state, $window, Authentication, lot) {
    var vm = this;

    vm.authentication = Authentication;
    vm.lot = lot;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Lot
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.lot.$remove($state.go('lots.list'));
      }
    }

    // Save Lot
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.lotForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.lot._id) {
        vm.lot.$update(successCallback, errorCallback);
      } else {
        vm.lot.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('lots.view', {
          lotId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
