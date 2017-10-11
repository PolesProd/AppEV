'use strict';

// Configuration du module employé
angular
	.module('employes.admin')
	.run(['Menus',
		function(Menus) {
			Menus.addSubMenuItem('topbar', 'admin', {
				title: 'Manage Employes',
				state: 'admin.employes'
			});
		}
	]);