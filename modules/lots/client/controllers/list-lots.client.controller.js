(function () {
  'use strict';

  angular
  .module('lots')
  .controller('LotsListController', LotsListController);

  LotsListController.$inject = ['$scope', '$http', 'LotsService'];

  function LotsListController($scope, $http, LotsService) {
    var vm = this;

    vm.lots = LotsService.query();
  }
}());
