(function () {
  'use strict';

  describe('Plannings Route Tests', function () {
    // Initialize global variables
    var $scope,
      PlanningsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PlanningsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PlanningsService = _PlanningsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('plannings');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/plannings');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('plannings.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/plannings/client/views/list-plannings.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          PlanningsController,
          mockPlanning;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('plannings.view');
          $templateCache.put('/modules/plannings/client/views/view-planning.client.view.html', '');

          // create mock planning
          mockPlanning = new PlanningsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Planning about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          PlanningsController = $controller('PlanningsController as vm', {
            $scope: $scope,
            planningResolve: mockPlanning
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:planningId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.planningResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            planningId: 1
          })).toEqual('/plannings/1');
        }));

        it('should attach an planning to the controller scope', function () {
          expect($scope.vm.planning._id).toBe(mockPlanning._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('/modules/plannings/client/views/view-planning.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope, $templateCache) {
          $templateCache.put('/modules/plannings/client/views/list-plannings.client.view.html', '');

          $state.go('plannings.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('plannings/');
          $rootScope.$digest();

          expect($location.path()).toBe('/plannings');
          expect($state.current.templateUrl).toBe('/modules/plannings/client/views/list-plannings.client.view.html');
        }));
      });
    });
  });
}());
