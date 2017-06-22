'use strict';

angular.module('rhdatas').run(['Menus',
function (Menus) {
  Menus.addMenuItem('topbar', {
    title: 'Données RH',
    state: 'rhdatas',
    type: 'dropdown',
    roles: ['*']
  });

  Menus.addSubMenuItem('topbar', 'rhdatas', {
    title: 'Données RH',
    state: 'rhdatas.list'
  });

  // Menus.addSubMenuItem('topbar', 'rhdatas', {
  //   title: 'Ajouter Données RH',
  //   state: 'rhdatas.create',
  //   roles: ['user']
  // });
}]);
