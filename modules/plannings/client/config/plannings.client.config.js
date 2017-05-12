'use strict';

angular.module('plannings').run(['Menus',

function (Menu) {
  // Set top bar menu items
  Menu.addMenuItem('topbar', {
    title: 'Plannings',
    state: 'plannings',
    type: 'dropdown',
    roles: ['*']
  });

  // Add the dropdown list item
  Menu.addSubMenuItem('topbar', 'plannings', {
    title: 'Plannings',
    state: 'plannings.list'
  });

  // Add the dropdown create item
  Menu.addSubMenuItem('topbar', 'plannings', {
    title: 'Crée Planning',
    state: 'plannings.create',
    roles: ['user']
  });
}]);
