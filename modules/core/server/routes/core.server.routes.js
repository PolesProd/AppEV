'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');
  // var users = require('./modules/users/server/controllers/users.server.controller');
  //
  // // Setting up the users profile api
  // app.route('/api/users/me').get(users.me);
  // app.route('/api/users').put(users.update);
  // app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  // app.route('/api/users/password').post(users.changePassword);
  // app.route('/api/users/picture').post(users.changeProfilePicture);
  //
  // // Finish by binding the user middleware
  // app.param('userId', users.userByID);

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // route to test if the user is logged in or not
  // app.get('/signin', function(req, res) {
  //   res.send(req.isAuthenticated() ? req.user : '0');
  // });

  // Define application route
  app.route('/*').get(core.renderIndex);
};
