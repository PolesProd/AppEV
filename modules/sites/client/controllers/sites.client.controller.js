(function () {
  'use strict';

  angular
    .module('sites')
    .controller('SitesController', SitesController);

  SitesController.$inject = ['$scope', '$http', '$location', 'siteResolve', 'Authentication'];

  function SitesController($scope, $http, $location, site, Authentication) {
    var vm = this;
    var location = $location.$$url.slice(6,30);

    vm.site = site;
    vm.authentication = Authentication;

    $http.get('modules/core/client/data/sites.json').success(function (response) {
      // Initialise mon tableau
      $scope.siteInfo = [];

      // Injecte les données provenant de modules/lots/client/json/sites.json
      $scope.siteInfo = response.features;

      angular.forEach($scope.siteInfo, function (data) {
        // récupère le type de données(Point, Polygon, MultiPolygon)
        var type = data.geometry.type;

        // Récupères tous les ids
        var ids = data.properties.ID;
        // console.log(ids);
        // Vérifie que les données corespondent bien au sites(Polygon, MultiPolygon)
        if (type !== 'Point' && ids === location) {
          // console.log('Je suis celui que tu cherche !!!');
          var d = document.getElementById('infos');
          var siteNum, siteTitle, siteImg, siteInfos = '';

          for (var content in data.properties){
            if(content === 'image1' && 'image2' && 'image3' && 'image4' && 'image5'){
              siteImg = '<p class="siteInfos">' + data.properties[content] + '</p>';
            } else if(content === 'description'){
              siteInfos += '<p class="siteInfos"><span> Taches à accomplire sur le site : </span>' + data.properties[content] + '</p>';
            } else if(content === 'ID'){
              siteNum += '<p class="siteInfos"><span> Numéro du site : </span>' + data.properties[content] + '</p>';
            } else if(content === 'nom'){
              // titleH1.innerHTML = data.properties[content];
            } else{
              siteInfos += '<p class="siteInfos"><span>' + content + ': </span>' + data.properties[content] + '</p>';
            }
          }
          d.innerHTML = siteNum + siteImg + siteInfos;
        }
      });

      return response;
    });
  }
}());
