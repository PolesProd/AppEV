// Crée l'usine gservice. Ce sera le principal moyen par lequel nous interagissons avec Google Maps.
angular.module('gservice', [])
.factory('gservice', function($http){

    // Initialise les variables.
    // --------------------------------------------------------------------
    // Ce que notre service retournera.
    var googleMapService = {};

    // Tableau locations des emplacements obtenus à partir des appels API.
    var locations = [];

    // Lieu choisi (initialiser à vlg)
    var selectedLat = 39.50;
    var selectedLong = -98.35;

    // Fonctions
    // --------------------------------------------------------------------
    // Actualiser la carte avec de nouvelles données. La fonction prendra de nouvelles coordonnées de latitude et de longitude.
    googleMapService.refresh = function(latitude, longitude){

        // Efface le tableau locations.
        locations = [];

        // Définit la lat & la long sélectionnés égaux à ceux fournis sur l'appel refresh().
        selectedLat = latitude;
        selectedLong = longitude;

        // Effectuer un appel AJAX pour obtenir tous les enregistrements dans la bdd.
        $http.get('/users').success(function(response){

            // Converti les résultats en format Google Map.
            locations = convertToMapPoints(response);

            // Initialise la carte(après conversion).
            initialize(latitude, longitude);
        }).error(function(){});
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
            var  contentString =
            '<p><b>Username</b>: ' + user.username +
            '<br><b>Age</b>: ' + user.age +
            '<br><b>Gender</b>: ' + user.gender +
            '<br><b>Favorite Language</b>: ' + user.favlang +
            '</p>';

            // Convertit chacun des enregistrements JSON en format d'emplacement Google Maps (Note: format [Lat, Lng]).
            locations.push({
                latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                message: new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 320
                }),
                username: user.username,
                gender: user.gender,
                age: user.age,
                favlang: user.favlang
            });
        }
        // locations est maintenant un tableau rempli d'enregistrements au format Google Maps
        return locations;
    };

    // Initialise la carte.
    var initialize = function(latitude, longitude) {

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

        // Bouclez sur chaque éléments dans le tableau locations et placez un marqueur.
        locations.forEach(function(n, i){
            var marker = new google.maps.Marker({
                position: n.latlon,
                map: map,
                title: "Big Map",
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
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

    };

    // Charge la page lors du rafraîchissement de la fenêtre. Utilise la latitude et la longitude initiale.
    google.maps.event.addDomListener(window, 'load',
    googleMapService.refresh(selectedLat, selectedLong));

    return googleMapService;
});
