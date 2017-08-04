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
    vm.planningCalendar.$promise.then(function (response) {

      var start = new Date(response[0].start);
      var end = new Date(response[0].end);


      vm.planningView = [
        {
          title: response[0].name,
          color: calendarConfig.colorTypes.warning,
          startsAt: moment().startOf('year')/*.add(8, 'hours')*/.toDate(),
          // startsAt: moment().month(month).date(day)/*.hours(0).minutes(0).seconds(0).milliseconds(0)*/,
          // endsAt: moment().month(month).date(day)/*.hours(0).minutes(0).seconds(0).milliseconds(0)*/,
          endsAt: moment().startOf('year')/*.add(9, 'hours')*/.toDate(),
          team: response[0].team,
          site: response[0].site,
          tasks: response[0].tasks,
          draggable: true,
          resizable: true,
          actions: actions
        }
      ];

      // console.log(start);
      // console.log(end);
      // console.log(vm.planningView);
    });

    // vm.events = [
    //   {
    //     title: 'An event',
    //     color: calendarConfig.colorTypes.warning,
    //     startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
    //     endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
    //     draggable: true,
    //     resizable: true,
    //     actions: actions
    //   }, {
    //     title: 'Another event, with a html title',
    //     color: calendarConfig.colorTypes.info,
    //     startsAt: moment().add(1, 'day').toDate(),
    //     endsAt: moment().add(1, 'days').toDate(),
    //     draggable: true,
    //     resizable: true,
    //     actions: actions
    //   }
    // ];

    vm.cellIsOpen = true;

    vm.addEvent = function() {
      vm.events.push({
        title: 'New event',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().endOf('day').toDate(),
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true
      });
    };

    vm.eventClicked = function(event) {
      console.log(event);
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
