'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Employe = mongoose.model('Employe'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  employe;

/**
 * Employe routes tests
 */
describe('Employe CRUD tests', function () {

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

    // Save a user to the test db and create new employe
    user.save()
      .then(function () {
        employe = {
          title: 'Employe Title',
          content: 'Employe Content'
        };

        done();
      })
      .catch(done);
  });

  it('should not be able to save an employe if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/employes')
          .send(employe)
          .expect(403)
          .end(function (employeSaveErr, employeSaveRes) {
            // Call the assertion callback
            done(employeSaveErr);
          });

      });
  });

  it('should not be able to save an employe if not logged in', function (done) {
    agent.post('/api/employes')
      .send(employe)
      .expect(403)
      .end(function (employeSaveErr, employeSaveRes) {
        // Call the assertion callback
        done(employeSaveErr);
      });
  });

  it('should not be able to update an employe if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/employes')
          .send(employe)
          .expect(403)
          .end(function (employeSaveErr, employeSaveRes) {
            // Call the assertion callback
            done(employeSaveErr);
          });
      });
  });

  it('should be able to get a list of employes if not signed in', function (done) {
    // Create new employe model instance
    var employeObj = new Employe(employe);

    // Save the employe
    employeObj.save(function () {
      // Request employes
      agent.get('/api/employes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single employe if not signed in', function (done) {
    // Create new employe model instance
    var employeObj = new Employe(employe);

    // Save the employe
    employeObj.save(function () {
      agent.get('/api/employes/' + employeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', employe.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single employe with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    agent.get('/api/employes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Employe is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single employe which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent employe
    agent.get('/api/employes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No employe with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete an employe if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/employes')
          .send(employe)
          .expect(403)
          .end(function (employeSaveErr, employeSaveRes) {
            // Call the assertion callback
            done(employeSaveErr);
          });
      });
  });

  it('should not be able to delete an employe if not signed in', function (done) {
    // Set employe user
    employe.user = user;

    // Create new employe model instance
    var employeObj = new Employe(employe);

    // Save the employe
    employeObj.save(function () {
      // Try deleting employe
      agent.delete('/api/employes/' + employeObj._id)
        .expect(403)
        .end(function (employeDeleteErr, employeDeleteRes) {
          // Set message assertion
          (employeDeleteRes.body.message).should.match('User is not authorized');

          // Handle employe error error
          done(employeDeleteErr);
        });

    });
  });

  it('should be able to get a single employe that has an orphaned user reference', function (done) {
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

          // Save a new employe
          agent.post('/api/employes')
            .send(employe)
            .expect(200)
            .end(function (employeSaveErr, employeSaveRes) {
              // Handle employe save error
              if (employeSaveErr) {
                return done(employeSaveErr);
              }

              // Set assertions on new employe
              (employeSaveRes.body.title).should.equal(employe.title);
              should.exist(employeSaveRes.body.user);
              should.equal(employeSaveRes.body.user._id, orphanId);

              // force the employe to have an orphaned user reference
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

                    // Get the employe
                    agent.get('/api/employes/' + employeSaveRes.body._id)
                      .expect(200)
                      .end(function (employeInfoErr, employeInfoRes) {
                        // Handle employe error
                        if (employeInfoErr) {
                          return done(employeInfoErr);
                        }

                        // Set assertions
                        (employeInfoRes.body._id).should.equal(employeSaveRes.body._id);
                        (employeInfoRes.body.title).should.equal(employe.title);
                        should.equal(employeInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single employe if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new employe model instance
    var employeObj = new Employe(employe);

    // Save the employe
    employeObj.save(function (err) {
      if (err) {
        return done(err);
      }
      agent.get('/api/employes/' + employeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', employe.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single employe, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      usernameOrEmail: 'employeowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Employe
    var _employeOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _employeOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Employe
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

          // Save a new employe
          agent.post('/api/employes')
            .send(employe)
            .expect(200)
            .end(function (employeSaveErr, employeSaveRes) {
              // Handle employe save error
              if (employeSaveErr) {
                return done(employeSaveErr);
              }

              // Set assertions on new employe
              (employeSaveRes.body.title).should.equal(employe.title);
              should.exist(employeSaveRes.body.user);
              should.equal(employeSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the employe
                  agent.get('/api/employes/' + employeSaveRes.body._id)
                    .expect(200)
                    .end(function (employeInfoErr, employeInfoRes) {
                      // Handle employe error
                      if (employeInfoErr) {
                        return done(employeInfoErr);
                      }

                      // Set assertions
                      (employeInfoRes.body._id).should.equal(employeSaveRes.body._id);
                      (employeInfoRes.body.title).should.equal(employe.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (employeInfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
            });
        });
    });
  });

  afterEach(function (done) {
    Employe.remove().exec()
      .then(User.remove().exec())
      .then(done())
      .catch(done);
  });
});
