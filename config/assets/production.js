'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.css',
        'node_modules/leaflet/dist/leaflet.css',
        'public/lib/angular-material/angular-material.min.css',
        'public/lib/ng-material-datetimepicker/dist/material-datetimepicker.min.css',
        'public/lib/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
        'public/lib/angular-material-data-table/dist/md-data-table.min.css',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'public/lib/angular-bootstrap-colorpicker/css/colorpicker.min.css',
        'public/lib//angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css'
        // endbower
      ],
      js: [
        // bower:js
        'public/lib/jquery/dist/jquery.min.js',
        'node_modules/leaflet/dist/leaflet.js',
        'public/lib/angular/angular.js',
        'public/lib/moment/min/moment-with-locales.min.js',
        'public/lib/moment/locale/fr.js',
        'public/lib/angular-i18n/angular-locale_fr-fr.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/ng-file-upload/ng-file-upload.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-sanitize/angular-sanitize.min.js',
        'public/lib/angular-cookies/angular-cookies.min.js',
        'public/lib/angular-aria/angular-aria.min.js',
        'public/lib/angular-material/angular-material.min.js',
        'public/lib/ng-material-datetimepicker/dist/angular-material-datetimepicker.min.js',
        'public/lib/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js',
        'public/lib/angular-material-data-table/dist/md-data-table.min.js',
        'public/lib/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',
        'public/lib//angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/angular-leaflet-directive/dist/angular-leaflet-directive.min.js'
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
