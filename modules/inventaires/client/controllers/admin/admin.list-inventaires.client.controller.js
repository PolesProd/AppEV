(function () {
  'use strict';

  angular
    .module('inventaires.admin')
    .controller('InventairesAdminListController', InventairesAdminListController);

  InventairesAdminListController.$inject = ['InventairesService'];

  function InventairesAdminListController(InventairesService) {
    var vm = this;

    vm.inventaires = InventairesService.query();
  }
}());
