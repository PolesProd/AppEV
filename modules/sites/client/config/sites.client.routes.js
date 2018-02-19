(function () {
  'use strict';

  angular
    .module('sites.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('sites', {
        abstract: true,
        url: '/sites',
        template: '<ui-view/>'
      })
      .state('sites.list', {
        url: '',
        templateUrl: '/modules/sites/client/views/list-sites.client.view.html',
        controller: 'SitesListController',
        controllerAs: 'vm'
      })
      .state('sites.view', {
        url: '/:siteId',
        templateUrl: '/modules/sites/client/views/view-site.client.view.html',
        controller: 'SitesController',
        controllerAs: 'vm',
        resolve: {
          siteResolve: getSite
        },
        data: {
          pageTitle: '{{ siteResolve.title }}'
        }
      });
  }

  getSite.$inject = ['$stateParams', 'SitesService'];

  function getSite($stateParams, SitesService) {
    return SitesService.get({
      siteId: $stateParams.siteId
    }).$promise;
  }
}());
