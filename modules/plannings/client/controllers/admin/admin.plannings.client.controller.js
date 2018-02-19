(function () {
  'use strict';

  angular
    .module('plannings.admin')
    .controller('PlanningsAdminController', PlanningsAdminController);

  PlanningsAdminController.$inject = ['$scope', '$state', '$window', 'planningResolve', 'Authentication', 'Notification', 'EquipesService', 'SitesService', 'alert', 'calendarConfig'];

  function PlanningsAdminController($scope, $state, $window, planning, Authentication, Notification, EquipesService, SitesService, alert, calendarConfig) {
    var vm = this;

    vm.planning = planning;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    $scope.responsables = ['Hamid Mouhoub', 'Marie Demarsac', 'Mustafa Malki'];
    $scope.taches = [
      'Tonte des pelouses(Rustique)',
      'Tonte des pelouses(Naturel)',
      'Tonte des pelouses(Prestige)',
      'Taille des haies',
      'Taille des massifs d\'arbuste et rosiers',
      'Nettoyage des aires stabilisées',
      'Ramassage des feuilles, branches et brindilles',
      'Entretien des massifs d\'arbustes',
      'Entretien des massifs d\'arbustes et Vivaces',
      'Le binage du pied des arbres',
      'La taille et l\'entretien des haies',
      'La taille des arbustes',
      'Désherbage des massifs d\'arbustes et vivaces',
      'Nettoyage des fleurs fanées, plantes vivaces et branches',
      'Désherbage',
      'La taille et l\'entretien des massifs d\'arbustes',
      'Traitement des Zones en herbes',
      'Entretien des zones couvres sols et tallus',
      'Apport en copeaux de bois blancs',
      'Désherbage physique, sans produits phytosanitaires, des massifs d\'arbustes',
      'Evacuation en déchetterie'
    ];
    $scope.equipes = EquipesService.query();
    $scope.sites = SitesService.query();

    /*$('#du').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY HH:mm', lang : 'fr', weekStart : 1, cancelText : 'ANNULER' });
    $('#au').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY HH:mm', lang : 'fr', weekStart : 1, cancelText : 'ANNULER' });*/


    // Remove existing Planning
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.planning.$remove(function () {
          $state.go('admin.plannings.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Planning deleted successfully!' });
        });
      }
    }

    // Save Planning
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.planningForm');
        return false;
      }

      // Create a new planning, or update the current instance
      vm.planning.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.plannings.list'); // should we send the User to the list or the updated Planning's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Planning saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Planning save error!' });
      }
    }
  }
}());
