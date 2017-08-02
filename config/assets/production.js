'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/isteven-angular-multiselect/isteven-multi-select.css',
        'public/lib/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css'
      ],
      js: [
        'public/lib/moment/min/moment-with-locales.min.js',
        'public/lib/angular/angular.js',
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/angular/angular-locales.fr.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js',
        'public/lib/angular-leaflet-directive/dist/angular-leaflet-directive.min.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/isteven-angular-multiselect/isteven-multi-select.js'
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
      'https://npmcdn.com/leaflet@1.0.0-rc.3/dist/leaflet.js'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  }
};
