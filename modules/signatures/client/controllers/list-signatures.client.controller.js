(function () {
  'use strict';

  angular
    .module('signatures')
    .controller('SignaturesListController', SignaturesListController);

  SignaturesListController.$inject = ['SignaturesService'];

  function SignaturesListController(SignaturesService) {
    var vm = this;

    vm.signatures = SignaturesService.query();
  }
}());
