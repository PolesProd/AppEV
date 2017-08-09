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
        { icon: '<img src="../modules/plannings/client/img/tondeuse.jpg"/>', name: resourceArray[0].properties.nom, ticked: false }
      ];
      $scope.outputList = [
        { icon: '<img src="../modules/plannings/client/img/tondeuse.jpg"/>', name: resourceArray[0].properties.nom, ticked: true }
      ];
    });

    $scope.tasksList = [
      { icon: '<img src="../modules/plannings/client/img/tondeuse.jpg"/>', name: 'Tonte(rustique)', frequence: 1, ticked: false },
      { icon: '<img src="../modules/plannings/client/img/tondeuse.jpg"/>', name: 'Tonte(medium)', frequence: 2, ticked: false },
      { icon: '<img src="../modules/plannings/client/img/tondeuse.jpg"/>', name: 'Tonte(prestige)', frequence: 3, ticked: false },
      { icon: '<img src="../modules/plannings/client/img/brouette.jpg"/>', name: 'Ramassage(feuilles)', frequence: 3, ticked: false },
      { icon: '<img src="../modules/plannings/client/img/plantage.png"/>', name: 'Plantage(fleurs)', frequence: 1, ticked: false },
      { icon: '<img src="../modules/plannings/client/img/plantage.png"/>', name: 'Plantage(légumes)', frequence: 5, ticked: false },
      { icon: '<img src="../modules/plannings/client/img/elagage.jpg"/>', name: 'Désherbage(rustique)', frequence: 1, ticked: false },
      { icon: '<img src="../modules/plannings/client/img/elagage.jpg"/>', name: 'Désherbage(medium)', frequence: 4, ticked: false },
      { icon: '<img src="../modules/plannings/client/img/elagage.jpg"/>', name: 'Désherbage(prestige)', frequence: 12, ticked: false },
      { icon: '<img src="../modules/plannings/client/img/taillage.jpg"/>', name: 'Taille(Haies)', frequence: 4, ticked: false },
      { icon: '<img src="../modules/plannings/client/img/taillage.jpg"/>', name: 'Taille(arbres)', frequence: 2, ticked: false },
      { icon: '<img src="../modules/plannings/client/img/bordure.png"/>', name: 'Bordure(trottoirs)', frequence: 1, ticked: false },
      { icon: '<img src="../modules/plannings/client/img/bordure.png"/>', name: 'Bordure(parcs)', frequence: 12, ticked: false }
    ];
    // console.log($scope.tasksList);

    $scope.localLang = {
      selectAll: 'Tous séléctionné',
      selectNone: 'Déselectionné',
      reset: 'Reset',
      search: 'Chercher',
      nothingSelected: 'Selectionner'
    };

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
