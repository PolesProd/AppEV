'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Site = mongoose.model('Site'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  site;

/**
 * Site routes tests
 */
describe('Site Admin CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose.connection.db);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      usernameOrEmail: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      roles: ['user', 'admin'],
      username: credentials.usernameOrEmail,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new site
    user.save()
      .then(function () {
        site = {
          title: 'Site Title',
          content: 'Site Content'
        };

        done();
      })
      .catch(done);
  });

  it('should be able to save an site if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new site
        agent.post('/api/sites')
          .send(site)
          .expect(200)
          .end(function (siteSaveErr, siteSaveRes) {
            // Handle site save error
            if (siteSaveErr) {
              return done(siteSaveErr);
            }

            // Get a list of sites
            agent.get('/api/sites')
              .end(function (sitesGetErr, sitesGetRes) {
                // Handle site save error
                if (sitesGetErr) {
                  return done(sitesGetErr);
                }

                // Get sites list
                var sites = sitesGetRes.body;

                // Set assertions
                (sites[0].user._id).should.equal(userId);
                (sites[0].title).should.match('Site Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an site if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new site
        agent.post('/api/sites')
          .send(site)
          .expect(200)
          .end(function (siteSaveErr, siteSaveRes) {
            // Handle site save error
            if (siteSaveErr) {
              return done(siteSaveErr);
            }

            // Update site title
            site.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing site
            agent.put('/api/sites/' + siteSaveRes.body._id)
              .send(site)
              .expect(200)
              .end(function (siteUpdateErr, siteUpdateRes) {
                // Handle site update error
                if (siteUpdateErr) {
                  return done(siteUpdateErr);
                }

                // Set assertions
                (siteUpdateRes.body._id).should.equal(siteSaveRes.body._id);
                (siteUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an site if no title is provided', function (done) {
    // Invalidate title field
    site.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new site
        agent.post('/api/sites')
          .send(site)
          .expect(422)
          .end(function (siteSaveErr, siteSaveRes) {
            // Set message assertion
            (siteSaveRes.body.message).should.match('Title cannot be blank');

            // Handle site save error
            done(siteSaveErr);
          });
      });
  });

  it('should be able to delete an site if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new site
        agent.post('/api/sites')
          .send(site)
          .expect(200)
          .end(function (siteSaveErr, siteSaveRes) {
            // Handle site save error
            if (siteSaveErr) {
              return done(siteSaveErr);
            }

            // Delete an existing site
            agent.delete('/api/sites/' + siteSaveRes.body._id)
              .send(site)
              .expect(200)
              .end(function (siteDeleteErr, siteDeleteRes) {
                // Handle site error error
                if (siteDeleteErr) {
                  return done(siteDeleteErr);
                }

                // Set assertions
                (siteDeleteRes.body._id).should.equal(siteSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single site if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new site model instance
    site.user = user;
    var siteObj = new Site(site);

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new site
        agent.post('/api/sites')
          .send(site)
          .expect(200)
          .end(function (siteSaveErr, siteSaveRes) {
            // Handle site save error
            if (siteSaveErr) {
              return done(siteSaveErr);
            }

            // Get the site
            agent.get('/api/sites/' + siteSaveRes.body._id)
              .expect(200)
              .end(function (siteInfoErr, siteInfoRes) {
                // Handle site error
                if (siteInfoErr) {
                  return done(siteInfoErr);
                }

                // Set assertions
                (siteInfoRes.body._id).should.equal(siteSaveRes.body._id);
                (siteInfoRes.body.title).should.equal(site.title);

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (siteInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    Site.remove().exec()
      .then(User.remove().exec())
      .then(done())
      .catch(done);
  });
});
