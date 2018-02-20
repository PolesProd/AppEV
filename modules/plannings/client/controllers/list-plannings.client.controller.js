(function () {
  'use strict';

  angular
    .module('plannings')
    .controller('PlanningsListController', PlanningsListController);

  PlanningsListController.$inject = ['$scope', 'PlanningsService', 'alert', 'calendarConfig'];

  function PlanningsListController($scope, PlanningsService, alert, calendarConfig) {
    var vm = this;

    vm.plannings = PlanningsService.query();

    // Format locale
    moment.locale('fr_fr', {
      week : {
        dow : 1 // Le lundi est le premier jour de la semaine
      }
    });

    // Ces variables au minimum DOIVENT être définies pour que le calendrier fonctionne
    // Vue par défaut du calendrier(Réglages: year, month, week, day)
    vm.calendarView = 'month';

    // Instancie les dates
    vm.viewDate = new Date();

    // Créer les icones d'actions'
    var actions = [{

    }];

    // Récupère les plannings depuis la base de donnée
    vm.planningCalendar = vm.plannings;
    vm.planningCalendar.$promise.then(function (resourceArray) {

      // Crée un array vide pour y stocker les plannings
      vm.allPlannings = [];
      vm.allPlannings = resourceArray;

      angular.forEach(vm.allPlannings, function (data) {

        // Crée une vue des plannings dans le calendrier
        vm.planningView.push({
          title: data.nom,
          color: calendarConfig.colorTypes.important,
          startsAt: data.du,
          endsAt: data.au,
          team: data.equipe,
          site: data.site,
          tasks: data.taches,
          draggable: true,
          resizable: true,
          actions: actions
        });
      console.log(data)
      });
    });

    // Définit si la cellue d'info est ouverte ou pas
    vm.cellIsOpen = false;

    vm.eventClicked = function(event) {
      alert.show('Clique', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Mis à jojur', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Supprimer', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Déplacer ou Redimensionner', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }
    };
  }
}());
