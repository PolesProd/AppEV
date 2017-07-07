(function () {
  'use strict';

  // Plannings controller
  angular
    .module('plannings')
    .controller('PlanningsController', PlanningsController);

  PlanningsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'planningResolve', 'TeamsService', 'LotsService'];

  function PlanningsController ($scope, $state, $window, Authentication, planning, TeamsService, LotsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.planning = planning;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.team = TeamsService.query();
    vm.site = LotsService.query();

    $scope.teams = vm.team;
    $scope.teams.$promise.then(function (resourceArray) {
      $scope.item = resourceArray[0];
    });

    $scope.sites = vm.site;
    $scope.sites.$promise.then(function (resourceArray) {
      $scope.item = resourceArray[0];
    });

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
