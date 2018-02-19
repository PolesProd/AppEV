(function () {
  'use strict';

  angular
    .module('sites.admin')
    .controller('SitesAdminController', SitesAdminController);

  SitesAdminController.$inject = ['$scope', '$state', '$window', 'siteResolve', 'Authentication', 'Notification'];

  function SitesAdminController($scope, $state, $window, site, Authentication, Notification) {
    var vm = this;

    vm.site = site;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Site
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.site.$remove(function () {
          $state.go('admin.sites.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Site deleted successfully!' });
        });
      }
    }

    // Save Site
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.siteForm');
        return false;
      }

      // Create a new site, or update the current instance
      vm.site.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.sites.list'); // should we send the User to the list or the updated Site's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Site saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Site save error!' });
      }
    }
  }
}());
