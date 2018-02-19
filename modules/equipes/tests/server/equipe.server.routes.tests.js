'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Equipe = mongoose.model('Equipe'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  equipe;

/**
 * Equipe routes tests
 */
describe('Equipe CRUD tests', function () {

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

    // Save a user to the test db and create new equipe
    user.save()
      .then(function () {
        equipe = {
          title: 'Equipe Title',
          content: 'Equipe Content'
        };

        done();
      })
      .catch(done);
  });

  it('should not be able to save an equipe if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/equipes')
          .send(equipe)
          .expect(403)
          .end(function (equipeSaveErr, equipeSaveRes) {
            // Call the assertion callback
            done(equipeSaveErr);
          });

      });
  });

  it('should not be able to save an equipe if not logged in', function (done) {
    agent.post('/api/equipes')
      .send(equipe)
      .expect(403)
      .end(function (equipeSaveErr, equipeSaveRes) {
        // Call the assertion callback
        done(equipeSaveErr);
      });
  });

  it('should not be able to update an equipe if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/equipes')
          .send(equipe)
          .expect(403)
          .end(function (equipeSaveErr, equipeSaveRes) {
            // Call the assertion callback
            done(equipeSaveErr);
          });
      });
  });

  it('should be able to get a list of equipes if not signed in', function (done) {
    // Create new equipe model instance
    var equipeObj = new Equipe(equipe);

    // Save the equipe
    equipeObj.save(function () {
      // Request equipes
      agent.get('/api/equipes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single equipe if not signed in', function (done) {
    // Create new equipe model instance
    var equipeObj = new Equipe(equipe);

    // Save the equipe
    equipeObj.save(function () {
      agent.get('/api/equipes/' + equipeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', equipe.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single equipe with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    agent.get('/api/equipes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Equipe is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single equipe which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent equipe
    agent.get('/api/equipes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No equipe with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete an equipe if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/equipes')
          .send(equipe)
          .expect(403)
          .end(function (equipeSaveErr, equipeSaveRes) {
            // Call the assertion callback
            done(equipeSaveErr);
          });
      });
  });

  it('should not be able to delete an equipe if not signed in', function (done) {
    // Set equipe user
    equipe.user = user;

    // Create new equipe model instance
    var equipeObj = new Equipe(equipe);

    // Save the equipe
    equipeObj.save(function () {
      // Try deleting equipe
      agent.delete('/api/equipes/' + equipeObj._id)
        .expect(403)
        .end(function (equipeDeleteErr, equipeDeleteRes) {
          // Set message assertion
          (equipeDeleteRes.body.message).should.match('User is not authorized');

          // Handle equipe error error
          done(equipeDeleteErr);
        });

    });
  });

  it('should be able to get a single equipe that has an orphaned user reference', function (done) {
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

          // Save a new equipe
          agent.post('/api/equipes')
            .send(equipe)
            .expect(200)
            .end(function (equipeSaveErr, equipeSaveRes) {
              // Handle equipe save error
              if (equipeSaveErr) {
                return done(equipeSaveErr);
              }

              // Set assertions on new equipe
              (equipeSaveRes.body.title).should.equal(equipe.title);
              should.exist(equipeSaveRes.body.user);
              should.equal(equipeSaveRes.body.user._id, orphanId);

              // force the equipe to have an orphaned user reference
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

                    // Get the equipe
                    agent.get('/api/equipes/' + equipeSaveRes.body._id)
                      .expect(200)
                      .end(function (equipeInfoErr, equipeInfoRes) {
                        // Handle equipe error
                        if (equipeInfoErr) {
                          return done(equipeInfoErr);
                        }

                        // Set assertions
                        (equipeInfoRes.body._id).should.equal(equipeSaveRes.body._id);
                        (equipeInfoRes.body.title).should.equal(equipe.title);
                        should.equal(equipeInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single equipe if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new equipe model instance
    var equipeObj = new Equipe(equipe);

    // Save the equipe
    equipeObj.save(function (err) {
      if (err) {
        return done(err);
      }
      agent.get('/api/equipes/' + equipeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', equipe.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single equipe, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      usernameOrEmail: 'equipeowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Equipe
    var _equipeOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _equipeOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Equipe
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

          // Save a new equipe
          agent.post('/api/equipes')
            .send(equipe)
            .expect(200)
            .end(function (equipeSaveErr, equipeSaveRes) {
              // Handle equipe save error
              if (equipeSaveErr) {
                return done(equipeSaveErr);
              }

              // Set assertions on new equipe
              (equipeSaveRes.body.title).should.equal(equipe.title);
              should.exist(equipeSaveRes.body.user);
              should.equal(equipeSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the equipe
                  agent.get('/api/equipes/' + equipeSaveRes.body._id)
                    .expect(200)
                    .end(function (equipeInfoErr, equipeInfoRes) {
                      // Handle equipe error
                      if (equipeInfoErr) {
                        return done(equipeInfoErr);
                      }

                      // Set assertions
                      (equipeInfoRes.body._id).should.equal(equipeSaveRes.body._id);
                      (equipeInfoRes.body.title).should.equal(equipe.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (equipeInfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
            });
        });
    });
  });

  afterEach(function (done) {
    Equipe.remove().exec()
      .then(User.remove().exec())
      .then(done())
      .catch(done);
  });
});
