(function () {
  'use strict';

  angular
    .module('inventaires')
    .controller('InventairesListController', InventairesListController);

  InventairesListController.$inject = ['$scope', 'InventairesService'];

  function InventairesListController($scope, InventairesService) {
    var vm = this;

    vm.inventaires = InventairesService.query();

    $scope.selected = [];

    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };

    function success(items) {
      $scope.items = [
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'},
        {nom: 'azerty', type: 'azerty', exemple: 'azerty', exemple2: 'azerty', exemple3: 'azerty', exemple4: 'azerty'}
      ];
    }

    $scope.getDesserts = function () {
      $scope.promise = items.get($scope.query, success).$promise;
    };
  }
}());
