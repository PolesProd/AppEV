(function () {
  'use strict';

  angular
    .module('plannings.routes')
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
        templateUrl: '/modules/plannings/client/views/list-plannings.client.view.html',
        controller: 'PlanningsListController',
        controllerAs: 'vm'
      })
      .state('plannings.view', {
        url: '/:planningsId',
        templateUrl: '/modules/plannings/client/views/view-plannings.client.view.html',
        controller: 'PlanningsController',
        controllerAs: 'vm',
        resolve: {
          planningsResolve: getPlanning
        },
        data: {
          pageTitle: '{{ planningsResolve.title }}'
        }
      });
  }

  getPlanning.$inject = ['$stateParams', 'PlanningsService'];

  function getPlanning($stateParams, PlanningsService) {
    return PlanningsService.get({
      planningsId: $stateParams.planningsId
    }).$promise;
  }
}());
