(function () {
  'use strict';

  // Lots controller
  angular
  .module('lots')
  .controller('LotsController', LotsController);

  LotsController.$inject = ['$scope', '$state', '$http', '$window', '$location', 'Authentication', 'lotResolve'];

  function LotsController ($scope, $state, $http, $window, $location, Authentication, lot) {
    var vm = this;
    var location = $location.$$url.slice(6, 30);

    vm.authentication = Authentication;
    vm.lot = lot;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    $http.get('modules/core/client/json/sites.json').success(function (response) {
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

    // Remove existing Lot
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.lot.$remove($state.go('lots.list'));
      }
    }

    // Save Lot
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.lotForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.lot._id) {
        vm.lot.$update(successCallback, errorCallback);
      } else {
        vm.lot.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('lots.view', {
          lotId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
