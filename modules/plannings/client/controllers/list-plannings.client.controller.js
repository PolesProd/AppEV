(function () {
  'use strict';

  angular
    .module('plannings')
    .controller('PlanningsListController', PlanningsListController);

  PlanningsListController.$inject = ['$scope', 'PlanningsService', 'alert', 'calendarConfig'];

  function PlanningsListController($scope, PlanningsService, alert, calendarConfig) {
    var vm = this;

    vm.plannings = PlanningsService.query();


    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        alert.show('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        alert.show('Deleted', args.calendarEvent);
      }
    }];

    vm.planningCalendar = vm.plannings;
    vm.planningCalendar.$promise.then(function (resourceArray) {

      var start = new Date(resourceArray[0].start);
      var end = new Date(resourceArray[0].end);

      var startToString = start.toString();
      var endToString = end.toString();

      var monthStart = startToString.slice(4,7);
      var dateStart = startToString.slice(8,10);

      var monthEnd = endToString.slice(4,7);
      var dateEnd = endToString.slice(8,10);

      // $scope.allPlannings = [];
      // $scope.allPlannings = resourceArray;
      //
      // vm.planningView = [
      //   {
      //     title: resourceArray.name,
      //     color: calendarConfig.colorTypes.warning,
      //     startsAt: moment().startOf('year').month(monthStart).date(dateStart),
      //     endsAt: moment().startOf('year').month(monthEnd).date(dateEnd),
      //     team: resourceArray[0].team,
      //     site: resourceArray[0].site,
      //     tasks: resourceArray[0].tasks,
      //     draggable: true,
      //     resizable: true,
      //     actions: actions
      //   }
      // ];

      console.log(resourceArray);
    });

    vm.cellIsOpen = true;

    // vm.addEvent = function() {
    //   vm.events.push({
    //     title: 'New event',
    //     startsAt: moment().startOf('day').toDate(),
    //     endsAt: moment().endOf('day').toDate(),
    //     color: calendarConfig.colorTypes.important,
    //     draggable: true,
    //     resizable: true
    //   });
    // };

    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
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
