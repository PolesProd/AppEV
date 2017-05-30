// Teams service used to communicate Teams REST endpoints
(function () {
  'use strict';

  angular
  .module('teams')
  .factory('TeamsService', TeamsService);

  TeamsService.$inject = ['$resource'];

  function TeamsService($resource) {
    return {
      // employees: [{value: 0, name: 'azerty'},{value: 0, name: 'qwerty'},{value: 0, name: 'AZERTY'}],
      employees: $resource('api/employees/:employeeId', {
        employeesId: '@_id'
      }, {
        update: {
          meyhod: 'PUT'
        }
      }),
      teams: $resource('api/teams/:teamId', {
        teamId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      })
    };
  }
})();
