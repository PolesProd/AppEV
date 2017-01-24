// Crée le module addCtrl et le contrôleur. Notez que cela dépend du module et du service de "géolocalisation".
var addCtrl = angular.module('addCtrl', ['geolocation']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation){

    // Initialise les variables.
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Réglage des coordonnées initiale sur vlg
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;

    // Fonctions.
    // ----------------------------------------------------------------------------
    // Créé un nouvel utilisateurs basé sur les infos du formulaire.
    $scope.createUser = function() {

        // Grabs tous les champs de la zone de texte.
        var userData = {
            username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            favlang: $scope.formData.favlang,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // Sauvegarde l'utilisateur dans la base de données.
        $http.post('/users', userData)
            .success(function (data) {

                // Une fois terminé, effacez le formulaire(sauf le lieu).
                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favlang = "";

            })

            gservice.ferfresh($scope.formData.latitude, $scope.formData.longitude);
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});
