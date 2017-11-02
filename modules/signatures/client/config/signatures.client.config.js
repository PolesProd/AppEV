/*'use strict';

angular.module('signatures').run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Signatures',
      state: 'signatures',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'signatures', {
      title: 'List Signatures',
      state: 'signatures.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'signatures', {
      title: 'Create Signature',
      state: 'signatures.create',
      roles: ['admin']
    });
  }
]);*/