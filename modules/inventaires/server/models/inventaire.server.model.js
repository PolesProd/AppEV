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
 * Inventaire Schema
 */
var InventaireSchema = new Schema({
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
    type: String,
    default: '',
    trim: true,
    required: 'Date requise'
  },
  au: {
    type: String,
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

InventaireSchema.statics.seed = seed;

mongoose.model('Inventaire', InventaireSchema);

/**
* Seeds the User collection with document (Inventaire)
* and provided options.
*/
function seed(doc, options) {
  var Inventaire = mongoose.model('Inventaire');

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
        Inventaire
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

            // Remove Inventaire (overwrite)

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
            message: chalk.yellow('Database Seeding: Inventaire\t' + doc.title + ' skipped')
          });
        }

        var equipe = new Inventaire(doc);

        equipe.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Inventaire\t' + equipe.title + ' added'
          });
        });
      });
    }
  });
}
