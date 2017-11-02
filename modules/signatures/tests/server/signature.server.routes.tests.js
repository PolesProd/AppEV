'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Signature = mongoose.model('Signature'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  signature;

/**
 * Signature routes tests
 */
describe('Signature CRUD tests', function () {

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

    // Save a user to the test db and create new Signature
    user.save(function () {
      signature = {
        name: 'Signature name'
      };

      done();
    });
  });

  it('should be able to save a Signature if logged in', function (done) {
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

        // Save a new Signature
        agent.post('/api/signatures')
          .send(signature)
          .expect(200)
          .end(function (signatureSaveErr, signatureSaveRes) {
            // Handle Signature save error
            if (signatureSaveErr) {
              return done(signatureSaveErr);
            }

            // Get a list of Signatures
            agent.get('/api/signatures')
              .end(function (signaturesGetErr, signaturesGetRes) {
                // Handle Signatures save error
                if (signaturesGetErr) {
                  return done(signaturesGetErr);
                }

                // Get Signatures list
                var signatures = signaturesGetRes.body;

                // Set assertions
                (signatures[0].user._id).should.equal(userId);
                (signatures[0].name).should.match('Signature name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Signature if not logged in', function (done) {
    agent.post('/api/signatures')
      .send(signature)
      .expect(403)
      .end(function (signatureSaveErr, signatureSaveRes) {
        // Call the assertion callback
        done(signatureSaveErr);
      });
  });

  it('should not be able to save an Signature if no name is provided', function (done) {
    // Invalidate name field
    signature.name = '';

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

        // Save a new Signature
        agent.post('/api/signatures')
          .send(signature)
          .expect(400)
          .end(function (signatureSaveErr, signatureSaveRes) {
            // Set message assertion
            (signatureSaveRes.body.message).should.match('Please fill Signature name');

            // Handle Signature save error
            done(signatureSaveErr);
          });
      });
  });

  it('should be able to update an Signature if signed in', function (done) {
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

        // Save a new Signature
        agent.post('/api/signatures')
          .send(signature)
          .expect(200)
          .end(function (signatureSaveErr, signatureSaveRes) {
            // Handle Signature save error
            if (signatureSaveErr) {
              return done(signatureSaveErr);
            }

            // Update Signature name
            signature.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Signature
            agent.put('/api/signatures/' + signatureSaveRes.body._id)
              .send(signature)
              .expect(200)
              .end(function (signatureUpdateErr, signatureUpdateRes) {
                // Handle Signature update error
                if (signatureUpdateErr) {
                  return done(signatureUpdateErr);
                }

                // Set assertions
                (signatureUpdateRes.body._id).should.equal(signatureSaveRes.body._id);
                (signatureUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Signatures if not signed in', function (done) {
    // Create new Signature model instance
    var signatureObj = new Signature(signature);

    // Save the signature
    signatureObj.save(function () {
      // Request Signatures
      request(app).get('/api/signatures')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Signature if not signed in', function (done) {
    // Create new Signature model instance
    var signatureObj = new Signature(signature);

    // Save the Signature
    signatureObj.save(function () {
      request(app).get('/api/signatures/' + signatureObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', signature.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Signature with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/signatures/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Signature is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Signature which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Signature
    request(app).get('/api/signatures/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Signature with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Signature if signed in', function (done) {
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

        // Save a new Signature
        agent.post('/api/signatures')
          .send(signature)
          .expect(200)
          .end(function (signatureSaveErr, signatureSaveRes) {
            // Handle Signature save error
            if (signatureSaveErr) {
              return done(signatureSaveErr);
            }

            // Delete an existing Signature
            agent.delete('/api/signatures/' + signatureSaveRes.body._id)
              .send(signature)
              .expect(200)
              .end(function (signatureDeleteErr, signatureDeleteRes) {
                // Handle signature error error
                if (signatureDeleteErr) {
                  return done(signatureDeleteErr);
                }

                // Set assertions
                (signatureDeleteRes.body._id).should.equal(signatureSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Signature if not signed in', function (done) {
    // Set Signature user
    signature.user = user;

    // Create new Signature model instance
    var signatureObj = new Signature(signature);

    // Save the Signature
    signatureObj.save(function () {
      // Try deleting Signature
      request(app).delete('/api/signatures/' + signatureObj._id)
        .expect(403)
        .end(function (signatureDeleteErr, signatureDeleteRes) {
          // Set message assertion
          (signatureDeleteRes.body.message).should.match('User is not authorized');

          // Handle Signature error error
          done(signatureDeleteErr);
        });

    });
  });

  it('should be able to get a single Signature that has an orphaned user reference', function (done) {
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

          // Save a new Signature
          agent.post('/api/signatures')
            .send(signature)
            .expect(200)
            .end(function (signatureSaveErr, signatureSaveRes) {
              // Handle Signature save error
              if (signatureSaveErr) {
                return done(signatureSaveErr);
              }

              // Set assertions on new Signature
              (signatureSaveRes.body.name).should.equal(signature.name);
              should.exist(signatureSaveRes.body.user);
              should.equal(signatureSaveRes.body.user._id, orphanId);

              // force the Signature to have an orphaned user reference
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

                    // Get the Signature
                    agent.get('/api/signatures/' + signatureSaveRes.body._id)
                      .expect(200)
                      .end(function (signatureInfoErr, signatureInfoRes) {
                        // Handle Signature error
                        if (signatureInfoErr) {
                          return done(signatureInfoErr);
                        }

                        // Set assertions
                        (signatureInfoRes.body._id).should.equal(signatureSaveRes.body._id);
                        (signatureInfoRes.body.name).should.equal(signature.name);
                        should.equal(signatureInfoRes.body.user, undefined);

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
      Signature.remove().exec(done);
    });
  });
});
