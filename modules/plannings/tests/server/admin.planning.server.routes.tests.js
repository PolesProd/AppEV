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
describe('Planning Admin CRUD tests', function () {
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

  it('should be able to save an planning if logged in', function (done) {
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

        // Save a new planning
        agent.post('/api/plannings')
          .send(planning)
          .expect(200)
          .end(function (planningSaveErr, planningSaveRes) {
            // Handle planning save error
            if (planningSaveErr) {
              return done(planningSaveErr);
            }

            // Get a list of plannings
            agent.get('/api/plannings')
              .end(function (planningsGetErr, planningsGetRes) {
                // Handle planning save error
                if (planningsGetErr) {
                  return done(planningsGetErr);
                }

                // Get plannings list
                var plannings = planningsGetRes.body;

                // Set assertions
                (plannings[0].user._id).should.equal(userId);
                (plannings[0].title).should.match('Planning Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an planning if signed in', function (done) {
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

        // Save a new planning
        agent.post('/api/plannings')
          .send(planning)
          .expect(200)
          .end(function (planningSaveErr, planningSaveRes) {
            // Handle planning save error
            if (planningSaveErr) {
              return done(planningSaveErr);
            }

            // Update planning title
            planning.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing planning
            agent.put('/api/plannings/' + planningSaveRes.body._id)
              .send(planning)
              .expect(200)
              .end(function (planningUpdateErr, planningUpdateRes) {
                // Handle planning update error
                if (planningUpdateErr) {
                  return done(planningUpdateErr);
                }

                // Set assertions
                (planningUpdateRes.body._id).should.equal(planningSaveRes.body._id);
                (planningUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an planning if no title is provided', function (done) {
    // Invalidate title field
    planning.title = '';

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

        // Save a new planning
        agent.post('/api/plannings')
          .send(planning)
          .expect(422)
          .end(function (planningSaveErr, planningSaveRes) {
            // Set message assertion
            (planningSaveRes.body.message).should.match('Title cannot be blank');

            // Handle planning save error
            done(planningSaveErr);
          });
      });
  });

  it('should be able to delete an planning if signed in', function (done) {
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

        // Save a new planning
        agent.post('/api/plannings')
          .send(planning)
          .expect(200)
          .end(function (planningSaveErr, planningSaveRes) {
            // Handle planning save error
            if (planningSaveErr) {
              return done(planningSaveErr);
            }

            // Delete an existing planning
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

  it('should be able to get a single planning if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new planning model instance
    planning.user = user;
    var planningObj = new Planning(planning);

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

        // Save a new planning
        agent.post('/api/plannings')
          .send(planning)
          .expect(200)
          .end(function (planningSaveErr, planningSaveRes) {
            // Handle planning save error
            if (planningSaveErr) {
              return done(planningSaveErr);
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

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (planningInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
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
