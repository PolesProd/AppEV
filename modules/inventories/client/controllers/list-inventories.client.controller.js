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
    $scope.rowCollection.$promise.then(function(resourceArray) {
      $scope.item = [
        { filter: resourceArray[0].filter, name: resourceArray[0].name, model: resourceArray[0].model, quantity: resourceArray[0].quantity }
      ];
    });
    
    console.log($scope.rowCollection);
  }
}());
