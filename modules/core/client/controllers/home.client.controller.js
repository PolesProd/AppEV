'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', 'leafletData', 'LotsService',
function ($scope, $http, Authentication, leafletData, LotsService) {
  var vm = this;
  // Cela fournit un contexte d'authentification.
  $scope.authentication = Authentication;

  // On récupère la liste des sites
  vm.lot = LotsService.query();

  $scope.lots = vm.lot;
  $scope.lots.$promise.then(function(resourceArray){
    $scope.item = resourceArray[0];
    /*console.log($scope.lots);*/
  });

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
            var siteImg, siteInfos, siteTitle, siteNum = '';
            var titleH1 = document.getElementById('map-info').parentElement.getElementsByTagName('h1')[0];

            for (var content in feature.properties){
              if(content === 'image'){
                siteImg = '<p class="siteInfos">' + feature.properties[content] + '</p>';
              } else if(content === 'description'){
                siteInfos += '<p class="siteInfos"><span> Taches à accomplire sur le site : </span>' + feature.properties[content] + '</p>';
              } else if(content === 'ID'){
                siteNum += '<p class="siteInfos"><span> Numéro du site : </span>' + feature.properties[content] + '</p>';
              } else if(content === 'nom'){
                titleH1.innerHTML = feature.properties[content];
              } else{
                siteInfos += '<p class="siteInfos"><span>' + content + ': </span>' + feature.properties[content] + '</p>';
              }
            }
            d.innerHTML = siteNum + siteImg + siteInfos;
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
