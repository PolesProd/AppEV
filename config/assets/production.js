'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        'public/lib/angular-material/angular-material.min.css',
        'public/lib/angular-material-data-table/dist/md-data-table.min.css',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.min.css',
        'public/lib/bootstrap/dist/css/bootstrap.min.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
        'public/lib/leaflet/dist/leaflet.css',
        'public/lib/ng-material-datetimepicker/css/material-datetimepicker.css',
        'public/lib/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css',
        'public/lib/angular-bootstrap-colorpicker/css/colorpicker.min.css',
        // endbower
      ],
      js: [
        // bower:js
        'public/lib/angular/angular.min.js',
        'public/lib/angular-animate/angular-animate.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/lib/angular-messages/angular-messages.min.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-cookies/angular-cookies.min.js',
        'public/lib/angular-resource/angular-resource.min.js',
        'public/lib/angular-aria/angular-aria.min.js',
        'public/lib/angular-material/angular-material.min.js',
        'public/lib/angular-material-data-table/dist/md-data-table.min.js',
        'public/lib/angular-sanitize/angular-sanitize.min.js',
        'public/lib/moment/moment.js',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        'public/lib/ng-file-upload/ng-file-upload.min.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/leaflet/dist/leaflet-src.js',
        'public/lib/angular-leaflet-directive/dist/angular-leaflet-directive.min.js',
        'public/lib/angular-simple-logger/dist/angular-simple-logger.min.js',
        'public/lib/ng-material-datetimepicker/js/angular-material-datetimepicker.js',
        'public/lib/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js',
        'public/lib/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',
        // endbower
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/{css,less,scss}/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    img: [
      'modules/**/*/img/**/*.jpg',
      'modules/**/*/img/**/*.png',
      'modules/**/*/img/**/*.gif',
      'modules/**/*/img/**/*.svg'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: ['modules/*/server/config/*.js'],
    policies: 'modules/*/server/policies/*.js',
    views: ['modules/*/server/views/*.html']
  }
};
