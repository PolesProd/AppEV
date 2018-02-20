(function () {
  'use strict';

  angular
    .module('equipes.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.equipes', {
        abstract: true,
        url: '/equipes',
        template: '<ui-view/>'
      })
      .state('admin.equipes.list', {
        url: '',
        templateUrl: '/modules/equipes/client/views/admin/list-equipes.client.view.html',
        controller: 'EquipesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.equipes.create', {
        url: '/create',
        templateUrl: '/modules/equipes/client/views/admin/form-equipe.client.view.html',
        controller: 'EquipesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          equipeResolve: newEquipe
        }
      })
      .state('admin.equipes.edit', {
        url: '/:equipeId/edit',
        templateUrl: '/modules/equipes/client/views/admin/form-equipe.client.view.html',
        controller: 'EquipesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ equipeResolve.title }}'
        },
        resolve: {
          equipeResolve: getEquipe
        }
      });
  }

  getEquipe.$inject = ['$stateParams', 'EquipesService'];

  function getEquipe($stateParams, EquipesService) {
    return EquipesService.get({
      equipeId: $stateParams.equipeId
    }).$promise;
  }

  newEquipe.$inject = ['EquipesService'];

  function newEquipe(EquipesService) {
    return new EquipesService();
  }
}());
