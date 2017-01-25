// Déclare le module angular initial "AppEV" ainsi que d'autres contrôleurs et services.
var app = angular.module('AppEV', ['addCtrl', 'queryCtrl', 'headerCtrl', 'geolocation', 'gservice', 'ngRoute'])

// Configure Angular routing - affiche la vue et le contrôleur appropriés si nécessaire.Configure Angular routing - affiche la vue et le contrôleur appropriés si nécessaire.
.config(function($routeProvider){

    // Panneau de configuration: Rejoindre l'équipe.
    $routeProvider.when('/join', {
        controller: 'addCtrl',
        templateUrl: 'partials/addForm.html',

        // Panneau de configuration: Trouver des coéquipiers.
    }).when('/find', {
        controller: 'queryCtrl',
        templateUrl: 'partials/queryForm.html',

        // Tous les autres éléments sont envoyés au Panneau de configuration: Rejoindre l'équipe.
    }).otherwise({redirectTo:'/join'});
});
