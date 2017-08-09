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
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        alert.show('Mis à jour', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        alert.show('Supprimer', args.calendarEvent);
      }
    }];

    // Récupère les plannings depuis la base de donnée
    vm.planningCalendar = vm.plannings;
    vm.planningCalendar.$promise.then(function (resourceArray) {

      // Crée un array vide pour y stocker les plannings
      $scope.allPlannings = [];
      $scope.allPlannings = resourceArray;

      angular.forEach($scope.allPlannings, function (data) {
        // for

        // Crée une vue des plannings dans le calendrier
        $scope.planningView = [
          {
            title: data.name,
            color: calendarConfig.colorTypes.warning,
            startsAt: moment(new Date(data.start))/*.startOf('year').month(monthStart).date(dateStart)*/,
            endsAt: moment(new Date(data.end))/*.startOf('year').month(monthEnd).date(dateEnd)*/,
            team: data.team,
            site: data.site,
            tasks: data.tasks,
            draggable: true,
            resizable: true,
            actions: actions
          }
        ];
        console.log($scope.planningView);
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
