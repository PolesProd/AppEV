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
describe('Employe Admin CRUD tests', function () {
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

  it('should be able to save an employe if logged in', function (done) {
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

        // Save a new employe
        agent.post('/api/employes')
          .send(employe)
          .expect(200)
          .end(function (employeSaveErr, employeSaveRes) {
            // Handle employe save error
            if (employeSaveErr) {
              return done(employeSaveErr);
            }

            // Get a list of employes
            agent.get('/api/employes')
              .end(function (employesGetErr, employesGetRes) {
                // Handle employe save error
                if (employesGetErr) {
                  return done(employesGetErr);
                }

                // Get employes list
                var employes = employesGetRes.body;

                // Set assertions
                (employes[0].user._id).should.equal(userId);
                (employes[0].title).should.match('Employe Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an employe if signed in', function (done) {
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

        // Save a new employe
        agent.post('/api/employes')
          .send(employe)
          .expect(200)
          .end(function (employeSaveErr, employeSaveRes) {
            // Handle employe save error
            if (employeSaveErr) {
              return done(employeSaveErr);
            }

            // Update employe title
            employe.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing employe
            agent.put('/api/employes/' + employeSaveRes.body._id)
              .send(employe)
              .expect(200)
              .end(function (employeUpdateErr, employeUpdateRes) {
                // Handle employe update error
                if (employeUpdateErr) {
                  return done(employeUpdateErr);
                }

                // Set assertions
                (employeUpdateRes.body._id).should.equal(employeSaveRes.body._id);
                (employeUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an employe if no title is provided', function (done) {
    // Invalidate title field
    employe.title = '';

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

        // Save a new employe
        agent.post('/api/employes')
          .send(employe)
          .expect(422)
          .end(function (employeSaveErr, employeSaveRes) {
            // Set message assertion
            (employeSaveRes.body.message).should.match('Title cannot be blank');

            // Handle employe save error
            done(employeSaveErr);
          });
      });
  });

  it('should be able to delete an employe if signed in', function (done) {
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

        // Save a new employe
        agent.post('/api/employes')
          .send(employe)
          .expect(200)
          .end(function (employeSaveErr, employeSaveRes) {
            // Handle employe save error
            if (employeSaveErr) {
              return done(employeSaveErr);
            }

            // Delete an existing employe
            agent.delete('/api/employes/' + employeSaveRes.body._id)
              .send(employe)
              .expect(200)
              .end(function (employeDeleteErr, employeDeleteRes) {
                // Handle employe error error
                if (employeDeleteErr) {
                  return done(employeDeleteErr);
                }

                // Set assertions
                (employeDeleteRes.body._id).should.equal(employeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single employe if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new employe model instance
    employe.user = user;
    var employeObj = new Employe(employe);

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

        // Save a new employe
        agent.post('/api/employes')
          .send(employe)
          .expect(200)
          .end(function (employeSaveErr, employeSaveRes) {
            // Handle employe save error
            if (employeSaveErr) {
              return done(employeSaveErr);
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

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (employeInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
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
