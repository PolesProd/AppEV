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
describe('Site CRUD tests', function () {

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

  it('should not be able to save an site if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/sites')
          .send(site)
          .expect(403)
          .end(function (siteSaveErr, siteSaveRes) {
            // Call the assertion callback
            done(siteSaveErr);
          });

      });
  });

  it('should not be able to save an site if not logged in', function (done) {
    agent.post('/api/sites')
      .send(site)
      .expect(403)
      .end(function (siteSaveErr, siteSaveRes) {
        // Call the assertion callback
        done(siteSaveErr);
      });
  });

  it('should not be able to update an site if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/sites')
          .send(site)
          .expect(403)
          .end(function (siteSaveErr, siteSaveRes) {
            // Call the assertion callback
            done(siteSaveErr);
          });
      });
  });

  it('should be able to get a list of sites if not signed in', function (done) {
    // Create new site model instance
    var siteObj = new Site(site);

    // Save the site
    siteObj.save(function () {
      // Request sites
      agent.get('/api/sites')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single site if not signed in', function (done) {
    // Create new site model instance
    var siteObj = new Site(site);

    // Save the site
    siteObj.save(function () {
      agent.get('/api/sites/' + siteObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', site.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single site with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    agent.get('/api/sites/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Site is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single site which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent site
    agent.get('/api/sites/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No site with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete an site if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/sites')
          .send(site)
          .expect(403)
          .end(function (siteSaveErr, siteSaveRes) {
            // Call the assertion callback
            done(siteSaveErr);
          });
      });
  });

  it('should not be able to delete an site if not signed in', function (done) {
    // Set site user
    site.user = user;

    // Create new site model instance
    var siteObj = new Site(site);

    // Save the site
    siteObj.save(function () {
      // Try deleting site
      agent.delete('/api/sites/' + siteObj._id)
        .expect(403)
        .end(function (siteDeleteErr, siteDeleteRes) {
          // Set message assertion
          (siteDeleteRes.body.message).should.match('User is not authorized');

          // Handle site error error
          done(siteDeleteErr);
        });

    });
  });

  it('should be able to get a single site that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      usernameOrEmail: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin']
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new site
          agent.post('/api/sites')
            .send(site)
            .expect(200)
            .end(function (siteSaveErr, siteSaveRes) {
              // Handle site save error
              if (siteSaveErr) {
                return done(siteSaveErr);
              }

              // Set assertions on new site
              (siteSaveRes.body.title).should.equal(site.title);
              should.exist(siteSaveRes.body.user);
              should.equal(siteSaveRes.body.user._id, orphanId);

              // force the site to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
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
                        should.equal(siteInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single site if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new site model instance
    var siteObj = new Site(site);

    // Save the site
    siteObj.save(function (err) {
      if (err) {
        return done(err);
      }
      agent.get('/api/sites/' + siteObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', site.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single site, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      usernameOrEmail: 'siteowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Site
    var _siteOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _siteOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Site
      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = _user._id;

          // Save a new site
          agent.post('/api/sites')
            .send(site)
            .expect(200)
            .end(function (siteSaveErr, siteSaveRes) {
              // Handle site save error
              if (siteSaveErr) {
                return done(siteSaveErr);
              }

              // Set assertions on new site
              (siteSaveRes.body.title).should.equal(site.title);
              should.exist(siteSaveRes.body.user);
              should.equal(siteSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
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
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (siteInfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
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
