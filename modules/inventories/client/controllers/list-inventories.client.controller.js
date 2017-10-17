(function () {
  'use strict';

  angular
  .module('inventories')
  .controller('InventoriesListController', InventoriesListController);

  InventoriesListController.$inject = ['$scope', '$location', 'InventoriesService'];

  function InventoriesListController($scope, $location, InventoriesService) {
    var vm = this;

    vm.inventories = InventoriesService.query();

    $scope.rowCollection = [];
    $scope.rowCollection = vm.inventories;
    $scope.rowCollection.$promise.then(function() {
      var test = angular.forEach($scope.allPlannings, function(data) {
        $scope.item = [{
          id: data._id,
          filter: data.filter,
          name: data.name,
          model: data.model,
          quantity: data.quantity
        }];
      });
      console.log(test);
    });
  }
}());
