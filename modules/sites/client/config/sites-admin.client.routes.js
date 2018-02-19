(function () {
  'use strict';

  angular
    .module('sites.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.sites', {
        abstract: true,
        url: '/sites',
        template: '<ui-view/>'
      })
      .state('admin.sites.list', {
        url: '',
        templateUrl: '/modules/sites/client/views/admin/list-sites.client.view.html',
        controller: 'SitesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.sites.create', {
        url: '/create',
        templateUrl: '/modules/sites/client/views/admin/form-site.client.view.html',
        controller: 'SitesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          siteResolve: newSite
        }
      })
      .state('admin.sites.edit', {
        url: '/:siteId/edit',
        templateUrl: '/modules/sites/client/views/admin/form-site.client.view.html',
        controller: 'SitesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ siteResolve.title }}'
        },
        resolve: {
          siteResolve: getSite
        }
      });
  }

  getSite.$inject = ['$stateParams', 'SitesService'];

  function getSite($stateParams, SitesService) {
    return SitesService.get({
      siteId: $stateParams.siteId
    }).$promise;
  }

  newSite.$inject = ['SitesService'];

  function newSite(SitesService) {
    return new SitesService();
  }
}());
