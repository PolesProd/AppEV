'use strict';

/**
* Render the main application page
*/
exports.renderIndex = function (req, res, next) {
  // if (req.isAuthenticated()) {
  //   console.log('L\'utilisateur est connecté');
  res.render('modules/core/server/views/index', {
    user: req.user
  });
  // } else {
  //   console.log('L\'utilisateur n\'est pas connecté');
  //   res.redirect('/authentication/signin');
  // }

  // if user is authenticated in the session, carry on
  // if (req.isAuthenticated())
  // return next();
  // // if they aren't redirect them to the home page
  // if(req.route.path !== '/authentication/login')
  // res.redirect('/authentication/login');
  //
  // next();

  // if (!req.session.authenticated && req.url !== '/authentication/signin') {
  //   res.redirect('/authentication/signin');
  //   return;
  // }
  // next();
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
