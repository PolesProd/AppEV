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

    // Save a user to the test db and create new Employe
    user.save(function () {
      employe = {
        name: 'Employe name'
      };

      done();
    });
  });

  it('should be able to save a Employe if logged in', function (done) {
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

        // Save a new Employe
        agent.post('/api/employes')
          .send(employe)
          .expect(200)
          .end(function (employeSaveErr, employeSaveRes) {
            // Handle Employe save error
            if (employeSaveErr) {
              return done(employeSaveErr);
            }

            // Get a list of Employes
            agent.get('/api/employes')
              .end(function (employesGetErr, employesGetRes) {
                // Handle Employes save error
                if (employesGetErr) {
                  return done(employesGetErr);
                }

                // Get Employes list
                var employes = employesGetRes.body;

                // Set assertions
                (employes[0].user._id).should.equal(userId);
                (employes[0].name).should.match('Employe name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Employe if not logged in', function (done) {
    agent.post('/api/employes')
      .send(employe)
      .expect(403)
      .end(function (employeSaveErr, employeSaveRes) {
        // Call the assertion callback
        done(employeSaveErr);
      });
  });

  it('should not be able to save an Employe if no name is provided', function (done) {
    // Invalidate name field
    employe.name = '';

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

        // Save a new Employe
        agent.post('/api/employes')
          .send(employe)
          .expect(400)
          .end(function (employeSaveErr, employeSaveRes) {
            // Set message assertion
            (employeSaveRes.body.message).should.match('Please fill Employe name');

            // Handle Employe save error
            done(employeSaveErr);
          });
      });
  });

  it('should be able to update an Employe if signed in', function (done) {
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

        // Save a new Employe
        agent.post('/api/employes')
          .send(employe)
          .expect(200)
          .end(function (employeSaveErr, employeSaveRes) {
            // Handle Employe save error
            if (employeSaveErr) {
              return done(employeSaveErr);
            }

            // Update Employe name
            employe.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Employe
            agent.put('/api/employes/' + employeSaveRes.body._id)
              .send(employe)
              .expect(200)
              .end(function (employeUpdateErr, employeUpdateRes) {
                // Handle Employe update error
                if (employeUpdateErr) {
                  return done(employeUpdateErr);
                }

                // Set assertions
                (employeUpdateRes.body._id).should.equal(employeSaveRes.body._id);
                (employeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Employes if not signed in', function (done) {
    // Create new Employe model instance
    var employeObj = new Employe(employe);

    // Save the employe
    employeObj.save(function () {
      // Request Employes
      request(app).get('/api/employes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Employe if not signed in', function (done) {
    // Create new Employe model instance
    var employeObj = new Employe(employe);

    // Save the Employe
    employeObj.save(function () {
      request(app).get('/api/employes/' + employeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', employe.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Employe with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/employes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Employe is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Employe which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Employe
    request(app).get('/api/employes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Employe with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Employe if signed in', function (done) {
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

        // Save a new Employe
        agent.post('/api/employes')
          .send(employe)
          .expect(200)
          .end(function (employeSaveErr, employeSaveRes) {
            // Handle Employe save error
            if (employeSaveErr) {
              return done(employeSaveErr);
            }

            // Delete an existing Employe
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

  it('should not be able to delete an Employe if not signed in', function (done) {
    // Set Employe user
    employe.user = user;

    // Create new Employe model instance
    var employeObj = new Employe(employe);

    // Save the Employe
    employeObj.save(function () {
      // Try deleting Employe
      request(app).delete('/api/employes/' + employeObj._id)
        .expect(403)
        .end(function (employeDeleteErr, employeDeleteRes) {
          // Set message assertion
          (employeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Employe error error
          done(employeDeleteErr);
        });

    });
  });

  it('should be able to get a single Employe that has an orphaned user reference', function (done) {
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

          // Save a new Employe
          agent.post('/api/employes')
            .send(employe)
            .expect(200)
            .end(function (employeSaveErr, employeSaveRes) {
              // Handle Employe save error
              if (employeSaveErr) {
                return done(employeSaveErr);
              }

              // Set assertions on new Employe
              (employeSaveRes.body.name).should.equal(employe.name);
              should.exist(employeSaveRes.body.user);
              should.equal(employeSaveRes.body.user._id, orphanId);

              // force the Employe to have an orphaned user reference
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

                    // Get the Employe
                    agent.get('/api/employes/' + employeSaveRes.body._id)
                      .expect(200)
                      .end(function (employeInfoErr, employeInfoRes) {
                        // Handle Employe error
                        if (employeInfoErr) {
                          return done(employeInfoErr);
                        }

                        // Set assertions
                        (employeInfoRes.body._id).should.equal(employeSaveRes.body._id);
                        (employeInfoRes.body.name).should.equal(employe.name);
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

  afterEach(function (done) {
    User.remove().exec(function () {
      Employe.remove().exec(done);
    });
  });
});
