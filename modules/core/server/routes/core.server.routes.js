'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);

  app.get('/images/:givenImageName', function (req, res, next) {
  	fs.files.findOne({name:req.params.givenImageName}, function (err, image) {
  		if (err) return next(err);
  			res.contentType(image.contentType);
  			res.send(image.data);
  	});
  });
};
