'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css',
        'public/lib/owl.carousel/dist/assets/owl.carousel.min.css',
        'public/lib/leaflet.modal/dist/leaflet.modal.min.css',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'public/lib/angular-material/angular-material.min.css'
      ],
      js: [
        'public/lib/moment/min/moment.min.js',
        'public/lib/interactjs/dist/interact.min.js',
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-jquery/dist/angular-jquery.min.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-moment/angular-moment.min.js',
        'public/lib/angular-sanitize/angular-sanitize.min.js',
        'public/lib/angular-cookies/angular-cookies.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-aria/angular-aria.min.js',
        'public/lib/angular-material/angular-material.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-i18n/angular-locale_fr-fr.js',
        'public/lib/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js',
        'public/lib/bootstrap/dist/js/bootstrap.js',
        'public/lib/owl.carousel/dist/owl.carousel.min.js',
        'public/lib/angular-smart-table/dist/smart-table.min.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/angular-leaflet-directive/dist/angular-leaflet-directive.min.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js'
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css',
      'https://npmcdn.com/leaflet@1.0.0-rc.3/dist/leaflet.css'
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
      'modules/*/client/**/*.js',
      'https://npmcdn.com/leaflet@1.0.0-rc.3/dist/leaflet.js',
      'public/lib/leaflet.modal/dist/Leaflet.Modal.min.js'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};
