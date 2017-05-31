// Employees service used to communicate Employees REST endpoints
(function () {
  'use strict';

  angular
    .module('employees')
    .factory('EmployeesService', EmployeesService);

  EmployeesService.$inject = ['$resource', '$log'];

  function EmployeesService($resource, $log) {
    var Employee = $resource('/api/employees/:employeeId', {
      employeeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Employee.prototype, {
      createOrUpdate: function () {
        var employee = this;
        return createOrUpdate(employee);
      }
    });

    return Employee;

    function createOrUpdate(employee) {
      if (employee._id) {
        return employee.$update(onSuccess, onError);
      } else {
        return employee.$save(onSuccess, onError);
      }

      // Gestion de la réponse réussie
      function onSuccess(employee) {

      }

      // Gestion de la réponse d'erreur
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Erreur de manipulation interne
        handleError(error);
      }
    }

    function handleError(error) {
      // Journal d'erreurs
      $log.error(error);
    }
  }
}());
