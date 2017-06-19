'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Finance = mongoose.model('Finance'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  finance;

/**
 * Finance routes tests
 */
describe('Finance CRUD tests', function () {

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

    // Save a user to the test db and create new Finance
    user.save(function () {
      finance = {
        name: 'Finance name'
      };

      done();
    });
  });

  it('should be able to save a Finance if logged in', function (done) {
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

        // Save a new Finance
        agent.post('/api/finances')
          .send(finance)
          .expect(200)
          .end(function (financeSaveErr, financeSaveRes) {
            // Handle Finance save error
            if (financeSaveErr) {
              return done(financeSaveErr);
            }

            // Get a list of Finances
            agent.get('/api/finances')
              .end(function (financesGetErr, financesGetRes) {
                // Handle Finances save error
                if (financesGetErr) {
                  return done(financesGetErr);
                }

                // Get Finances list
                var finances = financesGetRes.body;

                // Set assertions
                (finances[0].user._id).should.equal(userId);
                (finances[0].name).should.match('Finance name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Finance if not logged in', function (done) {
    agent.post('/api/finances')
      .send(finance)
      .expect(403)
      .end(function (financeSaveErr, financeSaveRes) {
        // Call the assertion callback
        done(financeSaveErr);
      });
  });

  it('should not be able to save an Finance if no name is provided', function (done) {
    // Invalidate name field
    finance.name = '';

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

        // Save a new Finance
        agent.post('/api/finances')
          .send(finance)
          .expect(400)
          .end(function (financeSaveErr, financeSaveRes) {
            // Set message assertion
            (financeSaveRes.body.message).should.match('Please fill Finance name');

            // Handle Finance save error
            done(financeSaveErr);
          });
      });
  });

  it('should be able to update an Finance if signed in', function (done) {
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

        // Save a new Finance
        agent.post('/api/finances')
          .send(finance)
          .expect(200)
          .end(function (financeSaveErr, financeSaveRes) {
            // Handle Finance save error
            if (financeSaveErr) {
              return done(financeSaveErr);
            }

            // Update Finance name
            finance.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Finance
            agent.put('/api/finances/' + financeSaveRes.body._id)
              .send(finance)
              .expect(200)
              .end(function (financeUpdateErr, financeUpdateRes) {
                // Handle Finance update error
                if (financeUpdateErr) {
                  return done(financeUpdateErr);
                }

                // Set assertions
                (financeUpdateRes.body._id).should.equal(financeSaveRes.body._id);
                (financeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Finances if not signed in', function (done) {
    // Create new Finance model instance
    var financeObj = new Finance(finance);

    // Save the finance
    financeObj.save(function () {
      // Request Finances
      request(app).get('/api/finances')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Finance if not signed in', function (done) {
    // Create new Finance model instance
    var financeObj = new Finance(finance);

    // Save the Finance
    financeObj.save(function () {
      request(app).get('/api/finances/' + financeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', finance.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Finance with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/finances/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Finance is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Finance which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Finance
    request(app).get('/api/finances/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Finance with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Finance if signed in', function (done) {
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

        // Save a new Finance
        agent.post('/api/finances')
          .send(finance)
          .expect(200)
          .end(function (financeSaveErr, financeSaveRes) {
            // Handle Finance save error
            if (financeSaveErr) {
              return done(financeSaveErr);
            }

            // Delete an existing Finance
            agent.delete('/api/finances/' + financeSaveRes.body._id)
              .send(finance)
              .expect(200)
              .end(function (financeDeleteErr, financeDeleteRes) {
                // Handle finance error error
                if (financeDeleteErr) {
                  return done(financeDeleteErr);
                }

                // Set assertions
                (financeDeleteRes.body._id).should.equal(financeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Finance if not signed in', function (done) {
    // Set Finance user
    finance.user = user;

    // Create new Finance model instance
    var financeObj = new Finance(finance);

    // Save the Finance
    financeObj.save(function () {
      // Try deleting Finance
      request(app).delete('/api/finances/' + financeObj._id)
        .expect(403)
        .end(function (financeDeleteErr, financeDeleteRes) {
          // Set message assertion
          (financeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Finance error error
          done(financeDeleteErr);
        });

    });
  });

  it('should be able to get a single Finance that has an orphaned user reference', function (done) {
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

          // Save a new Finance
          agent.post('/api/finances')
            .send(finance)
            .expect(200)
            .end(function (financeSaveErr, financeSaveRes) {
              // Handle Finance save error
              if (financeSaveErr) {
                return done(financeSaveErr);
              }

              // Set assertions on new Finance
              (financeSaveRes.body.name).should.equal(finance.name);
              should.exist(financeSaveRes.body.user);
              should.equal(financeSaveRes.body.user._id, orphanId);

              // force the Finance to have an orphaned user reference
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

                    // Get the Finance
                    agent.get('/api/finances/' + financeSaveRes.body._id)
                      .expect(200)
                      .end(function (financeInfoErr, financeInfoRes) {
                        // Handle Finance error
                        if (financeInfoErr) {
                          return done(financeInfoErr);
                        }

                        // Set assertions
                        (financeInfoRes.body._id).should.equal(financeSaveRes.body._id);
                        (financeInfoRes.body.name).should.equal(finance.name);
                        should.equal(financeInfoRes.body.user, undefined);

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
      Finance.remove().exec(done);
    });
  });
});
