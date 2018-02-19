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
          mainstate = $state.get('admin.equipes');
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
          liststate = $state.get('admin.equipes.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/equipes/client/views/admin/list-equipes.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          EquipesAdminController,
          mockEquipe;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.equipes.create');
          $templateCache.put('/modules/equipes/client/views/admin/form-equipe.client.view.html', '');

          // Create mock equipe
          mockEquipe = new EquipesService();

          // Initialize Controller
          EquipesAdminController = $controller('EquipesAdminController as vm', {
            $scope: $scope,
            equipeResolve: mockEquipe
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.equipeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/equipes/create');
        }));

        it('should attach an equipe to the controller scope', function () {
          expect($scope.vm.equipe._id).toBe(mockEquipe._id);
          expect($scope.vm.equipe._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('/modules/equipes/client/views/admin/form-equipe.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          EquipesAdminController,
          mockEquipe;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.equipes.edit');
          $templateCache.put('/modules/equipes/client/views/admin/form-equipe.client.view.html', '');

          // Create mock equipe
          mockEquipe = new EquipesService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Equipe about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          EquipesAdminController = $controller('EquipesAdminController as vm', {
            $scope: $scope,
            equipeResolve: mockEquipe
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:equipeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.equipeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            equipeId: 1
          })).toEqual('/admin/equipes/1/edit');
        }));

        it('should attach an equipe to the controller scope', function () {
          expect($scope.vm.equipe._id).toBe(mockEquipe._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('/modules/equipes/client/views/admin/form-equipe.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
