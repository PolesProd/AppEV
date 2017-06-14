(function () {
  'use strict';

  describe('Employes Route Tests', function () {
    // Initialize global variables
    var $scope,
      EmployesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _EmployesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      EmployesService = _EmployesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('employes');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/employes');
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
          EmployesController,
          mockEmploye;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('employes.view');
          $templateCache.put('modules/employes/client/views/view-employe.client.view.html', '');

          // create mock Employe
          mockEmploye = new EmployesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Employe Name'
          });

          // Initialize Controller
          EmployesController = $controller('EmployesController as vm', {
            $scope: $scope,
            employeResolve: mockEmploye
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:employeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.employeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            employeId: 1
          })).toEqual('/employes/1');
        }));

        it('should attach an Employe to the controller scope', function () {
          expect($scope.vm.employe._id).toBe(mockEmploye._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/employes/client/views/view-employe.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          EmployesController,
          mockEmploye;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('employes.create');
          $templateCache.put('modules/employes/client/views/form-employe.client.view.html', '');

          // create mock Employe
          mockEmploye = new EmployesService();

          // Initialize Controller
          EmployesController = $controller('EmployesController as vm', {
            $scope: $scope,
            employeResolve: mockEmploye
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.employeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/employes/create');
        }));

        it('should attach an Employe to the controller scope', function () {
          expect($scope.vm.employe._id).toBe(mockEmploye._id);
          expect($scope.vm.employe._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/employes/client/views/form-employe.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          EmployesController,
          mockEmploye;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('employes.edit');
          $templateCache.put('modules/employes/client/views/form-employe.client.view.html', '');

          // create mock Employe
          mockEmploye = new EmployesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Employe Name'
          });

          // Initialize Controller
          EmployesController = $controller('EmployesController as vm', {
            $scope: $scope,
            employeResolve: mockEmploye
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:employeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.employeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            employeId: 1
          })).toEqual('/employes/1/edit');
        }));

        it('should attach an Employe to the controller scope', function () {
          expect($scope.vm.employe._id).toBe(mockEmploye._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/employes/client/views/form-employe.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
