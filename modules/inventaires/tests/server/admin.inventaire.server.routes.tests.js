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
describe('Inventaire Admin CRUD tests', function () {
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

  it('should be able to save an inventaire if logged in', function (done) {
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

        // Save a new inventaire
        agent.post('/api/inventaires')
          .send(inventaire)
          .expect(200)
          .end(function (inventaireSaveErr, inventaireSaveRes) {
            // Handle inventaire save error
            if (inventaireSaveErr) {
              return done(inventaireSaveErr);
            }

            // Get a list of inventaires
            agent.get('/api/inventaires')
              .end(function (inventairesGetErr, inventairesGetRes) {
                // Handle inventaire save error
                if (inventairesGetErr) {
                  return done(inventairesGetErr);
                }

                // Get inventaires list
                var inventaires = inventairesGetRes.body;

                // Set assertions
                (inventaires[0].user._id).should.equal(userId);
                (inventaires[0].title).should.match('Inventaire Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an inventaire if signed in', function (done) {
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

        // Save a new inventaire
        agent.post('/api/inventaires')
          .send(inventaire)
          .expect(200)
          .end(function (inventaireSaveErr, inventaireSaveRes) {
            // Handle inventaire save error
            if (inventaireSaveErr) {
              return done(inventaireSaveErr);
            }

            // Update inventaire title
            inventaire.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing inventaire
            agent.put('/api/inventaires/' + inventaireSaveRes.body._id)
              .send(inventaire)
              .expect(200)
              .end(function (inventaireUpdateErr, inventaireUpdateRes) {
                // Handle inventaire update error
                if (inventaireUpdateErr) {
                  return done(inventaireUpdateErr);
                }

                // Set assertions
                (inventaireUpdateRes.body._id).should.equal(inventaireSaveRes.body._id);
                (inventaireUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an inventaire if no title is provided', function (done) {
    // Invalidate title field
    inventaire.title = '';

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

        // Save a new inventaire
        agent.post('/api/inventaires')
          .send(inventaire)
          .expect(422)
          .end(function (inventaireSaveErr, inventaireSaveRes) {
            // Set message assertion
            (inventaireSaveRes.body.message).should.match('Title cannot be blank');

            // Handle inventaire save error
            done(inventaireSaveErr);
          });
      });
  });

  it('should be able to delete an inventaire if signed in', function (done) {
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

        // Save a new inventaire
        agent.post('/api/inventaires')
          .send(inventaire)
          .expect(200)
          .end(function (inventaireSaveErr, inventaireSaveRes) {
            // Handle inventaire save error
            if (inventaireSaveErr) {
              return done(inventaireSaveErr);
            }

            // Delete an existing inventaire
            agent.delete('/api/inventaires/' + inventaireSaveRes.body._id)
              .send(inventaire)
              .expect(200)
              .end(function (inventaireDeleteErr, inventaireDeleteRes) {
                // Handle inventaire error error
                if (inventaireDeleteErr) {
                  return done(inventaireDeleteErr);
                }

                // Set assertions
                (inventaireDeleteRes.body._id).should.equal(inventaireSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single inventaire if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new inventaire model instance
    inventaire.user = user;
    var inventaireObj = new Inventaire(inventaire);

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

        // Save a new inventaire
        agent.post('/api/inventaires')
          .send(inventaire)
          .expect(200)
          .end(function (inventaireSaveErr, inventaireSaveRes) {
            // Handle inventaire save error
            if (inventaireSaveErr) {
              return done(inventaireSaveErr);
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

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (inventaireInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
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
