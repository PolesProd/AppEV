(function () {
  'use strict';

  describe('Finances Route Tests', function () {
    // Initialize global variables
    var $scope,
      FinancesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _FinancesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      FinancesService = _FinancesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('finances');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/finances');
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
          FinancesController,
          mockFinance;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('finances.view');
          $templateCache.put('modules/finances/client/views/view-finance.client.view.html', '');

          // create mock Finance
          mockFinance = new FinancesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Finance Name'
          });

          // Initialize Controller
          FinancesController = $controller('FinancesController as vm', {
            $scope: $scope,
            financeResolve: mockFinance
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:financeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.financeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            financeId: 1
          })).toEqual('/finances/1');
        }));

        it('should attach an Finance to the controller scope', function () {
          expect($scope.vm.finance._id).toBe(mockFinance._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/finances/client/views/view-finance.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          FinancesController,
          mockFinance;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('finances.create');
          $templateCache.put('modules/finances/client/views/form-finance.client.view.html', '');

          // create mock Finance
          mockFinance = new FinancesService();

          // Initialize Controller
          FinancesController = $controller('FinancesController as vm', {
            $scope: $scope,
            financeResolve: mockFinance
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.financeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/finances/create');
        }));

        it('should attach an Finance to the controller scope', function () {
          expect($scope.vm.finance._id).toBe(mockFinance._id);
          expect($scope.vm.finance._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/finances/client/views/form-finance.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          FinancesController,
          mockFinance;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('finances.edit');
          $templateCache.put('modules/finances/client/views/form-finance.client.view.html', '');

          // create mock Finance
          mockFinance = new FinancesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Finance Name'
          });

          // Initialize Controller
          FinancesController = $controller('FinancesController as vm', {
            $scope: $scope,
            financeResolve: mockFinance
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:financeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.financeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            financeId: 1
          })).toEqual('/finances/1/edit');
        }));

        it('should attach an Finance to the controller scope', function () {
          expect($scope.vm.finance._id).toBe(mockFinance._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/finances/client/views/form-finance.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
