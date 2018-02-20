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
 * Employe Schema
 */
var EmployeSchema = new Schema({
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
  prenom: {
    type: String,
    default: '',
    trim: true,
    required: 'Prénom requis'
  },
  responsable: {
    type: String,
    default: '',
    required: 'Responsable requis'
  },
  adresse: {
    type: String,
    default: '',
    required: 'Adresse requise'
  },
  code_postal: {
    type: Number,
    default: '',
    required: 'Code postal requis'
  },
  ville: {
    type: String,
    default: '',
    required: 'Ville requise'
  },
  profil: {
    Type: String,
    default: ''
  },
  telephone: {
    type: String,
    default: '',
    required: 'Téléphone requis'
  },
  email: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: '',
    required: 'Contrat requis'
  },
  debutContrat: {
    type: Date,
    default: Date.now,
    required: ''
  },
  finContrat: {
    type: Date,
    default: Date.now,
    required: ''
  },
  renouvContrat: {
    type: Date,
    default: Date.now
  },
  finRenouvContrat: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
}, { collection: 'employees' });

EmployeSchema.statics.seed = seed;

mongoose.model('Employe', EmployeSchema);

/**
* Seeds the User collection with document (Employe)
* and provided options.
*/
function seed(doc, options) {
  var Employe = mongoose.model('Employe');

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
        Employe
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

            // Remove Employe (overwrite)

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
            message: chalk.yellow('Database Seeding: Employe\t' + doc.title + ' skipped')
          });
        }

        var employe = new Employe(doc);

        employe.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Employe\t' + employe.title + ' added'
          });
        });
      });
    }
  });
}
