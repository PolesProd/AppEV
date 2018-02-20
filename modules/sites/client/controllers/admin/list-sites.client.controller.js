(function () {
  'use strict';

  angular
    .module('sites.admin')
    .controller('SitesAdminListController', SitesAdminListController);

  SitesAdminListController.$inject = ['SitesService'];

  function SitesAdminListController(SitesService) {
    var vm = this;

    vm.sites = SitesService.query();
  }
}());
