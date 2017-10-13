'use strict';

angular.module('core.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Ecocert',
      state: 'ecocert',
      type: 'item',
      roles: ['user', 'admin']
    });
  }
]);
