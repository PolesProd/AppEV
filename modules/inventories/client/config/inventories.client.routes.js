(function () {
  'use strict';

  angular
    .module('inventories')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('inventories', {
        abstract: true,
        url: '/inventories',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('inventories.list', {
        url: '',
        templateUrl: 'modules/inventories/client/views/list-inventories.client.view.html',
        controller: 'InventoriesListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Inventories List'
        }
      })
      .state('inventories.create', {
        url: '/create',
        templateUrl: 'modules/inventories/client/views/form-inventory.client.view.html',
        controller: 'InventoriesController',
        controllerAs: 'vm',
        resolve: {
          inventoryResolve: newInventory
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Inventories Create'
        }
      })
      .state('inventories.edit', {
        url: '/:inventoryId/edit',
        templateUrl: 'modules/inventories/client/views/form-inventory.client.view.html',
        controller: 'InventoriesController',
        controllerAs: 'vm',
        resolve: {
          inventoryResolve: getInventory
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Inventory {{ inventoryResolve.name }}'
        }
      })
      .state('inventories.view', {
        url: '/:inventoryId',
        templateUrl: 'modules/inventories/client/views/view-inventory.client.view.html',
        controller: 'InventoriesController',
        controllerAs: 'vm',
        resolve: {
          inventoryResolve: getInventory
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Inventory {{ inventoryResolve.name }}'
        }
      });
  }

  getInventory.$inject = ['$stateParams', 'InventoriesService'];

  function getInventory($stateParams, InventoriesService) {
    return InventoriesService.get({
      inventoryId: $stateParams.inventoryId
    }).$promise;
  }

  newInventory.$inject = ['InventoriesService'];

  function newInventory(InventoriesService) {
    return new InventoriesService();
  }
}());
