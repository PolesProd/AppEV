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
      { name: 'La Coulée Verte', id: 1 },
      { name: 'Avenue De Verdun(Square Emmaüs)', id: 2 },
      { name: 'Avenue De Verdun', id: 3 },
      { name: 'Allée Du Chemin Vert', id: 4 },
      { name: 'Madame de Nanteuil', id: 5 },
      { name: 'Boulevard Charles De Gaule - Avenue Maréchal Leclerc', id: 6 },
      { name: 'Quai Du Moulin De Cage', id: 7 },
      { name: 'Rue Jean Jaurès', id: 8 },
      { name: 'Voie Promenade(Sud/Centre)', id: 9 },
      { name: 'Voie Promenade(Nord)', id: 10 },
      { name: 'Square Abbé Pierre', id: 11 },
      { name: 'Fond De La Noue', id: 12 },
      { name: 'Boulevard Gallieni', id: 13 },
      { name: 'Rue Des Augustins', id: 14 },
      { name: 'Rue Du Haut De La Noue', id: 15 },
      { name: 'Square De La Rue Pasteur', id: 16 },
      { name: 'Mail Roger Prévot', id: 17 },
      { name: 'Rue Du Ponant - Rue Paul Signac', id: 18 },
      { name: 'Fosse Aux Astres', id: 19 },
      { name: 'Square Sainte Marie', id: 20 },
      { name: 'Cimetière', id: 21 },
      { name: 'Nouveau Cimetière', id: 22 },
      { name: 'Rue Nelson Mandela', id: 23 },
      { name: 'Chemin Des Reniers', id: 24 },
      { name: 'Vieux Chemin De Saint-Denis', id: 25 },
      { name: 'Square Madiesse - Rue Noël Le Dudal', id: 26 },
      { name: 'Quai Sisley', id: 27 },
      { name: 'Quai D\'Asnières', id: 28 },
      { name: 'Chantiers Navals', id: 29 },
      { name: 'Passage De "La Mef"', id: 30 },
      { name: 'Parking De La Piscine', id: 31 },
      { name: 'Rue Du 8 Mai 1945', id: 32 },
      { name: 'Chemmin Du Bucher', id: 33 },
      { name: 'Rue Royer', id: 34 }
    ];
  }
}());
