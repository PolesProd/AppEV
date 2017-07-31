(function () {
  'use strict';

  angular
    .module('plannings')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('plannings', {
        abstract: true,
        url: '/plannings',
        template: '<ui-view/>'
      })
      .state('plannings.list', {
        url: '',
        templateUrl: 'modules/plannings/client/views/list-plannings.client.view.html',
        controller: 'PlanningsListController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Plannings List'
        }
      })
      .state('plannings.create', {
        url: '/create',
        templateUrl: 'modules/plannings/client/views/form-planning.client.view.html',
        controller: 'PlanningsController',
        controllerAs: 'vm',
        resolve: {
          planningResolve: newPlanning
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Plannings Create'
        }
      })
      .state('plannings.edit', {
        url: '/:planningId/edit',
        templateUrl: 'modules/plannings/client/views/form-planning.client.view.html',
        controller: 'PlanningsController',
        controllerAs: 'vm',
        resolve: {
          planningResolve: getPlanning
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Planning {{ planningResolve.name }}'
        }
      })
      .state('plannings.view', {
        url: '/:planningId',
        templateUrl: 'modules/plannings/client/views/view-planning.client.view.html',
        controller: 'PlanningsController',
        controllerAs: 'vm',
        resolve: {
          planningResolve: getPlanning
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Planning {{ planningResolve.name }}'
        }
      });
  }

  getPlanning.$inject = ['$stateParams', 'PlanningsService'];

  function getPlanning($stateParams, PlanningsService) {
    return PlanningsService.get({
      planningId: $stateParams.planningId
    }).$promise;
  }

  newPlanning.$inject = ['PlanningsService'];

  function newPlanning(PlanningsService) {
    return new PlanningsService();
  }
}());
