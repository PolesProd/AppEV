// Définit les options de la base de données MongoDB.
module.exports = {

    mongolab:
    {
        name: "mongolab",
        url: "mongodb://",
        port: 27017
    },

    local:
    {
        name: "scotch-user-map-local",
        url: "mongodb://localhost:27017/appev",
        port: 27017
    },

    localtest:
    {
        name: "scotch-user-map-local",
        url: "mongodb://localhost/AppEVTest",
        port: 27017
    }

};
