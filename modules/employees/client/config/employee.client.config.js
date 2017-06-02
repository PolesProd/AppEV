'use strict';

angular.module('employees').run(['Menus',
function (Menus) {
  // Set top bar menu items
  Menus.addMenuItem('topbar', {
    title: 'Employés',
    state: 'employees',
    type: 'dropdown',
    roles: ['*']
  });

  // Add the dropdown list item
  Menus.addSubMenuItem('topbar', 'employees', {
    title: 'Liste des employés',
    state: 'employees.list'
  });

  // Add the dropdown create item
  Menus.addSubMenuItem('topbar', 'employees', {
    title: 'Ajouter employé',
    state: 'employees.create',
    roles: ['user']
  });
}]);
