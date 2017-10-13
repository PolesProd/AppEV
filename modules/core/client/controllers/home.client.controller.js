'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', 'leafletData', 'LotsService', '$timeout',
function ($scope, $http, Authentication, leafletData, LotsService, $timeout) {
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
    angular.forEach($scope.lots, function(data) {
      $scope.item = [
        { id: data.properties.ID, name: data.properties.nom, surface: data.properties.surface, description: data.properties.description }
      ];
    });
  });

  // Paramétrage du carousel
  // $('.owl-carousel').owlCarousel({
  //   loop: true,
  //   margin: 10,
  //   nav: true,
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     600: {
  //       items: 3
  //     },
  //     1000: {
  //       items: 5
  //     }
  //   },
  //   autoplay: true,
  //   autoplayTimeout: 1000,
  //   autoplayHoverPause: true
  // });

  /*$(document).ready(function() {
    $('.collapse.in').prev('.panel-heading').addClass('active');
    $('#accordion, #bs-collapse')
      .on('show.bs.collapse', function(a) {
        $(a.target).prev('.panel-heading').addClass('active');
      })
      .on('hide.bs.collapse', function(a) {
        $(a.target).prev('.panel-heading').removeClass('active');
      });
  });*/

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
      /* angular.element('#myselector').triggerHandler('click') */
      // Explore le tableau des sites
      onEachFeature: function (feature, layer){

        layer.on({
          click: function showResultsInDiv(){
            var zoneMap = feature.properties.ID
            zoneMap = document.getElementById(zoneMap);

            if( zoneMap.attributes[2].nodeValue == 'false' ){
              // fermeture de tous les elements ouverts si il y en a
              var pan = document.getElementsByClassName('panel-collapse')
              for(var i = 0; i<pan.length; i++){
                if(pan[i].attributes[2].nodeValue == 'true')

                pan[i].previousElementSibling.classList.remove('active')
                pan[i].classList.remove('in');
                pan[i].attributes[2].nodeValue = 'false'
              }
              // Scroll to element in div
              $('#accordion').animate({
                scrollTop: $('#'+feature.properties.ID).prev()[0].offsetTop
              }, 500);

              // ouverture de la div de la zone selectionné
              zoneMap.previousElementSibling.classList.add('active');
              zoneMap.classList.add('collapsing');
              zoneMap.style.height = '';
              zoneMap.attributes[2].nodeValue = 'true';


              setTimeout(function() {
                zoneMap.classList.remove('collapsing');
                zoneMap.classList.add('in');
              }, 500);

            } else {
              // Si on reclique sur sur la meme div fermeture de la cible.
              var pan = document.getElementsByClassName('panel-collapse')
              for(var i = 0; i<pan.length; i++){
                if(pan[i].attributes[2].nodeValue == 'true')

                pan[i].previousElementSibling.classList.remove('active')
                pan[i].classList.remove('in');
                pan[i].attributes[2].nodeValue = 'false'
              }
            }

            console.log('#'+zoneMap);
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
