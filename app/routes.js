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
            if(err)
            res.send(err);

            // Si aucune erreur n'est trouvée, on répond avec un JSON de tous les utilisateurs.
            res.json(users);
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

            // Si aucune erreur n'est trouvée, on répond avec un JSON du nouvel utilisateur.
            res.json(req.body);
        });
    });
};
