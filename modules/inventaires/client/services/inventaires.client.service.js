(function () {
  'use strict';

  angular
    .module('inventaires.services')
    .factory('InventairesService', InventairesService);

  InventairesService.$inject = ['$resource', '$log'];

  function InventairesService($resource, $log) {
    var Inventaire = $resource('/api/inventaires/:inventaireId', {
      inventaireId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Inventaire.prototype, {
      createOrUpdate: function () {
        var inventaire = this;
        return createOrUpdate(inventaire);
      }
    });

    return Inventaire;

    function createOrUpdate(inventaire) {
      if (inventaire._id) {
        return inventaire.$update(onSuccess, onError);
      } else {
        return inventaire.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(inventaire) {
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
