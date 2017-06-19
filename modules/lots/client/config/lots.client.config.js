'use strict';

angular.module('lots').run(['Menus',
function (Menus) {
  // Set top bar menu items
  Menus.addMenuItem('topbar', {
    title: 'Sites',
    state: 'lots',
    type: 'dropdown',
    roles: ['*']
  });

  // Add the dropdown list item
  Menus.addSubMenuItem('topbar', 'lots', {
    title: 'Liste des sites',
    state: 'lots.list'
  });

  // Add the dropdown create item
  Menus.addSubMenuItem('topbar', 'lots', {
    title: 'Crée site',
    state: 'lots.create',
    roles: ['user']
  });
}]);
