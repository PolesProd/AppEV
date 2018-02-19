(function () {
  'use strict';

  angular
    .module('sites.services')
    .factory('SitesService', SitesService);

  SitesService.$inject = ['$resource', '$log'];

  function SitesService($resource, $log) {
    var Site = $resource('/api/sites/:siteId', {
      siteId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Site.prototype, {
      createOrUpdate: function () {
        var site = this;
        return createOrUpdate(site);
      }
    });

    return Site;

    function createOrUpdate(site) {
      if (site._id) {
        return site.$update(onSuccess, onError);
      } else {
        return site.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(site) {
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
