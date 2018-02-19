(function () {
  'use strict';

  angular
    .module('employes.services')
    .factory('EmployesService', EmployesService);

  EmployesService.$inject = ['$resource', '$log'];

  function EmployesService($resource, $log) {
    var Employe = $resource('/api/employes/:employeId', {
      employeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Employe.prototype, {
      createOrUpdate: function () {
        var employe = this;
        return createOrUpdate(employe);
      }
    });

    return Employe;

    function createOrUpdate(employe) {
      if (employe._id) {
        return employe.$update(onSuccess, onError);
      } else {
        return employe.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(employe) {
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
