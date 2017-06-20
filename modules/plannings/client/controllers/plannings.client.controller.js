(function () {
  'use strict';

  // Plannings controller
  angular
    .module('plannings')
    .controller('PlanningsController', PlanningsController);

  PlanningsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'planningResolve', 'TeamsService'];

  function PlanningsController ($scope, $state, $window, Authentication, planning, TeamsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.planning = planning;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Planning
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.planning.$remove($state.go('plannings.list'));
      }
    }

    // Save Planning
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.planningForm');
        return false;
      }

      vm.format = 'dd-MM-yyyy';
      vm.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        vm.opened = {};
        vm.opened[$event.target.id] = true;

        // log this to check if its setting the log
        console.log(vm.opened);
      };

      

      // TODO: move create/update logic to service
      if (vm.planning._id) {
        vm.planning.$update(successCallback, errorCallback);
      } else {
        vm.planning.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('plannings.view', {
          planningId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
