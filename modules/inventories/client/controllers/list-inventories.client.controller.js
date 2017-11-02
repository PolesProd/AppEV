(function () {
  'use strict';

  angular
    .module('inventories')
    .controller('InventoriesListController', InventoriesListController);

  InventoriesListController.$inject = ['$scope', 'InventoriesService'];

  function InventoriesListController($scope, InventoriesService) {
    var vm = this;

    vm.inventories = InventoriesService.query();

    $scope.items = vm.inventories;
    $scope.items.$promise.then(function(resourceArray) {
    	$scope.item = [
    		{
    			name: resourceArray[0].name,
    			purchase_date: resourceArray[0].purchase_date,
    			place_of_purchase: resourceArray[0].place_of_purchase,
    			warenty: resourceArray[0].warenty,
    			serial_number: resourceArray[0].serial_number,
    			category: resourceArray[0].category,
    			quantity: resourceArray[0].quantity,
    			model: resourceArray[0].model
    		}
    	];
    });
  }
}());
