// Crée le module addCtrl et le contrôleur. Notez que cela dépend du module et du service de "géolocalisation".
var addCtrl = angular.module('addCtrl', ['ngRoute', 'geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){

    // Initialise les variables.
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Réglage des coordonnées initiale sur vlg
    $scope.formData.latitude = 48.936;
    $scope.formData.longitude = 2.3247;

    // Obtenir les coordonnées réelles de l'utilisateur basées sur HTML5 à la fenêtre de chargement.
    geolocation.getLocation().then(function (data) {

      // Définissez la latitude et la longitude égales aux coordonnées HTML5.
      coords = {lat:data.coords.latitude, long:data.coords.longitude};

      // Afficher les coordonnées dans les zones de texte de l'emplacement arrondies à trois décimales.
      $scopoe.formData.longitude = parseFloat(coords.long).toFixed(3);
      $scopoe.formData.latitude = parseFloat(coords.lat).toFixed(3);

      // Afficher message confirmant que les coordonnées ont été vérifiées.
      $scope.formData.htmlverified = "Yep (Merci de nous avoir donné de vraies données!)";
      gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
    });

    // Fonctions.
    // ----------------------------------------------------------------------------
    // Obtenir des coordonnées basées sur un clic de souris. Lorsqu'un événement click est détecté.
    $rootScope.$on("clicked", function(){

        // Exécuter les fonctions gservice associées aux coordonnées d'identification.
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "Nan (Merci de me renvoyer ma carte...!!)";
        });
    });

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
        });

        gservice.ferfresh($scope.formData.latitude, $scope.formData.longitude)
        .error(function (data) {
            console.log('Error: ' + data);
        });
    };
});
