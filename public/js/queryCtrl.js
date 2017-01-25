
// Crée le module addCtrl et le contrôleur. Notez que cela dépend des modules 'geolocation' et 'gservice'.
var queryCtrl = angular.module('queryCtrl', ['geolocation', 'gservice']);
queryCtrl.controller('queryCtrl', function($scope, $log, $http, $rootScope, geolocation, gservice){


  // Initialise les variables.
  // ------------------------------------------------ ----------------------------
  $scope.formData = {};
  var queryBody = {};

  // Fonctions.
  // ----------------------------------------------------------------------------


  // Obtenir les coordonnées réelles de l'utilisateur basées sur HTML5 lors du chargement de la page.
  geolocation.getLocation().then(function(data){
    coords = {lat:data.coords.latitude, long:data.coords.longitude};


    // Définit la latitude et la longitude égales aux coordonnées HTML5.
    $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
    $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
  });

  // Obtenir les coordonnées basées sur le clic de souris. Lorsqu'un événement click est détecté.
  $rootScope.$on("clicked", function(){

    // Exécuter les fonctions gservice associées aux coordonnées d'identification.
    $scope.$apply(function(){
      $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
      $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
    });
  });

  // Prendre les paramètres de requête et les incorporer dans un queryBody JSON.
  $scope.queryUsers = function(){

    // Assemble le queryBody
    queryBody = {
      longitude: parseFloat($scope.formData.longitude),
      latitude: parseFloat($scope.formData.latitude),
      distance: parseFloat($scope.formData.distance),
      male: $scope.formData.male,
      female: $scope.formData.female,
      other: $scope.formData.other,
      minAge: $scope.formData.minage,
      maxAge: $scope.formData.maxage,
      favlang: $scope.formData.favlang,
      reqVerified: $scope.formData.verified
    };

    // Affichez le queryBody sur l'itinéraire / query POST pour récupérer les résultats filtrés.
    $http.post('/query', queryBody)

    // Stocker les résultats filtrés dans queryResults.
    .success(function(queryResults){

      // Transmettre les résultats filtrés au service Google Map et actualiser la carte.
      gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);

      // Compter le nombre d'enregistrements récupérés pour le panneau footer.
      $scope.queryCount = queryResults.length;
    })
    .error(function(queryResults){
      console.log('Error ' + queryResults);
    });
  };
});
