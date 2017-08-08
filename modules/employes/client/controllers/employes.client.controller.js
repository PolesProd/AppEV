(function () {
  'use strict';
  // employes controller
  angular
  .module('employes')
  .controller('EmployesController', EmployesController);

  EmployesController.$inject= ['$scope', '$state', '$location', '$window', 'Authentication', 'employeResolve', 'TeamsService', 'LotsService'];

  function EmployesController ($scope, $state, $window, $location, Authentication, employe, TeamsService, LotsService) {

    var vm = this;

    vm.authentication = Authentication;
    vm.employe = employe;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.team = TeamsService.query();

    $scope.teams = vm.team;
    $scope.teams.$promise.then(function (resourceArray) {
      $scope.item = [
        { icon: '<img src="https://www.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gender-male2-128.png"/>', name: resourceArray[0].name, ticked: false }
      ];
      // console.log($scope.item);
    });

    $scope.contrats = [
      { name: 'CDI', value: false },
      { name: 'CDD', value: false },
      { name: 'CDDI', value: false },
      { name: 'Renouvelé', value: false },
      { name: 'Licencié', value: false }
    ];




    // Remove existing employe
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.employe.$remove($state.go('employes.list'));
      }
    }

    // Save employe
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.employeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.employe._id) {
        vm.employe.$update(successCallback, errorCallback);
      } else {
        vm.employe.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('employes.view', {
          employeId: res._id,
        });
      }

      function errorCallback(res) {
        vm.error= res.data.message;
      }
    }
  }
}());
