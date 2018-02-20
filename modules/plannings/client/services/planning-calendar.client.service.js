'use strict';

angular
  .module('plannings')
  .factory('alert', function($uibModal) {
    function show(action, event) {
      console.log('calendarHelper s\'execute');
      return $uibModal.open({
        templateUrl: 'modules/plannings/client/views/planning-modal.client.view.html',
        controller: function() {
          var vm = this;
          vm.action = action;
          vm.event = event;
        },
        controllerAs: 'vm'
      });
    }

    return {
      show: show
    };
  });
