'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Inventaire = mongoose.model('Inventaire'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  inventaire;

/**
 * Inventaire routes tests
 */
describe('Inventaire CRUD tests', function () {

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

    // Save a user to the test db and create new inventaire
    user.save()
      .then(function () {
        inventaire = {
          title: 'Inventaire Title',
          content: 'Inventaire Content'
        };

        done();
      })
      .catch(done);
  });

  it('should not be able to save an inventaire if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/inventaires')
          .send(inventaire)
          .expect(403)
          .end(function (inventaireSaveErr, inventaireSaveRes) {
            // Call the assertion callback
            done(inventaireSaveErr);
          });

      });
  });

  it('should not be able to save an inventaire if not logged in', function (done) {
    agent.post('/api/inventaires')
      .send(inventaire)
      .expect(403)
      .end(function (inventaireSaveErr, inventaireSaveRes) {
        // Call the assertion callback
        done(inventaireSaveErr);
      });
  });

  it('should not be able to update an inventaire if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/inventaires')
          .send(inventaire)
          .expect(403)
          .end(function (inventaireSaveErr, inventaireSaveRes) {
            // Call the assertion callback
            done(inventaireSaveErr);
          });
      });
  });

  it('should be able to get a list of inventaires if not signed in', function (done) {
    // Create new inventaire model instance
    var inventaireObj = new Inventaire(inventaire);

    // Save the inventaire
    inventaireObj.save(function () {
      // Request inventaires
      agent.get('/api/inventaires')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single inventaire if not signed in', function (done) {
    // Create new inventaire model instance
    var inventaireObj = new Inventaire(inventaire);

    // Save the inventaire
    inventaireObj.save(function () {
      agent.get('/api/inventaires/' + inventaireObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', inventaire.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single inventaire with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    agent.get('/api/inventaires/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Inventaire is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single inventaire which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent inventaire
    agent.get('/api/inventaires/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No inventaire with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete an inventaire if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/inventaires')
          .send(inventaire)
          .expect(403)
          .end(function (inventaireSaveErr, inventaireSaveRes) {
            // Call the assertion callback
            done(inventaireSaveErr);
          });
      });
  });

  it('should not be able to delete an inventaire if not signed in', function (done) {
    // Set inventaire user
    inventaire.user = user;

    // Create new inventaire model instance
    var inventaireObj = new Inventaire(inventaire);

    // Save the inventaire
    inventaireObj.save(function () {
      // Try deleting inventaire
      agent.delete('/api/inventaires/' + inventaireObj._id)
        .expect(403)
        .end(function (inventaireDeleteErr, inventaireDeleteRes) {
          // Set message assertion
          (inventaireDeleteRes.body.message).should.match('User is not authorized');

          // Handle inventaire error error
          done(inventaireDeleteErr);
        });

    });
  });

  it('should be able to get a single inventaire that has an orphaned user reference', function (done) {
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

          // Save a new inventaire
          agent.post('/api/inventaires')
            .send(inventaire)
            .expect(200)
            .end(function (inventaireSaveErr, inventaireSaveRes) {
              // Handle inventaire save error
              if (inventaireSaveErr) {
                return done(inventaireSaveErr);
              }

              // Set assertions on new inventaire
              (inventaireSaveRes.body.title).should.equal(inventaire.title);
              should.exist(inventaireSaveRes.body.user);
              should.equal(inventaireSaveRes.body.user._id, orphanId);

              // force the inventaire to have an orphaned user reference
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

                    // Get the inventaire
                    agent.get('/api/inventaires/' + inventaireSaveRes.body._id)
                      .expect(200)
                      .end(function (inventaireInfoErr, inventaireInfoRes) {
                        // Handle inventaire error
                        if (inventaireInfoErr) {
                          return done(inventaireInfoErr);
                        }

                        // Set assertions
                        (inventaireInfoRes.body._id).should.equal(inventaireSaveRes.body._id);
                        (inventaireInfoRes.body.title).should.equal(inventaire.title);
                        should.equal(inventaireInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single inventaire if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new inventaire model instance
    var inventaireObj = new Inventaire(inventaire);

    // Save the inventaire
    inventaireObj.save(function (err) {
      if (err) {
        return done(err);
      }
      agent.get('/api/inventaires/' + inventaireObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', inventaire.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single inventaire, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      usernameOrEmail: 'inventaireowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Inventaire
    var _inventaireOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _inventaireOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Inventaire
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

          // Save a new inventaire
          agent.post('/api/inventaires')
            .send(inventaire)
            .expect(200)
            .end(function (inventaireSaveErr, inventaireSaveRes) {
              // Handle inventaire save error
              if (inventaireSaveErr) {
                return done(inventaireSaveErr);
              }

              // Set assertions on new inventaire
              (inventaireSaveRes.body.title).should.equal(inventaire.title);
              should.exist(inventaireSaveRes.body.user);
              should.equal(inventaireSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the inventaire
                  agent.get('/api/inventaires/' + inventaireSaveRes.body._id)
                    .expect(200)
                    .end(function (inventaireInfoErr, inventaireInfoRes) {
                      // Handle inventaire error
                      if (inventaireInfoErr) {
                        return done(inventaireInfoErr);
                      }

                      // Set assertions
                      (inventaireInfoRes.body._id).should.equal(inventaireSaveRes.body._id);
                      (inventaireInfoRes.body.title).should.equal(inventaire.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (inventaireInfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
            });
        });
    });
  });

  afterEach(function (done) {
    Inventaire.remove().exec()
      .then(User.remove().exec())
      .then(done())
      .catch(done);
  });
});
