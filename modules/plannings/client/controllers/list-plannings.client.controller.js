(function () {
  'use strict';

  angular
  .module('plannings')
  .controller('PlanningsListController', PlanningsListController);

  PlanningsListController.$inject = ['$scope', '$window', '$state', '$location', 'PlanningsService', 'alert', 'calendarConfig'];

  function PlanningsListController($scope, $window, $state, $location, PlanningsService, alert, calendarConfig) {
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
          var id = args.calendarEvent.id;
          $location.path('/plannings/' + id + '/edit')
        }
      }, {
        label: '<i class=\'glyphicon glyphicon-remove\'></i>',
        onClick: function(args) {
          args.calendarEvent.remove();
          $location.path('/plannings');
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
        $scope.planningView.push({
          id: data._id,
          title: data.name,
          color: calendarConfig.colorTypes.important,
          startsAt: moment(new Date(data.start)),
          endsAt: moment(new Date(data.end)),
          team: data.team,
          site: data.site,
          tasks: data.tasks,
          draggable: true,
          resizable: true,
          actions: actions
        });
      });
    });

    // Définit si la cellue d'info est ouverte ou pas
    vm.cellIsOpen = false;

    /*vm.eventClicked = function(event) {
      alert.show('', event);
    };

    vm.eventEdited = function(event) {
      alert.show('', event);

      console.log(id);
    };

    vm.eventDeleted = function(event) {
      alert.show('', event);
    };*/

    vm.eventTimesChanged = function(event) {
      alert.show('', event);
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