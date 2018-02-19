'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

/**
 * Planning Schema
 */
var PlanningSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  nom: {
    type: String,
    default: '',
    trim: true,
    required: 'Nom requis'
  },
  du: {
    type: Date,
    default: '',
    required: 'Date requise'
  },
  au: {
    type: Date,
    default: '',
    required: 'Date requise'
  },
  equipe: {
    type: String,
    default: '',
    required: 'Équipe requise'
  },
  site: {
    type: String,
    default: '',
    required: 'Site requis'
  },
  taches: {
    type: String,
    default: '',
    required: 'Au moins 3 tâches sont requise'
  },
  isFullDay: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
}, { collection: 'plannings' });

PlanningSchema.statics.seed = seed;

mongoose.model('Planning', PlanningSchema);

/**
* Seeds the User collection with document (Planning)
* and provided options.
*/
function seed(doc, options) {
  var Planning = mongoose.model('Planning');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(findAdminUser)
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function findAdminUser(skip) {
      var User = mongoose.model('User');

      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve(true);
        }

        User
          .findOne({
            roles: { $in: ['admin'] }
          })
          .exec(function (err, admin) {
            if (err) {
              return reject(err);
            }

            doc.user = admin;

            return resolve();
          });
      });
    }

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Planning
          .findOne({
            title: doc.title
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

            // Remove Planning (overwrite)

            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Planning\t' + doc.title + ' skipped')
          });
        }

        var equipe = new Planning(doc);

        equipe.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Planning\t' + equipe.title + ' added'
          });
        });
      });
    }
  });
}
