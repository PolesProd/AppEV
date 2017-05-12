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

      describe('View Route', function () {
        var viewstate,
          PlanningsController,
          mockPlanning;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('plannings.view');
          $templateCache.put('modules/plannings/client/views/view-planning.client.view.html', '');

          // create mock Planning
          mockPlanning = new PlanningsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Planning Name'
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

        it('should attach an Planning to the controller scope', function () {
          expect($scope.vm.planning._id).toBe(mockPlanning._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/plannings/client/views/view-planning.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PlanningsController,
          mockPlanning;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('plannings.create');
          $templateCache.put('modules/plannings/client/views/form-planning.client.view.html', '');

          // create mock Planning
          mockPlanning = new PlanningsService();

          // Initialize Controller
          PlanningsController = $controller('PlanningsController as vm', {
            $scope: $scope,
            planningResolve: mockPlanning
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.planningResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/plannings/create');
        }));

        it('should attach an Planning to the controller scope', function () {
          expect($scope.vm.planning._id).toBe(mockPlanning._id);
          expect($scope.vm.planning._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/plannings/client/views/form-planning.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PlanningsController,
          mockPlanning;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('plannings.edit');
          $templateCache.put('modules/plannings/client/views/form-planning.client.view.html', '');

          // create mock Planning
          mockPlanning = new PlanningsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Planning Name'
          });

          // Initialize Controller
          PlanningsController = $controller('PlanningsController as vm', {
            $scope: $scope,
            planningResolve: mockPlanning
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:planningId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.planningResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            planningId: 1
          })).toEqual('/plannings/1/edit');
        }));

        it('should attach an Planning to the controller scope', function () {
          expect($scope.vm.planning._id).toBe(mockPlanning._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/plannings/client/views/form-planning.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
