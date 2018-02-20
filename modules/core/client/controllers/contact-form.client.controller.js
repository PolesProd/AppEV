'use strict';

angular
  .module('core')
  .controller('ContactFormController', ['$scope', '$http', '$mdToast', '$animate',
    function($scope, $http, $mdToast, $animate) {
      // Expose new variable
      $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };

      $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
          .filter(function(pos) {
            return $scope.toastPosition[pos];
          })
          .join('');
      };

      this.sendMail = function() {
        var data = ({
          contactName: this.contactName,
          contactEmail: this.contactEmail,
          contactMsg: this.contactMsg
        });

        // Demande POST(transmission de données):
        $http.post('/contact', data).success(function(data, status, headers, config) {
          // Ce callback s'appellera de manière asynchrone lorsque la réponse sera disponible

          $mdToast.show(
            $mdToast.simple()
              .content(data.contactName + ' Votre message à bien été envoyé. Merci !!')
              .position($scope.getToastPosition())
              .hideDelay(5000)
          );
        })
          .error(function(data, status, headers, config) {
            // Appelé de manière asynchrone si une erreur survient ou
            // que le serveur retourne une réponse avec un état d'erreur

          });
      };
    }
  ]);
