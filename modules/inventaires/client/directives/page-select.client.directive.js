(function() {
  'use strict';

  angular
    .module('inventaires')
    .directive('pageSelect', pageSelect);

  pageSelect.$inject = [];

  function pageSelect() {
    return {
      restrict: 'E',
      template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
      link: function(scope, element, attrs) {
        scope.$watch('currentPage', function(c) {
          scope.inputPage = c;
        });
      }
    };
  }
})();