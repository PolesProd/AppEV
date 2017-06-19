(function () {
  'use strict';

  angular
    .module('finances')
    .controller('FinancesListController', FinancesListController);

  FinancesListController.$inject = ['FinancesService'];

  function FinancesListController(FinancesService) {
    var vm = this;

    vm.finances = FinancesService.query();
  }
}());
