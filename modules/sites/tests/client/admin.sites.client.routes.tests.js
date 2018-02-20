(function () {
  'use strict';

  describe('Sites Route Tests', function () {
    // Initialize global variables
    var $scope,
      SitesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SitesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SitesService = _SitesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('admin.sites');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/sites');
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
          liststate = $state.get('admin.sites.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/sites/client/views/admin/list-sites.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SitesAdminController,
          mockSite;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.sites.create');
          $templateCache.put('/modules/sites/client/views/admin/form-site.client.view.html', '');

          // Create mock site
          mockSite = new SitesService();

          // Initialize Controller
          SitesAdminController = $controller('SitesAdminController as vm', {
            $scope: $scope,
            siteResolve: mockSite
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.siteResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/sites/create');
        }));

        it('should attach an site to the controller scope', function () {
          expect($scope.vm.site._id).toBe(mockSite._id);
          expect($scope.vm.site._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('/modules/sites/client/views/admin/form-site.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SitesAdminController,
          mockSite;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.sites.edit');
          $templateCache.put('/modules/sites/client/views/admin/form-site.client.view.html', '');

          // Create mock site
          mockSite = new SitesService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Site about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          SitesAdminController = $controller('SitesAdminController as vm', {
            $scope: $scope,
            siteResolve: mockSite
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:siteId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.siteResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            siteId: 1
          })).toEqual('/admin/sites/1/edit');
        }));

        it('should attach an site to the controller scope', function () {
          expect($scope.vm.site._id).toBe(mockSite._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('/modules/sites/client/views/admin/form-site.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
