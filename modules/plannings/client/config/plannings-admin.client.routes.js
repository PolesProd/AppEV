(function () {
  'use strict';

  angular
    .module('plannings.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.plannings', {
        abstract: true,
        url: '/plannings',
        template: '<ui-view/>'
      })
      .state('admin.plannings.list', {
        url: '',
        templateUrl: '/modules/plannings/client/views/admin/list-plannings.client.view.html',
        controller: 'PlanningsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.plannings.create', {
        url: '/create',
        templateUrl: '/modules/plannings/client/views/admin/form-planning.client.view.html',
        controller: 'PlanningsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          planningResolve: newPlanning
        }
      })
      .state('admin.plannings.edit', {
        url: '/:planningId/edit',
        templateUrl: '/modules/plannings/client/views/admin/form-planning.client.view.html',
        controller: 'PlanningsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ planningResolve.title }}'
        },
        resolve: {
          planningResolve: getPlanning
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
