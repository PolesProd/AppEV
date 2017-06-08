// Teams service used to communicate Teams REST endpoints
(function () {
  'use strict';

  angular
  .module('teams')
  .factory('TeamsService', TeamsService);

  TeamsService.$inject = ['$resource', '$log'];

  function TeamsService($resource, $log) {
    var Team = $resource('/api/teams/:teamsId', {
      teamsId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Team.prototype, {
      createOrUpdate: function () {
        var team = this;
        return createOrUpdate(team);
      }
    });

    return Team;

    function createOrUpdate(team) {
      if (team._id) {
        return team.$update(onSuccess, onError);
      } else {
        return team.$sava(onSuccess, onError);
      }

      function onSuccess(team) {
        var success = team.data;
      }

      function onError(errorResponse) {
        var error = errorResponse.data;
        handleError(error);
      }
    }

    function handleError(error) {
      $log.error(error);
    }
  }
})();
