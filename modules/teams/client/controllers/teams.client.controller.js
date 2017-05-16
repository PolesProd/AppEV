(function () {
  'use strict';

  // Teams controller
  angular
    .module('teams')
    .controller('TeamsController', TeamsController);

  TeamsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'teamResolve'];

  function TeamsController ($scope, $state, $window, Authentication, team) {
    var vm = this;

    vm.authentication = Authentication;
    vm.team = team;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Team
    function remove() {
      if ($window.confirm('Etes-vous sûr que vous voulez supprimer?')) {
        vm.team.$remove($state.go('teams.list'));
      }
    }

    // Save Team
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.teamForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.team._id) {
        vm.team.$update(successCallback, errorCallback);
      } else {
        vm.team.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('teams.view', {
          teamId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    $scope.sites = [
      { name: 'Employer 1', id: 1 },
      { name: 'Employer 2', id: 2 },
      { name: 'Employer 3', id: 3 },
      { name: 'Employer 4', id: 4 },
      { name: 'Employer 5', id: 5 }
    ];
    $scope.employee.find();
  }
}());
