// Crée le module headerCtrl et le contrôleur. Notez que cela dépend du service de $location.
var headerCtrl = angular.module('headerCtrl', []);
headerCtrl.controller('headerCtrl', function($scope, $location) {

// Définit la valeur isActive en fonction de l'emplacement actuel de l'URL
$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});
