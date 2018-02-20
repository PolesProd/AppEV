(function () {
  'use strict';

  angular
    .module('inventaires.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.inventaires', {
        abstract: true,
        url: '/inventaires',
        template: '<ui-view/>'
      })
      .state('admin.inventaires.list', {
        url: '',
        templateUrl: '/modules/inventaires/client/views/admin/list-inventaires.client.view.html',
        controller: 'InventairesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.inventaires.create', {
        url: '/create',
        templateUrl: '/modules/inventaires/client/views/admin/form-inventaire.client.view.html',
        controller: 'InventairesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          inventaireResolve: newInventaire
        }
      })
      .state('admin.inventaires.edit', {
        url: '/:inventaireId/edit',
        templateUrl: '/modules/inventaires/client/views/admin/form-inventaire.client.view.html',
        controller: 'InventairesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ inventaireResolve.title }}'
        },
        resolve: {
          inventaireResolve: getInventaire
        }
      });
  }

  getInventaire.$inject = ['$stateParams', 'InventairesService'];

  function getInventaire($stateParams, InventairesService) {
    return InventairesService.get({
      inventaireId: $stateParams.inventaireId
    }).$promise;
  }

  newInventaire.$inject = ['InventairesService'];

  function newInventaire(InventairesService) {
    return new InventairesService();
  }
}());
