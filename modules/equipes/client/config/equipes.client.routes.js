(function () {
  'use strict';

  angular
    .module('equipes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('equipes', {
        abstract: true,
        url: '/equipes',
        template: '<ui-view/>'
      })
      .state('equipes.list', {
        url: '',
        templateUrl: '/modules/equipes/client/views/list-equipes.client.view.html',
        controller: 'EquipesListController',
        controllerAs: 'vm'
      })
      .state('equipes.view', {
        url: '/:equipeId',
        templateUrl: '/modules/equipes/client/views/view-equipe.client.view.html',
        controller: 'EquipesController',
        controllerAs: 'vm',
        resolve: {
          equipeResolve: getEquipe
        },
        data: {
          pageTitle: '{{ equipeResolve.title }}'
        }
      });
  }

  getEquipe.$inject = ['$stateParams', 'EquipesService'];

  function getEquipe($stateParams, EquipesService) {
    return EquipesService.get({
      equipeId: $stateParams.equipeId
    }).$promise;
  }
}());
