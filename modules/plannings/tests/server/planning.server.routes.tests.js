'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Planning = mongoose.model('Planning'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  planning;

/**
 * Planning routes tests
 */
describe('Planning CRUD tests', function () {

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

    // Save a user to the test db and create new planning
    user.save()
      .then(function () {
        planning = {
          title: 'Planning Title',
          content: 'Planning Content'
        };

        done();
      })
      .catch(done);
  });

  it('should not be able to save an planning if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/plannings')
          .send(planning)
          .expect(403)
          .end(function (planningSaveErr, planningSaveRes) {
            // Call the assertion callback
            done(planningSaveErr);
          });

      });
  });

  it('should not be able to save an planning if not logged in', function (done) {
    agent.post('/api/plannings')
      .send(planning)
      .expect(403)
      .end(function (planningSaveErr, planningSaveRes) {
        // Call the assertion callback
        done(planningSaveErr);
      });
  });

  it('should not be able to update an planning if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/plannings')
          .send(planning)
          .expect(403)
          .end(function (planningSaveErr, planningSaveRes) {
            // Call the assertion callback
            done(planningSaveErr);
          });
      });
  });

  it('should be able to get a list of plannings if not signed in', function (done) {
    // Create new planning model instance
    var planningObj = new Planning(planning);

    // Save the planning
    planningObj.save(function () {
      // Request plannings
      agent.get('/api/plannings')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single planning if not signed in', function (done) {
    // Create new planning model instance
    var planningObj = new Planning(planning);

    // Save the planning
    planningObj.save(function () {
      agent.get('/api/plannings/' + planningObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', planning.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single planning with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    agent.get('/api/plannings/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Planning is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single planning which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent planning
    agent.get('/api/plannings/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No planning with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete an planning if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/plannings')
          .send(planning)
          .expect(403)
          .end(function (planningSaveErr, planningSaveRes) {
            // Call the assertion callback
            done(planningSaveErr);
          });
      });
  });

  it('should not be able to delete an planning if not signed in', function (done) {
    // Set planning user
    planning.user = user;

    // Create new planning model instance
    var planningObj = new Planning(planning);

    // Save the planning
    planningObj.save(function () {
      // Try deleting planning
      agent.delete('/api/plannings/' + planningObj._id)
        .expect(403)
        .end(function (planningDeleteErr, planningDeleteRes) {
          // Set message assertion
          (planningDeleteRes.body.message).should.match('User is not authorized');

          // Handle planning error error
          done(planningDeleteErr);
        });

    });
  });

  it('should be able to get a single planning that has an orphaned user reference', function (done) {
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

          // Save a new planning
          agent.post('/api/plannings')
            .send(planning)
            .expect(200)
            .end(function (planningSaveErr, planningSaveRes) {
              // Handle planning save error
              if (planningSaveErr) {
                return done(planningSaveErr);
              }

              // Set assertions on new planning
              (planningSaveRes.body.title).should.equal(planning.title);
              should.exist(planningSaveRes.body.user);
              should.equal(planningSaveRes.body.user._id, orphanId);

              // force the planning to have an orphaned user reference
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

                    // Get the planning
                    agent.get('/api/plannings/' + planningSaveRes.body._id)
                      .expect(200)
                      .end(function (planningInfoErr, planningInfoRes) {
                        // Handle planning error
                        if (planningInfoErr) {
                          return done(planningInfoErr);
                        }

                        // Set assertions
                        (planningInfoRes.body._id).should.equal(planningSaveRes.body._id);
                        (planningInfoRes.body.title).should.equal(planning.title);
                        should.equal(planningInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single planning if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new planning model instance
    var planningObj = new Planning(planning);

    // Save the planning
    planningObj.save(function (err) {
      if (err) {
        return done(err);
      }
      agent.get('/api/plannings/' + planningObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', planning.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single planning, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      usernameOrEmail: 'planningowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Planning
    var _planningOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _planningOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Planning
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

          // Save a new planning
          agent.post('/api/plannings')
            .send(planning)
            .expect(200)
            .end(function (planningSaveErr, planningSaveRes) {
              // Handle planning save error
              if (planningSaveErr) {
                return done(planningSaveErr);
              }

              // Set assertions on new planning
              (planningSaveRes.body.title).should.equal(planning.title);
              should.exist(planningSaveRes.body.user);
              should.equal(planningSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the planning
                  agent.get('/api/plannings/' + planningSaveRes.body._id)
                    .expect(200)
                    .end(function (planningInfoErr, planningInfoRes) {
                      // Handle planning error
                      if (planningInfoErr) {
                        return done(planningInfoErr);
                      }

                      // Set assertions
                      (planningInfoRes.body._id).should.equal(planningSaveRes.body._id);
                      (planningInfoRes.body.title).should.equal(planning.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (planningInfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
            });
        });
    });
  });

  afterEach(function (done) {
    Planning.remove().exec()
      .then(User.remove().exec())
      .then(done())
      .catch(done);
  });
});
