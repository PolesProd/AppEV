(function () {
  'use strict';

  // Signatures controller
  angular
    .module('signatures')
    .controller('SignaturesController', SignaturesController);

  SignaturesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'signatureResolve', 'EmployesService'];

  function SignaturesController ($scope, $state, $window, Authentication, signature, EmployesService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.signature = signature;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    $scope.employes = EmployesService.query();
    $scope.employes.$promise.then(function(resourceArray) {
      $scope.employe = [];
      $scope.employe = resourceArray;

      angular.forEach($scope.employes, function(data) {
        $scope.item.push({
          lastname: data.lastname,
          firstname: data.firstname
        });
      });
    });

    $scope.myAppObjects = [{
      cb1: "Présent",
      cb2: "Absent",
      cb3: "En Congé",
      cb4: "En Formation",
      cb5: "En Récupération",
      cb6: "Abscence Non Justifiée",
      cb7: "Abscence Justifiée",
      cb8: "Arrêt Maladie",
      cb9: "Accident de Travail"
    }];

    /*$scope.test = [
      { cb1: false title: "Présent" },
      { cb2: false title: "Absent" },
      { cb3: false title: "En Congé" },
      { cb4: false title: "En Formation" },
      { cb5: false title: "En Récupération" },
      { cb6: false title: "Abscence Non Justifiée" },
      { cb7: false title: "Abscence Justifiée" },
      { cb8: false title: "Arrêt Maladie" },
      { cb9: false title: "Accident de Travail" }
    ];*/

    $scope.checkedItems = function() {
      var checkedItems = [];
      angular.forEach($scope.employes, function(e, arrayIndex){
        angular.forEach(e, function(cb, key) {
          if(key.substring(0, 2) == "cb" && cb) {
            checkedItems.push(e.lastname +  ' ' + e.firstname + '-' + key);
            angular.forEach($scope.test, function(data) {
              console.log(data);

            });
          }
        })
      })
      return checkedItems
    }

    // Remove existing Signature
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.signature.$remove($state.go('signatures.list'));
      }
    }

    // Save Signature
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.signatureForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.signature._id) {
        vm.signature.$update(successCallback, errorCallback);
      } else {
        vm.signature.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('signatures.view', {
          signatureId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
