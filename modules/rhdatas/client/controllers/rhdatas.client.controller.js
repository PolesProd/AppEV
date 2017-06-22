(function () {
  'use strict';

  // Rhdatas controller
  angular
    .module('rhdatas')
    .controller('RhdatasController', RhdatasController);

  RhdatasController.$inject = ['$scope', '$state', '$window', 'Authentication', 'rhdataResolve'];

  function RhdatasController ($scope, $state, $window, Authentication, rhdata) {
    var vm = this;

    vm.authentication = Authentication;
    vm.rhdata = rhdata;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Rhdata
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.rhdata.$remove($state.go('rhdatas.list'));
      }
    }

    // Save Rhdata
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.rhdataForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.rhdata._id) {
        vm.rhdata.$update(successCallback, errorCallback);
      } else {
        vm.rhdata.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('rhdatas.view', {
          rhdataId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
