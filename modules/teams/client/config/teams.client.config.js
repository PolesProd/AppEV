'use strict';

angular.module('teams').run(['Menus',
function (Menus) {
  // Set top bar menu items
  Menus.addMenuItem('topbar', {
    title: 'Equipes',
    state: 'teams',
    type: 'dropdown',
    roles: ['user', 'admin']
  });

  // Add the dropdown list item
  Menus.addSubMenuItem('topbar', 'teams', {
    title: 'Liste équipe',
    state: 'teams.list',
    roles: ['user', 'admin']
  });

  // Add the dropdown create item
  Menus.addSubMenuItem('topbar', 'teams', {
    title: 'Crée équipe',
    state: 'teams.create',
    roles: ['admin']
  });
}]);
