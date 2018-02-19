(function () {
  'use strict';

  describe('Sites Admin Controller Tests', function () {
    // Initialize global variables
    var SitesAdminController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      SitesService,
      mockSite,
      Notification;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _SitesService_, _Notification_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      SitesService = _SitesService_;
      Notification = _Notification_;

      // Ignore parent template get on state transitions
      $httpBackend.whenGET('/modules/core/client/views/home.client.view.html').respond(200, '');

      // create mock site
      mockSite = new SitesService({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Site about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Sites controller.
      SitesAdminController = $controller('SitesAdminController as vm', {
        $scope: $scope,
        siteResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
      spyOn(Notification, 'error');
      spyOn(Notification, 'success');
    }));

    describe('vm.save() as create', function () {
      var sampleSitePostData;

      beforeEach(function () {
        // Create a sample site object
        sampleSitePostData = new SitesService({
          title: 'An Site about MEAN',
          content: 'MEAN rocks!'
        });

        $scope.vm.site = sampleSitePostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (SitesService) {
        // Set POST response
        $httpBackend.expectPOST('/api/sites', sampleSitePostData).respond(mockSite);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test Notification success was called
        expect(Notification.success).toHaveBeenCalledWith({ message: '<i class="glyphicon glyphicon-ok"></i> Site saved successfully!' });
        // Test URL redirection after the site was created
        expect($state.go).toHaveBeenCalledWith('admin.sites.list');
      }));

      it('should call Notification.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('/api/sites', sampleSitePostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect(Notification.error).toHaveBeenCalledWith({ message: errorMessage, title: '<i class="glyphicon glyphicon-remove"></i> Site save error!' });
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock site in $scope
        $scope.vm.site = mockSite;
      });

      it('should update a valid site', inject(function (SitesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/sites\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test Notification success was called
        expect(Notification.success).toHaveBeenCalledWith({ message: '<i class="glyphicon glyphicon-ok"></i> Site saved successfully!' });
        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('admin.sites.list');
      }));

      it('should  call Notification.error if error', inject(function (SitesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/sites\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect(Notification.error).toHaveBeenCalledWith({ message: errorMessage, title: '<i class="glyphicon glyphicon-remove"></i> Site save error!' });
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup sites
        $scope.vm.site = mockSite;
      });

      it('should delete the site and redirect to sites', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/sites\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect(Notification.success).toHaveBeenCalledWith({ message: '<i class="glyphicon glyphicon-ok"></i> Site deleted successfully!' });
        expect($state.go).toHaveBeenCalledWith('admin.sites.list');
      });

      it('should should not delete the site and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
