'use strict';

angular.module('lots').run(['Menus',
function (Menus) {
  // Set top bar menu items
  Menus.addMenuItem('topbar', {
    title: 'Lots',
    state: 'lots',
    type: 'dropdown',
    roles: ['*']
  });

  // Add the dropdown list item
  Menus.addSubMenuItem('topbar', 'lots', {
    title: 'List Lots',
    state: 'lots.list'
  });

  // Add the dropdown create item
  Menus.addSubMenuItem('topbar', 'lots', {
    title: 'Create Lot',
    state: 'lots.create',
    roles: ['user']
  });
}]);
