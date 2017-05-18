'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', 'leafletData',
function ($scope, $http, Authentication, leafletData) {
  // This provides Authentication context.
  $scope.authentication = Authentication;
  // $scope.leafletdata = leafletData;

  // On récupère les données geo des sites depuis un fichier json
  $http.get('modules/core/client/json/sites.json').then(function (response) {
    $scope.geojson = {
      data: response.data,
      // message: {
      //   polygon: response.data.features.properties,
      //   point: response.data.features.properties
      // },
      style: {
        'fillColor': '#ff0000',
        'fillOpacity': 0.5,
        'color': '#000000',
        'opacity': 0.2
      }
    };
  });

  $scope.$on('leafletDirectiveMarker.mouseover', function(event, args){
    console.log('I am over!');
    var popup = leafletData.popup()
    .setLatLng([args.model.lat, args.model.lng])
    .setContent(args.model.message);
    leafletData.getMap().then(function(map) {
      popup.openOn(map);
    });
  });

  $scope.$on('leafletDirectiveMarker.mouseout', function(event){
    leafletData.getMap().then(function(map) {
      map.closePopup();
    });
  });


  angular.extend($scope, {
    center: {
      lat: 48.934070,
      lng: 2.327557,
      zoom: 15
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
