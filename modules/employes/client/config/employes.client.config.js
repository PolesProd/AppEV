'use strict';

angular.module('employes').run(['Menus',
function (Menus) {
  Menus.addMenuItem('topbar', {
    title: 'Employés',
    state: 'employes',
    type: 'dropdown',
    roles: ['*']
  });

  Menus.addSubMenuItem('topbar', 'employes', {
    title: 'Liste employés',
    state: 'employes.list'
  });

  Menus.addSubMenuItem('topbar', 'employes', {
    title: 'Ajouter employés',
    state: 'employes.create',
    roles: ['user']
  });
}]);
