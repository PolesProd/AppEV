(function () {
  'use strict';

  // Inventories controller
  angular
    .module('inventories')
    .controller('InventoriesController', InventoriesController);

  InventoriesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'inventoryResolve'];

  function InventoriesController ($scope, $state, $window, Authentication, inventory) {
    var vm = this;

    vm.authentication = Authentication;
    vm.inventory = inventory;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    $scope.filters = [
      { name: 'Équipements' },
      { name: 'Outillages' },
      { name: 'Véhicules' }
    ];

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
      var index = $scope.rowCollection.indexOf(row);
      if (index !== -1) {
        $scope.rowCollection.splice(index, 1);
      }
    };

    // Remove existing Inventory
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.inventory.$remove($state.go('inventories.list'));
      }
    }

    // Save Inventory
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.inventoryForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.inventory._id) {
        vm.inventory.$update(successCallback, errorCallback);
      } else {
        vm.inventory.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('inventories.list', {
          inventoryId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
