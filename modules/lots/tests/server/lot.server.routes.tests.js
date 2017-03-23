'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Lot = mongoose.model('Lot'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  lot;

/**
 * Lot routes tests
 */
describe('Lot CRUD tests', function () {

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

    // Save a user to the test db and create new Lot
    user.save(function () {
      lot = {
        name: 'Lot name'
      };

      done();
    });
  });

  it('should be able to save a Lot if logged in', function (done) {
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

        // Save a new Lot
        agent.post('/api/lots')
          .send(lot)
          .expect(200)
          .end(function (lotSaveErr, lotSaveRes) {
            // Handle Lot save error
            if (lotSaveErr) {
              return done(lotSaveErr);
            }

            // Get a list of Lots
            agent.get('/api/lots')
              .end(function (lotsGetErr, lotsGetRes) {
                // Handle Lots save error
                if (lotsGetErr) {
                  return done(lotsGetErr);
                }

                // Get Lots list
                var lots = lotsGetRes.body;

                // Set assertions
                (lots[0].user._id).should.equal(userId);
                (lots[0].name).should.match('Lot name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Lot if not logged in', function (done) {
    agent.post('/api/lots')
      .send(lot)
      .expect(403)
      .end(function (lotSaveErr, lotSaveRes) {
        // Call the assertion callback
        done(lotSaveErr);
      });
  });

  it('should not be able to save an Lot if no name is provided', function (done) {
    // Invalidate name field
    lot.name = '';

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

        // Save a new Lot
        agent.post('/api/lots')
          .send(lot)
          .expect(400)
          .end(function (lotSaveErr, lotSaveRes) {
            // Set message assertion
            (lotSaveRes.body.message).should.match('Please fill Lot name');

            // Handle Lot save error
            done(lotSaveErr);
          });
      });
  });

  it('should be able to update an Lot if signed in', function (done) {
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

        // Save a new Lot
        agent.post('/api/lots')
          .send(lot)
          .expect(200)
          .end(function (lotSaveErr, lotSaveRes) {
            // Handle Lot save error
            if (lotSaveErr) {
              return done(lotSaveErr);
            }

            // Update Lot name
            lot.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Lot
            agent.put('/api/lots/' + lotSaveRes.body._id)
              .send(lot)
              .expect(200)
              .end(function (lotUpdateErr, lotUpdateRes) {
                // Handle Lot update error
                if (lotUpdateErr) {
                  return done(lotUpdateErr);
                }

                // Set assertions
                (lotUpdateRes.body._id).should.equal(lotSaveRes.body._id);
                (lotUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Lots if not signed in', function (done) {
    // Create new Lot model instance
    var lotObj = new Lot(lot);

    // Save the lot
    lotObj.save(function () {
      // Request Lots
      request(app).get('/api/lots')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Lot if not signed in', function (done) {
    // Create new Lot model instance
    var lotObj = new Lot(lot);

    // Save the Lot
    lotObj.save(function () {
      request(app).get('/api/lots/' + lotObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', lot.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Lot with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/lots/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Lot is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Lot which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Lot
    request(app).get('/api/lots/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Lot with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Lot if signed in', function (done) {
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

        // Save a new Lot
        agent.post('/api/lots')
          .send(lot)
          .expect(200)
          .end(function (lotSaveErr, lotSaveRes) {
            // Handle Lot save error
            if (lotSaveErr) {
              return done(lotSaveErr);
            }

            // Delete an existing Lot
            agent.delete('/api/lots/' + lotSaveRes.body._id)
              .send(lot)
              .expect(200)
              .end(function (lotDeleteErr, lotDeleteRes) {
                // Handle lot error error
                if (lotDeleteErr) {
                  return done(lotDeleteErr);
                }

                // Set assertions
                (lotDeleteRes.body._id).should.equal(lotSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Lot if not signed in', function (done) {
    // Set Lot user
    lot.user = user;

    // Create new Lot model instance
    var lotObj = new Lot(lot);

    // Save the Lot
    lotObj.save(function () {
      // Try deleting Lot
      request(app).delete('/api/lots/' + lotObj._id)
        .expect(403)
        .end(function (lotDeleteErr, lotDeleteRes) {
          // Set message assertion
          (lotDeleteRes.body.message).should.match('User is not authorized');

          // Handle Lot error error
          done(lotDeleteErr);
        });

    });
  });

  it('should be able to get a single Lot that has an orphaned user reference', function (done) {
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

          // Save a new Lot
          agent.post('/api/lots')
            .send(lot)
            .expect(200)
            .end(function (lotSaveErr, lotSaveRes) {
              // Handle Lot save error
              if (lotSaveErr) {
                return done(lotSaveErr);
              }

              // Set assertions on new Lot
              (lotSaveRes.body.name).should.equal(lot.name);
              should.exist(lotSaveRes.body.user);
              should.equal(lotSaveRes.body.user._id, orphanId);

              // force the Lot to have an orphaned user reference
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

                    // Get the Lot
                    agent.get('/api/lots/' + lotSaveRes.body._id)
                      .expect(200)
                      .end(function (lotInfoErr, lotInfoRes) {
                        // Handle Lot error
                        if (lotInfoErr) {
                          return done(lotInfoErr);
                        }

                        // Set assertions
                        (lotInfoRes.body._id).should.equal(lotSaveRes.body._id);
                        (lotInfoRes.body.name).should.equal(lot.name);
                        should.equal(lotInfoRes.body.user, undefined);

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
      Lot.remove().exec(done);
    });
  });
});
