(function () {
  'use strict';

  angular
    .module('plannings.services')
    .factory('PlanningsService', PlanningsService);

  PlanningsService.$inject = ['$resource', '$log'];

  function PlanningsService($resource, $log) {
    var Planning = $resource('/api/plannings/:planningId', {
      planningId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Planning.prototype, {
      createOrUpdate: function () {
        var planning = this;
        return createOrUpdate(planning);
      }
    });

    return Planning;

    function createOrUpdate(planning) {
      if (planning._id) {
        return planning.$update(onSuccess, onError);
      } else {
        return planning.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(planning) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
