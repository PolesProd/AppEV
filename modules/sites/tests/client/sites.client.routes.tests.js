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
          mainstate = $state.get('sites');
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
          liststate = $state.get('sites.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/sites/client/views/list-sites.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          SitesController,
          mockSite;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('sites.view');
          $templateCache.put('/modules/sites/client/views/view-site.client.view.html', '');

          // create mock site
          mockSite = new SitesService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Site about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          SitesController = $controller('SitesController as vm', {
            $scope: $scope,
            siteResolve: mockSite
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:siteId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.siteResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            siteId: 1
          })).toEqual('/sites/1');
        }));

        it('should attach an site to the controller scope', function () {
          expect($scope.vm.site._id).toBe(mockSite._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('/modules/sites/client/views/view-site.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope, $templateCache) {
          $templateCache.put('/modules/sites/client/views/list-sites.client.view.html', '');

          $state.go('sites.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('sites/');
          $rootScope.$digest();

          expect($location.path()).toBe('/sites');
          expect($state.current.templateUrl).toBe('/modules/sites/client/views/list-sites.client.view.html');
        }));
      });
    });
  });
}());
