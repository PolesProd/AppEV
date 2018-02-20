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
          mainstate = $state.get('admin.plannings');
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
          liststate = $state.get('admin.plannings.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/plannings/client/views/admin/list-plannings.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PlanningsAdminController,
          mockPlanning;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.plannings.create');
          $templateCache.put('/modules/plannings/client/views/admin/form-planning.client.view.html', '');

          // Create mock planning
          mockPlanning = new PlanningsService();

          // Initialize Controller
          PlanningsAdminController = $controller('PlanningsAdminController as vm', {
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
          expect($state.href(createstate)).toEqual('/admin/plannings/create');
        }));

        it('should attach an planning to the controller scope', function () {
          expect($scope.vm.planning._id).toBe(mockPlanning._id);
          expect($scope.vm.planning._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('/modules/plannings/client/views/admin/form-planning.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PlanningsAdminController,
          mockPlanning;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.plannings.edit');
          $templateCache.put('/modules/plannings/client/views/admin/form-planning.client.view.html', '');

          // Create mock planning
          mockPlanning = new PlanningsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Planning about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          PlanningsAdminController = $controller('PlanningsAdminController as vm', {
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
          })).toEqual('/admin/plannings/1/edit');
        }));

        it('should attach an planning to the controller scope', function () {
          expect($scope.vm.planning._id).toBe(mockPlanning._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('/modules/plannings/client/views/admin/form-planning.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
