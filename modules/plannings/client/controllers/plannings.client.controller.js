(function () {
  'use strict';

  // Plannings controller
  angular
    .module('plannings')
    .controller('PlanningsController', PlanningsController);

  PlanningsController.$inject = ['$scope', '$state', '$window', '$location', 'Authentication', 'planningResolve', 'TeamsService', 'LotsService'];

  function PlanningsController ($scope, $state, $window, $location, Authentication, planning, TeamsService, LotsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.planning = planning;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.team = TeamsService.query();
    vm.site = LotsService.query();

    $scope.teamsList = vm.team;
    $scope.teamsList.$promise.then(function (resourceArray) {
      $scope.team = [{
        name: resourceArray[0].name, ticked: false
      }];
    });

    $scope.sitesList = vm.site;
    $scope.sitesList.$promise.then(function (resourceArray) {
      $scope.site = [
        { name: resourceArray[0].properties.nom, ticked: false }
      ];
    });

    $scope.taskList = [
      { name: 'Tonte des pelouses' },
      { name: 'Taille des arbustes' },
      { name: 'Nettoyage des aires stabiisées' },
      { name: 'Ramassage des feuilles, branches et brindilles' },
      { name: 'Entretien des massifs d\'arbustes et vivaces' },
      { name: 'Désherbage des massifs d\'arbustes, vivaces et pieds des arbres' },
      { name: 'Taille des haies' },
      { name: 'Nettoyage des fleurs fanées, plantes vivaces et branches morte' },
      { name: 'Désherbage des massifs d\'arbustes, vivaces, pieds des arbres et des parties minérales' }
    ];

    $scope.finition = [
      { name: 'Rustique' },
      { name: 'Naturel' },
      { name: 'Prestige' }
    ];

    $scope.frequence = [
      
    ];

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
        $state.go('plannings.list', {
          planningId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
