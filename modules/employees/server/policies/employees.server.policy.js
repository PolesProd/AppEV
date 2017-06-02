'use strict';

/**
* Module dependencies
*/
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
* Invoke Employees Permissions
*/
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/employees',
      permissions: '*'
    }, {
      resources: '/api/employees/:employeeId',
      permissions: '*'
    }, {
      resources: '/api/teams',
      permissions: '*'
    }, {
      resources: '/api/teams/:teamsId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/employees',
      permissions: ['get', 'post']
    }, {
      resources: '/api/employees/:employeeId',
      permissions: ['get']
    }, {
      resources: '/api/teams',
      permissions: ['get', 'post']
    }, {
      resources: '/api/teams/:teamsId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/employees',
      permissions: ['get']
    }, {
      resources: '/api/employees/:employeeId',
      permissions: ['get']
    }]
  }]);
};

/**
* Check If Employees Policy Allows
*/
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Employee is being processed and the current user created it then allow any manipulation
  if (req.employee && req.user && req.employee.user && req.employee.user.id === req.user.id) {
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
