'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', 'leafletData',
function ($scope, $http, Authentication, leafletData) {
  // This provides Authentication context.
  $scope.authentication = Authentication;

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

  // On récupère les données geo des sites depuis un fichier json
  $http.get('modules/core/client/json/sites.json')
  .then(function (data, status) {
    angular.extend($scope, {
      geojson: {
        data: data,
        style: {
          fillColor: 'green',
          weight: 2,
          opacity: 1,
          color: 'white',
          // dashArray: '3',
          fillOpacity: 0.7
        }
      }
    });
  });

  $http.get('modules/core/client/json/arbres.json')
  .then(function (data, status) {
    angular.extend($scope, {
      geojson: {
        data: data
      }
    });
  });

  // $http.get("modules/core/client/json/arbres.json")
  // .then(function (response) {
  //   $scope.foo = response.data;
  // });
  // $http.get("modules/core/client/json/sites.json")
  // .then(function (response) {
  //   $scope.bar = response.data;
  // });
}
]);
