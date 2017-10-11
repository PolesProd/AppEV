'use strict';

angular
  .module('plannings')
  .factory('alert', function($modal) {
    function show(action, event) {
      return $modal.open({
        templateUrl: 'modules/plannings/client/views/planning-calendar-modal.client.view.html',
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
