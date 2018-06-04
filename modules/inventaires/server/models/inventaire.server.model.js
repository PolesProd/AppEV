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
  modele: {
    type: String,
    default: '',
    trim: true,
    required: 'Modèle requis'
  },
  marque: {
    type: String,
    default: '',
    trim: true,
    required: 'Marque requise'
  },
  quantite: {
    type: String,
    default: '',
    required: 'Quantité requise'
  },
  status: {
    type: String,
    default: '',
    required: 'Status requis'
  },
  lieu: {
    type: String,
    default: '',
    required: 'Site requis'
  },
  type: {
    type: String,
    default: '',
    required: 'Type requis'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
}, { collection: 'inventories' });

InventaireSchema.statics.seed = seed;

mongoose.model('Inventaire', InventaireSchema);

/**
 * Seeds the User collection with document (Inventaire)
 * and provided options.
 */
function seed(doc, options) {
  var Inventaire = mongoose.model('Inventaire');

  return new Promise(function(resolve, reject) {

    skipDocument()
      .then(findAdminUser)
      .then(add)
      .then(function(response) {
        return resolve(response);
      })
      .catch(function(err) {
        return reject(err);
      });

    function findAdminUser(skip) {
      var User = mongoose.model('User');

      return new Promise(function(resolve, reject) {
        if (skip) {
          return resolve(true);
        }

        User
          .findOne({
            roles: { $in: ['admin'] }
          })
          .exec(function(err, admin) {
            if (err) {
              return reject(err);
            }

            doc.user = admin;

            return resolve();
          });
      });
    }

    function skipDocument() {
      return new Promise(function(resolve, reject) {
        Inventaire
          .findOne({
            title: doc.title
          })
          .exec(function(err, existing) {
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

            existing.remove(function(err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function(resolve, reject) {
        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Inventaire\t' + doc.title + ' skipped')
          });
        }

        var equipe = new Inventaire(doc);

        equipe.save(function(err) {
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