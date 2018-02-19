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
 * Equipe Schema
 */
var EquipeSchema = new Schema({
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
  site: {
    type: String,
    default: '',
    trim: true,
    required: 'Au moins 1 site requis'
  },
  responsable: {
    type: String,
    default: ''
  },
  membre: {
    type: String,
    default: '',
    required: 'Au moins 3 membres sont requis'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
}, { collection: 'teams' });

EquipeSchema.statics.seed = seed;

mongoose.model('Equipe', EquipeSchema);

/**
* Seeds the User collection with document (Equipe)
* and provided options.
*/
function seed(doc, options) {
  var Equipe = mongoose.model('Equipe');

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
        Equipe
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

            // Remove Equipe (overwrite)

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
            message: chalk.yellow('Database Seeding: Equipe\t' + doc.title + ' skipped')
          });
        }

        var equipe = new Equipe(doc);

        equipe.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Equipe\t' + equipe.title + ' added'
          });
        });
      });
    }
  });
}
