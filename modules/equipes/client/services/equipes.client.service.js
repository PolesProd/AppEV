(function () {
  'use strict';

  angular
    .module('equipes.services')
    .factory('EquipesService', EquipesService);

  EquipesService.$inject = ['$resource', '$log'];

  function EquipesService($resource, $log) {
    var Equipe = $resource('/api/equipes/:equipeId', {
      equipeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Equipe.prototype, {
      createOrUpdate: function () {
        var equipe = this;
        return createOrUpdate(equipe);
      }
    });

    return Equipe;

    function createOrUpdate(equipe) {
      if (equipe._id) {
        return equipe.$update(onSuccess, onError);
      } else {
        return equipe.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(equipe) {
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
