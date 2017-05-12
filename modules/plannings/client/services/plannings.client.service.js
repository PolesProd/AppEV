// Plannings service used to communicate Plannings REST endpoints
(function () {
  'use strict';

  angular
    .module('plannings')
    .factory('PlanningsService', PlanningsService);

  PlanningsService.$inject = ['$resource'];

  function PlanningsService($resource) {
    return $resource('api/plannings/:planningId', {
      planningId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
