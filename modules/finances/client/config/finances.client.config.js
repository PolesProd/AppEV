'use strict';

angular.module('finances').run(['Menus',

  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Finances',
      state: 'finances',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'finances', {
      title: 'List Finances',
      state: 'finances.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'finances', {
      title: 'Create Finance',
      state: 'finances.create',
      roles: ['user']
    });
  }
]);
