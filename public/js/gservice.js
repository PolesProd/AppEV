// Crée l'usine gservice. Ce sera le principal moyen par lequel nous interagissons avec Google Maps.
angular.module('gservice', [])
.factory('gservice', function($rootScope, $http){

  // Initialise les variables.
  // --------------------------------------------------------------------
  // Ce que notre service retournera.
  var googleMapService = {};

  // Gestion des clics et sélection d'emplacement.
  googleMapService.clickLat  = 0;
  googleMapService.clickLong = 0;

  // Tableau locations des emplacements obtenus à partir des appels API.
  var locations = [];

  // Variables we'll use to help us pan to the right spot
  var lastMarker;
  var currentSelectedMarker;

  // Lieu choisi (initialiser à vlg)
  var selectedLat = 48.9366;
  var selectedLong = 2.3247;

  // Fonctions
  // --------------------------------------------------------------------
  // Actualiser la carte avec de nouvelles données. La fonction prendra de nouvelles coordonnées de latitude et de longitude.
  googleMapService.refresh = function(latitude, longitude, filteredResults){

    // Efface le tableau locations.
    locations = [];

    // Définit la lat & la long sélectionnés égaux à ceux fournis sur l'appel refresh().
    selectedLat = latitude;
    selectedLong = longitude;

    // Si les résultats filtrés sont fournis dans l'appel refresh().
    if (filteredResults){

      // Ensuite, convertir les résultats filtrés en points de carte.
      locations = convertToMapPoints(filteredResults);

      // Ensuite, initialisez la carte - en notant qu'un filtre a été utilisé (pour marquer les icônes en jaune).
      initialize(latitude, longitude, true);
    }


    // Si aucun filtre n'est fourni dans l'appel refresh().
    else {

      // Effectuer un appel AJAX pour obtenir tous les enregistrements dans la bdd.
      $http.get('/users').success(function(response){

        // Converti les résultats en format Google Map.
        locations = convertToMapPoints(response);

        // Initialise la carte(après conversion).
        initialize(latitude, longitude, false);
      }).error(function(){});
    }
  };

  // Fonctions internes privées
  // --------------------------------------------------------------------
  // Convertit un JSON d'utilisateurs en points de carte.
  var convertToMapPoints = function(response){

    // Efface le tableau locations.
    var locations = [];

    // Fait une boucle dans toutes les entrées JSON fournies dans la réponse.
    for(var i= 0; i < response.length; i++) {
      var user = response[i];

      // Créer une popup pour chaque enregistrement.
      var  contentString = '<p><b>Nom</b>: ' + user.username + '<br><b>Âge</b>: ' + user.age + '<br>' +
      '<b>Genre</b>: ' + user.gender + '<br><b>Language Favori</b>: ' + user.favlang + '</p>';

      // Convertit chacun des enregistrements JSON en format d'emplacement Google Maps (Note: format [Lat, Lng]).
      locations.push(new Location(
        new google.maps.LatLng(user.location[1], user.location[0]),
        new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 320
        }),
        user.username,
        user.gender,
        user.age,
        user.favlang
      ))
    }
    // locations est maintenant un tableau rempli d'enregistrements au format Google Maps.
    return locations;
  };

  // Constructeur pour l'emplacement.
  var Location = function(latlon, message, username, gender, age, favlang){
    this.latlon = latlon;
    this.message = message;
    this.username = username;
    this.gender = gender;
    this.age = age;
    this.favlang = favlang;
  };

  // Initialise la carte.
  var initialize = function(latitude, longitude, filter) {

    // Utilise la latitude selectionné, et la longitude comme point de départ.
    var myLatLng = {lat: selectedLat, lng: selectedLong};

    // Si la carte n'a pas encore été créée
    if (!map){

      // Créer une nouvelle carte et la placer dans la page index.html.
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: myLatLng
      });
    }


    // Si un filtre a été utilisé, définissez les icônes en jaune, sinon bleu.
    if(filter){
      icon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    }
    else{
      icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    }

    // Bouclez sur chaque éléments dans le tableau locations et placez un marqueur.
    locations.forEach(function(n, i){
      var marker = new google.maps.Marker({
        position: n.latlon,
        map: map,
        title: "Big Map",
        icon: icon,
      });

      // Pour chaque marqueur créé, ajoutez un listener qui vérifie les clics.
      google.maps.event.addListener(marker, 'click', function(e){

        // Au clique, ouvre le message du marqueur sélectionné.
        currentSelectedMarker = n;
        n.message.open(map, marker);
      });
    });

    // Définir l'emplacement initial comme marqueur rouge rebondissant.
    var initialLocation = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
      position: initialLocation,
      animation: google.maps.Animation.BOUNCE,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    lastMarker = marker;

    // Fonction pour se déplacer vers un emplacement sélectionné.
    map.panTo(new google.maps.LatLng(latitude, longitude));

    // Cliquer sur la carte déplace le marqueur rouge rebondissant.
    google.maps.event.addListener(map, 'click', function(e){
      var marker = new google.maps.Marker({
        position: e.latLng,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      });

      // Mettre à jour la variable diffusée (permet aux panneaux de modifier leurs valeurs latitude, longitude).
      googleMapService.clickLat = marker.getPosition().lat();
      googleMapService.clickLong = marker.getPosition().lng();
      $rootScope.$broadcast("clicked");

      // Lorsqu'un nouveau spot est sélectionné, supprimez le vieux marqueur rouge rebondissant.
      if(lastMarker){
        lastMarker.setMap(null);
      }

      // Créez un nouveau marqueur rouge rebondissant et ce déplacez vers celui-ci.
      lastMarker = marker;
      map.panTo(marker.position);

    });
  };

  // Charge la page lors du rafraîchissement de la fenêtre. Utilise la latitude et la longitude initiale.
  google.maps.event.addDomListener(window, 'load',
  googleMapService.refresh(selectedLat, selectedLong));

  return googleMapService;
});
