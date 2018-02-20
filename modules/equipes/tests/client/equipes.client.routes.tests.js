(function () {
  'use strict';

  describe('Equipes Route Tests', function () {
    // Initialize global variables
    var $scope,
      EquipesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _EquipesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      EquipesService = _EquipesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('equipes');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/equipes');
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
          liststate = $state.get('equipes.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/equipes/client/views/list-equipes.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          EquipesController,
          mockEquipe;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('equipes.view');
          $templateCache.put('/modules/equipes/client/views/view-equipe.client.view.html', '');

          // create mock equipe
          mockEquipe = new EquipesService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Equipe about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          EquipesController = $controller('EquipesController as vm', {
            $scope: $scope,
            equipeResolve: mockEquipe
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:equipeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.equipeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            equipeId: 1
          })).toEqual('/equipes/1');
        }));

        it('should attach an equipe to the controller scope', function () {
          expect($scope.vm.equipe._id).toBe(mockEquipe._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('/modules/equipes/client/views/view-equipe.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope, $templateCache) {
          $templateCache.put('/modules/equipes/client/views/list-equipes.client.view.html', '');

          $state.go('equipes.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('equipes/');
          $rootScope.$digest();

          expect($location.path()).toBe('/equipes');
          expect($state.current.templateUrl).toBe('/modules/equipes/client/views/list-equipes.client.view.html');
        }));
      });
    });
  });
}());
