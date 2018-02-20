(function () {
  'use strict';

  angular
    .module('equipes.admin')
    .controller('EquipesAdminController', EquipesAdminController);

  EquipesAdminController.$inject = ['$scope', '$state', '$window', 'equipeResolve', 'Authentication', 'Notification', 'SitesService', 'EmployesService'];

  function EquipesAdminController($scope, $state, $window, equipe, Authentication, Notification, SitesService, EmployesService) {
    var vm = this;

    vm.equipe = equipe;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.types = [
      { name: 'La Caravelle' },
      { name: 'Villeneuve-la-garenne' }
    ];

    $scope.responsables = ['Hamid Mouhoub', 'Marie Demarsac', 'Mustafa Malki'];
    $scope.sites = SitesService.query();
    $scope.employes = EmployesService.query();

    // Remove existing Equipe
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.equipe.$remove(function () {
          $state.go('admin.equipes.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Equipe deleted successfully!' });
        });
      }
    }

    // Save Equipe
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.equipeForm');
        return false;
      }

      // Create a new equipe, or update the current instance
      vm.equipe.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.equipes.list'); // should we send the User to the list or the updated Equipe's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Equipe saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Equipe save error!' });
      }
    }
  }
}());
