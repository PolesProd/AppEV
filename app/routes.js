// Dépendences.
var mongoose        = require('mongoose');
var User            = require('./model.js');

// Routes de l'App.
module.exports = function(app) {

  // Routes GET
  //   // --------------------------------------------------------
  //   // Récupére tous les utilisateurs enregistrés dans la bdd.
  app.get('/users', function(req, res){

    // Utilise le schéma de Mongoose pour exécuter la recherche(conditions vides).
    var query = User.find({});
    query.exec(function(err, users){
      if(err) {
        res.send(err);
      } else {
        // Si aucune erreur n'est trouvée, on répond avec un JSON de tous les utilisateurs.
        res.json(users);
      }
    });
  });

  // Routes POST
  // --------------------------------------------------------
  // Fournit une méthode pour enregistrer de nouveaux utilisateurs dans la bdd.
  app.post('/users', function(req, res){

    // Crée un nouvel utilisateur basé sur le schéma Mongoose et le post body.
    var newuser = new User(req.body);

    // Nouvel utilisateur sauvegarder dans la bdd.
    newuser.save(function(err){
      if(err)
      res.send(err);
      else
      // Si aucune erreur n'est trouvée, on répond avec un JSON du nouvel utilisateur.
      res.json(req.body);
    });
  });

  // Récupère des enregistrements JSON pour tous les utilisateurs qui répondent à un certain ensemble de conditions de requête.
  app.post('/query/', function(req, res){

    // Grab all of the query parameters from the body.
    var lat             = req.body.latitude;
    var long            = req.body.longitude;
    var distance        = req.body.distance;
    var male            = req.body.male;
    var female          = req.body.female;
    var other           = req.body.other;
    var minAge          = req.body.minAge;
    var maxAge          = req.body.maxAge;
    var favLang         = req.body.favlang;
    var reqVerified     = req.body.reqVerified;

    // Ouvre une requête Mongoose générique. Selon le corps du poste, on...
    var query = User.find({});

    // ... inclut filtre par Distance Max (conversion miles en mètres).
    if(distance){

      // Utilisation des fonctions d'interrogation géospatiale de MongoDB. (Notez comment les coordonnées sont réglées [long, lat].
      query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

      // Conversion de mètres en miles. Spécification de la géométrie sphérique (pour globe).
      maxDistance: distance * 1609.34, spherical: true});

    }

    // ... inclut un filtre par Sexe(toutes options).
    if(male || female || other){
      query.or([{ 'gender': male }, { 'gender': female }, {'gender': other}]);
    }

    // y compris filtre par Age minimum.
    if(minAge){
      query = query.where('age').gte(minAge);
    }

    // y compris filtre par Age maximum.
    if(maxAge){
      query = query.where('age').lte(maxAge);
    }

    // y compris filtrer par language favori.
    if(favLang){
      query = query.where('favlang').equals(favLang);
    }

    // ... inclut filtre pour emplacements HTML5 vérifiés.
    if(reqVerified){
      query = query.where('htmlverified').equals("Yep (Merci de nous avoir donné de vraies données!)");
    }

    // Exécute la requête & renvoi le résultats de la requête.
    query.exec(function(err, users){
      if(err)
      res.send(err);
      else
      // Si aucune erreur, on répond avec un JSON de tous les utilisateurs qui répondent aux critères.
      res.json(users);
    });
  });

  // DELETE Routes(Developpement Seulement).
  // ------------------------------------------------ ......
  // Supprimer un utilisateur de la carte en fonction de objID.
  app.delete('/users/:objID', function(req, res){
    var objID = req.params.objID;
    var update = req.body;

    User.findByIdAndRemove(objID, update, function(err, user){
      if(err)
      res.send(err);
      else
      res.json(req.body);
    });
  });
};
