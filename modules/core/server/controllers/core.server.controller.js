'use strict';

/**
 * Module dependencies.
 */
// var _ = require('lodash');

/**
 * Extend user's controller
 */
// module.exports = _.extend(
//   require('./modules/users/server/controllers/users/users.authentication.server.controller'),
//   require('./modules/users/server/controllers/users/users.authorization.server.controller'),
//   require('./modules/users/server/controllers/users/users.password.server.controller'),
//   require('./modules/users/server/controllers/users/users.profile.server.controller')
// );

/**
* Render the main application page
*/
exports.renderIndex = function (req, res) {
  // if (!req.user.isAuthenticated())
  //   res.redirect('/authentication/signin');
  // else
  res.render('modules/core/server/views/index', {
    user: req.user
  });
};

/**
* Render the server error page
*/
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
* Render the server not found responses
* Performs content-negotiation on the Accept HTTP header
*/
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
