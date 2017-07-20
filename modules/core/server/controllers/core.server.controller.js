'use strict';
var chalk = require('chalk');
/**
* Render the main application page
*/
exports.renderIndex = function (req, res) {
  // if (req.session.authenticated) {
  //   console.log('MessageServer: "-core-server-controller-status": "-> CONNECTER"');
  //   res.render('modules/core/server/views/index', {
  //     user: req.user
  //   });
  // } else {
  //   console.log('MessageServer: "-core-server-controller-status": "-> DECONNECTER"');
  //   res.redirect('/authentication/signin');
  //   return;
  // }
  // if (req.isAuthenticated ()) {
    // console.log(chalk.green('The user is logged in'));
    res.render('modules/core/server/views/index', {
      user: req.user
    });
  // } else {
  //   console.log (chalk.red('The user is not logged in'));
  //   res.redirect('/authentication/signin');
  // }
};

/**
* Render the server error page
*/
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'It looks like the server does not want to work...'
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
