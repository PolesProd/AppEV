'use strict';

// Configuring the Teams module
angular.module('teams').run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Teams',
      state: 'teams',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'teams', {
      title: 'List Teams',
      state: 'teams.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'teams', {
      title: 'Create Team',
      state: 'teams.create',
      roles: ['user']
    });
  }
]);
