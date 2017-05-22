'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', 'leafletData',
function ($scope, $http, Authentication, leafletData) {
  // This provides Authentication context.
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
      // onEachFeature: function (feature, layer){
      //   layer.on({
      //     click: function showResultsInDiv() {
      //       var d = document.getElementById('site-info');
      //       d.innerHTML = "";
      //       for (feature in feature.properties){
      //         d.innerHTML += feature + ": " + feature.properties + "<br>";
      //       }
      //       console.log(d.innerHTML);
      //     }
      //   });
      // }

      onEachFeature: function (feature, layer) {
        layer.on({
          click: function (e) {
            if (feature.geometry.type !== 'Point') {
              document.getElementById('id').innerHTML = '<label>ID: </label> ' + feature.properties.ID
              document.getElementById('name').innerHTML = '<label>Nom: </label> ' + feature.properties.nom
              document.getElementById('content').innerHTML = '<label>Description: </label> ' + feature.properties.message
            } else {
              document.getElementById('id').innerHTML = '<label>ID: </label> ' + feature.properties.ID
              document.getElementById('essence_scient').innerHTML = '<label>Essence(scientifique): </label> ' + feature.properties.essence_scient
              document.getElementById('essence_commun').innerHTML = '<label>Essence(commun): </label> ' + feature.properties.essence_commun
              document.getElementById('classe_age').innerHTML = '<label>Classe/Âge: </label> ' + feature.properties.classe_age
              document.getElementById('circonference').innerHTML = '<label>Circonférence: </label> ' + feature.properties.circonference
              document.getElementById('hauteur').innerHTML = '<label>Hauteur: </label> ' + feature.properties.hauteur
              document.getElementById('nom_rue').innerHTML = '<label>Nom rue: </label> ' + feature.properties.nom_rue
              document.getElementById('num_emp').innerHTML = '<label>N° Emp.: </label> ' + feature.properties.num_emp
              document.getElementById('statut_emp').innerHTML = '<label>Satus Emp.: </label> ' + feature.properties.statut_emp
              document.getElementById('geo_point_2d').innerHTML = '<label>Localisation: </label> ' + feature.properties.geo_point_2d
              document.getElementById('num_rd').innerHTML = '<label>N° route: </label> ' + feature.properties.num_rd
              document.getElementById('commune').innerHTML = '<label>Commune: </label> ' + feature.properties.commune
              document.getElementById('code_insee').innerHTML = '<label>Code Insee: </label> ' + feature.properties.code_insee
              document.getElementById('date_maj').innerHTML = '<label>Date Màj: </label> ' + feature.properties.date_maj
            }
          }
        })
      }
    };
  });

  angular.extend($scope, {
    center: {
      lat: 48.934070,
      lng: 2.327557,
      zoom: 16
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
}
]);
