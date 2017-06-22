(function () {
  'use strict';

  angular
    .module('rhdatas')
    .controller('RhdatasListController', RhdatasListController);

  RhdatasListController.$inject = ['RhdatasService'];

  function RhdatasListController(RhdatasService) {
    var vm = this;

    vm.rhdatas = RhdatasService.query();
  }
}());
