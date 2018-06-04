(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$http', '$timeout', 'Authentication', 'leafletData', 'SitesService'];

  function HomeController($scope, $http, $timeout, Authentication, leafletData, SitesService) {
    var vm = this;

    // Authentication
    $scope.authentication = Authentication;

    // Réglage de la carte
    angular.extend($scope, {
      center: {
        lat: 48.934070,
        lng: 2.327557,
        zoom: 15
      },
      defaults: {
        scrollWheelZoom: false
      },
      tiles: {
        Name: 'Espaces verts municipalité de Vilenneuve-la-garenne',
        url: 'https://api.mapbox.com/styles/v1/samba0/cjdtw2rr34n3r2sp1eih7kdyk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FtYmEwIiwiYSI6ImNqZDAyeHVvdzJqdTEyeHFvenNramtjdmgifQ.zzZNuZb6YRXUphjdUQbeFw',
        options: {
          ext: 'png',
          attribution: '&copy; ThunderForest | &copy; <a href="http://lepoles.org/"> &copy; LePoleS | &copy; <a href="http://thunderforest.com/maps/landscape/">ThunderForest - Landscape</a>'
        }
      },
      controls: {
        scale: true
      },
      legend: {
        position: 'bottomright',
        colors: ['#ecf386'],
        labels: ['Label ecocert']
      }
    });

    // Récupération des site depuis la base de donnée
    vm.sites = SitesService.query();

    $scope.sites = vm.sites;
    // $scope.sites.$promise.then(function(resourceArray){
    //   angular.forEach($scope.sites, function(data) {
    //     $scope.item = [
    //       { id: data.properties.ID, name: data.properties.nom, surface: data.properties.surface, description: data.properties.description }
    //     ];
    //   });
    // });

    // Ajout des site sur la carte
    $http.get('modules/core/client/data/map.geojson').then(function(res) {
      $scope.geojson = {
        data: res.data,
        style: {
          fillColor: '#2f8e25',
          weight: 2,
          opacity: 1,
          color: '#fff',
          dashArray: '1',
          fillOpacity: 0.7
        },
        // angular.element('#myselector').triggerHandler('click');
        onEachFeature: function(feature, layer) {
          layer.on({
            click: function showResultsInDiv() {
              var zoneMap = feature.properties.ID
              zoneMap = document.getElementById(zoneMap);
              if (zoneMap.attributes[2].nodeValue === 'false') {
                // fermeture de tous les elements ouverts si il y en a
                var pan = document.getElementsByClassName('panel-collapse');
                for (var i = 0; i < pan.length; i++) {
                  if (pan[i].attributes[2].nodeValue === 'true')
                    pan[i].previousElementSibling.classList.remove('active');
                  pan[i].classList.remove('in');
                  pan[i].attributes[2].nodeValue = 'false';
                }
                // Scroll to element in div
                $('#accordion').animate({
                  scrollTop: $('#' + feature.properties.ID).prev()[0].offsetTop
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
                var pan = document.getElementsByClassName('panel-collapse');
                for (var i = 0; i < pan.length; i++) {
                  if (pan[i].attributes[2].nodeValue == 'true');

                  pan[i].previousElementSibling.classList.remove('active');
                  pan[i].classList.remove('in');
                  pan[i].attributes[2].nodeValue = 'false';
                }
              }
              console.log('#' + zoneMap);
              console.log(zoneMap);
            }
          });
        },

        pointToLayer: function(feature, latlng) {
          var arbre = feature.geometry.type;
          // var leaf_icon = L.icon({
          //   iconUrl: 'modules/core/client/img/icons/arbre.png',
          //   shadowUrl: 'modules/core/client/img/icons/arbre_ombre.png',
          //   iconSize: [16, 22],
          //   shadowSize: [16, 22]
          // });

          if (arbre === 'Point') {
            return L.marker(latlng /* , { icon: leaf_icon } */ );
          }
        }
      };
    });
  }
}());