'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Rhdatas Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/rhdatas',
      permissions: '*'
    }, {
      resources: '/api/rhdatas/:rhdataId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/rhdatas',
      permissions: ['get', 'post']
    }, {
      resources: '/api/rhdatas/:rhdataId',
      permissions: ['get']
    }, {
      resources: '/api/emplyes/:employeId',
      permissions: ['get', 'post']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/rhdatas',
      permissions: ['get']
    }, {
      resources: '/api/rhdatas/:rhdataId',
      permissions: ['get']
    }, {
      resources: '/api/emplyes/:employeId',
      permissions: ['get', 'post']
    }]
  }]);
};

/**
 * Check If Rhdatas Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Rhdata is being processed and the current user created it then allow any manipulation
  if (req.rhdata && req.user && req.rhdata.user && req.rhdata.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
