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
describe('Equipe Admin CRUD tests', function () {
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

  it('should be able to save an equipe if logged in', function (done) {
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

        // Save a new equipe
        agent.post('/api/equipes')
          .send(equipe)
          .expect(200)
          .end(function (equipeSaveErr, equipeSaveRes) {
            // Handle equipe save error
            if (equipeSaveErr) {
              return done(equipeSaveErr);
            }

            // Get a list of equipes
            agent.get('/api/equipes')
              .end(function (equipesGetErr, equipesGetRes) {
                // Handle equipe save error
                if (equipesGetErr) {
                  return done(equipesGetErr);
                }

                // Get equipes list
                var equipes = equipesGetRes.body;

                // Set assertions
                (equipes[0].user._id).should.equal(userId);
                (equipes[0].title).should.match('Equipe Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an equipe if signed in', function (done) {
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

        // Save a new equipe
        agent.post('/api/equipes')
          .send(equipe)
          .expect(200)
          .end(function (equipeSaveErr, equipeSaveRes) {
            // Handle equipe save error
            if (equipeSaveErr) {
              return done(equipeSaveErr);
            }

            // Update equipe title
            equipe.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing equipe
            agent.put('/api/equipes/' + equipeSaveRes.body._id)
              .send(equipe)
              .expect(200)
              .end(function (equipeUpdateErr, equipeUpdateRes) {
                // Handle equipe update error
                if (equipeUpdateErr) {
                  return done(equipeUpdateErr);
                }

                // Set assertions
                (equipeUpdateRes.body._id).should.equal(equipeSaveRes.body._id);
                (equipeUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an equipe if no title is provided', function (done) {
    // Invalidate title field
    equipe.title = '';

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

        // Save a new equipe
        agent.post('/api/equipes')
          .send(equipe)
          .expect(422)
          .end(function (equipeSaveErr, equipeSaveRes) {
            // Set message assertion
            (equipeSaveRes.body.message).should.match('Title cannot be blank');

            // Handle equipe save error
            done(equipeSaveErr);
          });
      });
  });

  it('should be able to delete an equipe if signed in', function (done) {
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

        // Save a new equipe
        agent.post('/api/equipes')
          .send(equipe)
          .expect(200)
          .end(function (equipeSaveErr, equipeSaveRes) {
            // Handle equipe save error
            if (equipeSaveErr) {
              return done(equipeSaveErr);
            }

            // Delete an existing equipe
            agent.delete('/api/equipes/' + equipeSaveRes.body._id)
              .send(equipe)
              .expect(200)
              .end(function (equipeDeleteErr, equipeDeleteRes) {
                // Handle equipe error error
                if (equipeDeleteErr) {
                  return done(equipeDeleteErr);
                }

                // Set assertions
                (equipeDeleteRes.body._id).should.equal(equipeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single equipe if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new equipe model instance
    equipe.user = user;
    var equipeObj = new Equipe(equipe);

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

        // Save a new equipe
        agent.post('/api/equipes')
          .send(equipe)
          .expect(200)
          .end(function (equipeSaveErr, equipeSaveRes) {
            // Handle equipe save error
            if (equipeSaveErr) {
              return done(equipeSaveErr);
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

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (equipeInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
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
