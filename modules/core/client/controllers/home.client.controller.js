'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', 'leafletData', 'LotsService',
function ($scope, $http, Authentication, leafletData, LotsService) {
  var vm = this;
  // Cela fournit un contexte d'authentification.
  $scope.authentication = Authentication;

  // Paramétrage de la carte
  angular.extend($scope, {
    center: {
      lat: 48.934070,
      lng: 2.327557,
      zoom: 15,
    },
    defaults: {
      scrollWheelZoom: false
    },
    tiles: {
      Name: 'Espaces Verts Villeneuve la garenne',
      url: 'https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.{ext}?apikey=1b867d39d33140e28748679b825287c8',
      options: {
        ext: 'png',
        attribution: '&copy; <a href="https://lepoles.org">LePoleSProd</a> | &copy; MARCHÉ PUBLIC - ESPACES VERTS MUNICIPALITE DE VILLENEUVE-LA-GARENNE'
      }
    },
    controls: {
      scale: true
    },
    legend: {
      position: 'bottomright',
      colors: [ '#2F8E25', '#28c9ff' ],
      labels: [ 'Gestion Ordinaire', 'Gestion Diférenciée' ]
    }
  });

  // On récupère la liste des sites
  vm.lot = LotsService.query();

  $scope.lots = vm.lot;
  $scope.lots.$promise.then(function(resourceArray){
    angular.forEach($scope.lots, function(data) {
      $scope.item = [
        { id: data.properties.ID, name: data.properties.nom, surface: data.properties.surface, description: data.properties.description }
      ];
    });
  });

  // On récupère les données geo des sites depuis un fichier json
  $http.get('modules/core/client/json/sites.json').then(function (response) {

    $scope.geojson = {
      data: response.data,
      style: {
        fillColor: '#2F8E25',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.7
      },
      // Explore le tableau des sites
      onEachFeature: function (feature, layer){

        if ('ecocert' === feature.properties.gestion) {
          layer.setStyle({
            fillColor: '#28c9ff'            
          });
        }
        
        layer.on({
          click: function showResultsInDiv(){

            var zoneMap = feature.properties.ID;
            zoneMap = document.getElementById(zoneMap);
            zoneMap.previousElementSibling.classList.add('active');
            zoneMap.classList.add('collapsing');

            setTimeout(function() {
               zoneMap.classList.remove('collapsing');
               zoneMap.classList.add('in');
              }, 500);
              console.log([zoneMap]);
          }
        });

        layer.on({
          mouseover: function(e) {
            layer.setStyle({
              color: '#2262CC',
              weight: 3,
              opacity: 0.6,
              fillOpacity: 0.65,
              fillColor: '#2262CC'
            });
          }
        });

        layer.on({
          mouseout: function(e) {
            layer.setStyle({
              fillColor: '#2F8E25',
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '1',
              fillOpacity: 0.7
            });
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
          return L.marker(latlng, { icon: leaf_icon });
        }
      }
    };
  });
}]);