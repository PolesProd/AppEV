(function () {
  'use strict';

  describe('Signatures Route Tests', function () {
    // Initialize global variables
    var $scope,
      SignaturesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SignaturesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SignaturesService = _SignaturesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('signatures');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/signatures');
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
          SignaturesController,
          mockSignature;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('signatures.view');
          $templateCache.put('modules/signatures/client/views/view-signature.client.view.html', '');

          // create mock Signature
          mockSignature = new SignaturesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Signature Name'
          });

          // Initialize Controller
          SignaturesController = $controller('SignaturesController as vm', {
            $scope: $scope,
            signatureResolve: mockSignature
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:signatureId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.signatureResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            signatureId: 1
          })).toEqual('/signatures/1');
        }));

        it('should attach an Signature to the controller scope', function () {
          expect($scope.vm.signature._id).toBe(mockSignature._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/signatures/client/views/view-signature.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SignaturesController,
          mockSignature;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('signatures.create');
          $templateCache.put('modules/signatures/client/views/form-signature.client.view.html', '');

          // create mock Signature
          mockSignature = new SignaturesService();

          // Initialize Controller
          SignaturesController = $controller('SignaturesController as vm', {
            $scope: $scope,
            signatureResolve: mockSignature
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.signatureResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/signatures/create');
        }));

        it('should attach an Signature to the controller scope', function () {
          expect($scope.vm.signature._id).toBe(mockSignature._id);
          expect($scope.vm.signature._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/signatures/client/views/form-signature.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SignaturesController,
          mockSignature;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('signatures.edit');
          $templateCache.put('modules/signatures/client/views/form-signature.client.view.html', '');

          // create mock Signature
          mockSignature = new SignaturesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Signature Name'
          });

          // Initialize Controller
          SignaturesController = $controller('SignaturesController as vm', {
            $scope: $scope,
            signatureResolve: mockSignature
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:signatureId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.signatureResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            signatureId: 1
          })).toEqual('/signatures/1/edit');
        }));

        it('should attach an Signature to the controller scope', function () {
          expect($scope.vm.signature._id).toBe(mockSignature._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/signatures/client/views/form-signature.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
