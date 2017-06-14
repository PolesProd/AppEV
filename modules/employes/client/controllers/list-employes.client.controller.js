(function () {
  'use strict';

  angular
    .module('employes')
    .controller('EmployesListController', EmployesListController);

  EmployesListController.$inject = ['EmployesService'];

  function EmployesListController(EmployesService) {
    var vm = this;

    vm.employes = EmployesService.query();
  }
}());
