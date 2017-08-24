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

  // On récupère la liste des sites
  vm.lot = LotsService.query();

  $scope.lots = vm.lot;
  $scope.lots.$promise.then(function(resourceArray){
    $scope.item = [
      { name: resourceArray[0].nom, surface: resourceArray[0].surface, tasks: resourceArray[0].tasks }
    ];
  });

  // Paramétrage du carousel
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    },
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true
  });

  $(document).ready(function() {
    $('.collapse.in').prev('.panel-heading').addClass('active');
    $('#accordion, #bs-collapse')
      .on('show.bs.collapse', function(a) {
        $(a.target).prev('.panel-heading').addClass('active');
      })
      .on('hide.bs.collapse', function(a) {
        $(a.target).prev('.panel-heading').removeClass('active');
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

            // Mise en surbrillance du site au clique
            function lotsHighlighting () {
              if (layer.feature.geometry.type === 'Polygon') {
                layer.setStyle({
                  fillColor:'#2ABB0B',
                  dashArray: '3'
                });
              } else if(layer.feature.geometry.type === 'MultiPolygon'){
                layer.setStyle({
                  fillColor:'#2ABB0B',
                  dashArray: '3'
                });
              }
            }
            lotsHighlighting();
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
