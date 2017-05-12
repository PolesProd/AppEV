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
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Planning
    user.save(function () {
      planning = {
        name: 'Planning name'
      };

      done();
    });
  });

  it('should be able to save a Planning if logged in', function (done) {
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

        // Save a new Planning
        agent.post('/api/plannings')
          .send(planning)
          .expect(200)
          .end(function (planningSaveErr, planningSaveRes) {
            // Handle Planning save error
            if (planningSaveErr) {
              return done(planningSaveErr);
            }

            // Get a list of Plannings
            agent.get('/api/plannings')
              .end(function (planningsGetErr, planningsGetRes) {
                // Handle Plannings save error
                if (planningsGetErr) {
                  return done(planningsGetErr);
                }

                // Get Plannings list
                var plannings = planningsGetRes.body;

                // Set assertions
                (plannings[0].user._id).should.equal(userId);
                (plannings[0].name).should.match('Planning name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Planning if not logged in', function (done) {
    agent.post('/api/plannings')
      .send(planning)
      .expect(403)
      .end(function (planningSaveErr, planningSaveRes) {
        // Call the assertion callback
        done(planningSaveErr);
      });
  });

  it('should not be able to save an Planning if no name is provided', function (done) {
    // Invalidate name field
    planning.name = '';

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

        // Save a new Planning
        agent.post('/api/plannings')
          .send(planning)
          .expect(400)
          .end(function (planningSaveErr, planningSaveRes) {
            // Set message assertion
            (planningSaveRes.body.message).should.match('Please fill Planning name');

            // Handle Planning save error
            done(planningSaveErr);
          });
      });
  });

  it('should be able to update an Planning if signed in', function (done) {
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

        // Save a new Planning
        agent.post('/api/plannings')
          .send(planning)
          .expect(200)
          .end(function (planningSaveErr, planningSaveRes) {
            // Handle Planning save error
            if (planningSaveErr) {
              return done(planningSaveErr);
            }

            // Update Planning name
            planning.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Planning
            agent.put('/api/plannings/' + planningSaveRes.body._id)
              .send(planning)
              .expect(200)
              .end(function (planningUpdateErr, planningUpdateRes) {
                // Handle Planning update error
                if (planningUpdateErr) {
                  return done(planningUpdateErr);
                }

                // Set assertions
                (planningUpdateRes.body._id).should.equal(planningSaveRes.body._id);
                (planningUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Plannings if not signed in', function (done) {
    // Create new Planning model instance
    var planningObj = new Planning(planning);

    // Save the planning
    planningObj.save(function () {
      // Request Plannings
      request(app).get('/api/plannings')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Planning if not signed in', function (done) {
    // Create new Planning model instance
    var planningObj = new Planning(planning);

    // Save the Planning
    planningObj.save(function () {
      request(app).get('/api/plannings/' + planningObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', planning.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Planning with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/plannings/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Planning is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Planning which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Planning
    request(app).get('/api/plannings/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Planning with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Planning if signed in', function (done) {
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

        // Save a new Planning
        agent.post('/api/plannings')
          .send(planning)
          .expect(200)
          .end(function (planningSaveErr, planningSaveRes) {
            // Handle Planning save error
            if (planningSaveErr) {
              return done(planningSaveErr);
            }

            // Delete an existing Planning
            agent.delete('/api/plannings/' + planningSaveRes.body._id)
              .send(planning)
              .expect(200)
              .end(function (planningDeleteErr, planningDeleteRes) {
                // Handle planning error error
                if (planningDeleteErr) {
                  return done(planningDeleteErr);
                }

                // Set assertions
                (planningDeleteRes.body._id).should.equal(planningSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Planning if not signed in', function (done) {
    // Set Planning user
    planning.user = user;

    // Create new Planning model instance
    var planningObj = new Planning(planning);

    // Save the Planning
    planningObj.save(function () {
      // Try deleting Planning
      request(app).delete('/api/plannings/' + planningObj._id)
        .expect(403)
        .end(function (planningDeleteErr, planningDeleteRes) {
          // Set message assertion
          (planningDeleteRes.body.message).should.match('User is not authorized');

          // Handle Planning error error
          done(planningDeleteErr);
        });

    });
  });

  it('should be able to get a single Planning that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
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

          // Save a new Planning
          agent.post('/api/plannings')
            .send(planning)
            .expect(200)
            .end(function (planningSaveErr, planningSaveRes) {
              // Handle Planning save error
              if (planningSaveErr) {
                return done(planningSaveErr);
              }

              // Set assertions on new Planning
              (planningSaveRes.body.name).should.equal(planning.name);
              should.exist(planningSaveRes.body.user);
              should.equal(planningSaveRes.body.user._id, orphanId);

              // force the Planning to have an orphaned user reference
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

                    // Get the Planning
                    agent.get('/api/plannings/' + planningSaveRes.body._id)
                      .expect(200)
                      .end(function (planningInfoErr, planningInfoRes) {
                        // Handle Planning error
                        if (planningInfoErr) {
                          return done(planningInfoErr);
                        }

                        // Set assertions
                        (planningInfoRes.body._id).should.equal(planningSaveRes.body._id);
                        (planningInfoRes.body.name).should.equal(planning.name);
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

  afterEach(function (done) {
    User.remove().exec(function () {
      Planning.remove().exec(done);
    });
  });
});
