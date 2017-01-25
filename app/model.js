// Pull la dépendance de Mongoose pour créer des schémas.
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Crée un schéma utilisateur. Ce sera la base de la façon dont les données utilisateur sont stockées dans la bdd.
var UserSchema = new Schema({
    username:   {type: String, required: true},
    gender:     {type: String, required: true},
    age:        {type: Number, required: true},
    favlang:    {type: String, required: true},
    location:   {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Définit le paramètre created_at égal à l'heure courante.
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

// Index ce schéma au format 2dsphere(critique pour les recherches de proximité).
UserSchema.index({location: '2dsphere'});

// Exporte le UserSchema pour une utilisation ailleurs. Définit la collection MongoDB à utiliser comme: "scotch-users"
module.exports = mongoose.model('scotch-user', UserSchema);
