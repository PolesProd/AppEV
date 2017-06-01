'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', 'leafletData',
function ($scope, $http, Authentication, leafletData) {
  // Cela fournit un contexte d'authentification.
  $scope.authentication = Authentication;

  // On récupère les données geo des sites depuis un fichier json
  $http.get('modules/core/client/json/sites.json').then(function (response) {
    $scope.geojson = {
      data: response.data,
      style: {
        'fillColor': '#ff0000',
        'fillOpacity': 0.5,
        'color': '#000000',
        'opacity': 0.2
      },
      onEachFeature: function (feature, layer){
        layer.on({
          click: function showResultsInDiv() {
            var d = document.getElementById('map-info');
            d.innerHTML = '';
            for (var content in feature.properties){
              d.innerHTML += content + ': ' + feature.properties[content] + '<br>';
            }
          }
        });
      },
      pointToLayer: function (feature, latlng) {
        var arbre = feature.geometry.type;
        var leaf_icon = L.icon({
            iconUrl: 'modules/core/client/img/icons/arbre.png',
            shadowUrl: 'modules/core/client/img/icons/arbre_ombre.png',
            iconSize: [16, 22],
            shadowSize: [16, 22]
          });

        if (arbre === 'Point') {
          return L.marker(latlng, { icon: leaf_icon } );
        }
      }
    };
  });

  angular.extend($scope, {
    center: {
      lat: 48.934070,
      lng: 2.327557,
      zoom: 16,
    },
    defaults: {
      scrollWheelZoom: true
    },
    tiles: {
      Name: 'Espaces Verts Villeneuve la garenne',
      url: 'https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.{ext}?apikey=1b867d39d33140e28748679b825287c8',
      options: {
        ext: 'png',
        attribution: '&copy; ThunderForest | &copy; <a href="http://thunderforest.com/maps/landscape/">ThunderForest - Landscape</a>'
      }
    },
    controls: {
      scale: true
    },
    legend: {
      position: 'bottomright',
      colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
      labels: [ 'Légende 1', 'Légende 2', 'Légende 3', 'Légende 4' ]
    }
  });
}]);
