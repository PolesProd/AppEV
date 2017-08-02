'use strict';

angular.module('plannings').run(['Menus',

function (Menu) {
  // Set top bar menu items
  Menu.addMenuItem('topbar', {
    title: 'Plannings',
    state: 'plannings',
    type: 'dropdown',
    roles: ['user', 'admin']
  });

  // Add the dropdown list item
  Menu.addSubMenuItem('topbar', 'plannings', {
    title: 'Plannings',
    state: 'plannings.list',
    roles: ['user', 'admin']
  });

  // Add the dropdown create item
  Menu.addSubMenuItem('topbar', 'plannings', {
    title: 'Crée Planning',
    state: 'plannings.create',
    roles: ['user', 'admin']
  });

  Menu.addSubMenuItem('topbar', 'plannings', {
    title: 'Calendrier',
    state: 'plannings.calendar',
    roles: ['user', 'admin']
  });
}]);
