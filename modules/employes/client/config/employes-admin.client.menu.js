'use strict';

// Configuring the User module
angular.module('employes.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Employes',
      state: 'admin.employes'
    });
  }
]);
