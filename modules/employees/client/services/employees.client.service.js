// Employees service used to communicate Employees REST endpoints
(function () {
  'use strict';

  angular
    .module('employees')
    .factory('EmployeesService', EmployeesService);

  EmployeesService.$inject = ['$resource'];

  function EmployeesService($resource) {
    return {
      employees: $resource('api/employees/:employeeId', {
        employeeId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      teams: $resource('api/teams/teamId', {
        teamId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }, params: {
          controllers: 'TeamsController'
        }
      })
    };
  }
}());
