(function () {
  'use strict';

  angular
    .module('lots')
    .controller('LotsListController', LotsListController);

  LotsListController.$inject = ['LotsService'];

  function LotsListController(LotsService) {
    var vm = this;

    vm.lots = LotsService.query();
  }
}());
