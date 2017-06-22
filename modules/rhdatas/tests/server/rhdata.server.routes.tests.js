'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Rhdata = mongoose.model('Rhdata'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  rhdata;

/**
 * Rhdata routes tests
 */
describe('Rhdata CRUD tests', function () {

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

    // Save a user to the test db and create new Rhdata
    user.save(function () {
      rhdata = {
        name: 'Rhdata name'
      };

      done();
    });
  });

  it('should be able to save a Rhdata if logged in', function (done) {
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

        // Save a new Rhdata
        agent.post('/api/rhdatas')
          .send(rhdata)
          .expect(200)
          .end(function (rhdataSaveErr, rhdataSaveRes) {
            // Handle Rhdata save error
            if (rhdataSaveErr) {
              return done(rhdataSaveErr);
            }

            // Get a list of Rhdatas
            agent.get('/api/rhdatas')
              .end(function (rhdatasGetErr, rhdatasGetRes) {
                // Handle Rhdatas save error
                if (rhdatasGetErr) {
                  return done(rhdatasGetErr);
                }

                // Get Rhdatas list
                var rhdatas = rhdatasGetRes.body;

                // Set assertions
                (rhdatas[0].user._id).should.equal(userId);
                (rhdatas[0].name).should.match('Rhdata name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Rhdata if not logged in', function (done) {
    agent.post('/api/rhdatas')
      .send(rhdata)
      .expect(403)
      .end(function (rhdataSaveErr, rhdataSaveRes) {
        // Call the assertion callback
        done(rhdataSaveErr);
      });
  });

  it('should not be able to save an Rhdata if no name is provided', function (done) {
    // Invalidate name field
    rhdata.name = '';

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

        // Save a new Rhdata
        agent.post('/api/rhdatas')
          .send(rhdata)
          .expect(400)
          .end(function (rhdataSaveErr, rhdataSaveRes) {
            // Set message assertion
            (rhdataSaveRes.body.message).should.match('Please fill Rhdata name');

            // Handle Rhdata save error
            done(rhdataSaveErr);
          });
      });
  });

  it('should be able to update an Rhdata if signed in', function (done) {
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

        // Save a new Rhdata
        agent.post('/api/rhdatas')
          .send(rhdata)
          .expect(200)
          .end(function (rhdataSaveErr, rhdataSaveRes) {
            // Handle Rhdata save error
            if (rhdataSaveErr) {
              return done(rhdataSaveErr);
            }

            // Update Rhdata name
            rhdata.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Rhdata
            agent.put('/api/rhdatas/' + rhdataSaveRes.body._id)
              .send(rhdata)
              .expect(200)
              .end(function (rhdataUpdateErr, rhdataUpdateRes) {
                // Handle Rhdata update error
                if (rhdataUpdateErr) {
                  return done(rhdataUpdateErr);
                }

                // Set assertions
                (rhdataUpdateRes.body._id).should.equal(rhdataSaveRes.body._id);
                (rhdataUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Rhdatas if not signed in', function (done) {
    // Create new Rhdata model instance
    var rhdataObj = new Rhdata(rhdata);

    // Save the rhdata
    rhdataObj.save(function () {
      // Request Rhdatas
      request(app).get('/api/rhdatas')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Rhdata if not signed in', function (done) {
    // Create new Rhdata model instance
    var rhdataObj = new Rhdata(rhdata);

    // Save the Rhdata
    rhdataObj.save(function () {
      request(app).get('/api/rhdatas/' + rhdataObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', rhdata.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Rhdata with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/rhdatas/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Rhdata is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Rhdata which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Rhdata
    request(app).get('/api/rhdatas/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Rhdata with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Rhdata if signed in', function (done) {
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

        // Save a new Rhdata
        agent.post('/api/rhdatas')
          .send(rhdata)
          .expect(200)
          .end(function (rhdataSaveErr, rhdataSaveRes) {
            // Handle Rhdata save error
            if (rhdataSaveErr) {
              return done(rhdataSaveErr);
            }

            // Delete an existing Rhdata
            agent.delete('/api/rhdatas/' + rhdataSaveRes.body._id)
              .send(rhdata)
              .expect(200)
              .end(function (rhdataDeleteErr, rhdataDeleteRes) {
                // Handle rhdata error error
                if (rhdataDeleteErr) {
                  return done(rhdataDeleteErr);
                }

                // Set assertions
                (rhdataDeleteRes.body._id).should.equal(rhdataSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Rhdata if not signed in', function (done) {
    // Set Rhdata user
    rhdata.user = user;

    // Create new Rhdata model instance
    var rhdataObj = new Rhdata(rhdata);

    // Save the Rhdata
    rhdataObj.save(function () {
      // Try deleting Rhdata
      request(app).delete('/api/rhdatas/' + rhdataObj._id)
        .expect(403)
        .end(function (rhdataDeleteErr, rhdataDeleteRes) {
          // Set message assertion
          (rhdataDeleteRes.body.message).should.match('User is not authorized');

          // Handle Rhdata error error
          done(rhdataDeleteErr);
        });

    });
  });

  it('should be able to get a single Rhdata that has an orphaned user reference', function (done) {
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

          // Save a new Rhdata
          agent.post('/api/rhdatas')
            .send(rhdata)
            .expect(200)
            .end(function (rhdataSaveErr, rhdataSaveRes) {
              // Handle Rhdata save error
              if (rhdataSaveErr) {
                return done(rhdataSaveErr);
              }

              // Set assertions on new Rhdata
              (rhdataSaveRes.body.name).should.equal(rhdata.name);
              should.exist(rhdataSaveRes.body.user);
              should.equal(rhdataSaveRes.body.user._id, orphanId);

              // force the Rhdata to have an orphaned user reference
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

                    // Get the Rhdata
                    agent.get('/api/rhdatas/' + rhdataSaveRes.body._id)
                      .expect(200)
                      .end(function (rhdataInfoErr, rhdataInfoRes) {
                        // Handle Rhdata error
                        if (rhdataInfoErr) {
                          return done(rhdataInfoErr);
                        }

                        // Set assertions
                        (rhdataInfoRes.body._id).should.equal(rhdataSaveRes.body._id);
                        (rhdataInfoRes.body.name).should.equal(rhdata.name);
                        should.equal(rhdataInfoRes.body.user, undefined);

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
      Rhdata.remove().exec(done);
    });
  });
});
