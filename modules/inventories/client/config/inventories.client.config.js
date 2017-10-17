'use strict';

angular.module('inventories').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Inventaire',
      state: 'inventories',
      type: 'item',
      roles: ['user', 'admin']
    });

    /*Menus.addSubMenuItem('topbar', 'inventories', {
      title: 'Liste',
      state: 'inventories.list',
      roles: ['user', 'admin']
    });

    Menus.addSubMenuItem('topbar', 'inventories', {
      title: 'Ajouter',
      state: 'inventories.create',
      roles: ['admin']
    });*/
  }
]);
