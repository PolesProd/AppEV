# Vue d'ensemble

  Cette documentation simple couvrira les bases du développement de l'application.

  Avant de commencé je recommande de consulter les documentations des blocs fonctionnels de base qui compose l'application:

###### MongoDB
  Visiter le [site Web officiel](http://mongodb.org/) de MongoDB et plus particulièrement son [exellent documentation](http://docs.mongodb.org/manual/), qui devrait vous aider à comprendre mieux NoSQL et MongoDB.

###### Express
  La meilleure manière de comprendre express est par son [site Web officiel](http://expressjs.com/), en particulier le [guide express](http://expressjs.com/guide.html); vous pouvez également passer par ce [fil StackOverflow](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) pour plus de ressources.

###### AngularJS
  Le [site Web officiel AngularJS](http://angularjs.org/) est un bon point de départ. Vous pouvez également utiliser le  [Thinkster Popular Guide](http://www.thinkster.io/), et les [Egghead Videos](https://egghead.io/).

###### Node.js
  Commencez par visiter le [site Web officiel](http://nodejs.org/) de Node.js et ce [fil StackOverflow](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), qui devraient vous aider à mieux comprendre la plate-forme de Node.js en un rien de temps.

  Une fois ces différentes ressources(notions) de base assimilée passé aux autres sections.

# Mise en route

### Conditions préalables
Avant que vous commenciez, vous devriez vous veiller pour avoir installé toutes ces conditions préalables sur votre machine de développement.


###### Git
Assurez-vous que [Git](https://git-scm.com/downloads) est installé sur votre machine. Sur les machines OSX & Linux c'est déjà installé. Vous pouvez voir s'il est installé avec la commande:
```bash
 $ git --version
```
###### Node.js et npm
[Téléchargez et installez](http://www.nodejs.org/download) Node.js et le directeur de package npm, si vous rencontrez n'importe quels problèmes, vous pouvez également employer ce [GithubGist](https://gist.github.com/isaacs/579814) pour installer Node.js.

###### MongoDB
[Téléchargez et installez](http://www.mongodb.org/downloads) MongoDB, et assurez-vous qu'il fonctionne sur le port par défaut(27017).

###### Bower
Nous allons utilisé le [directeur de paquet bower](http://bower.io/) pour gérer l'ensembles du front-end, pour l'installer il faut déjà avoir installé Node.js & npm, puis installé bower globalement en utilisant npm:
```bash
  $ npm install -g bower
```
###### Grunt
nous allons utiliser [Grunt Task Runner](http://gruntjs.com/) pour automatiser notre processus de développement, pour l'installer il faut avoir installé Node.js & npm, puis installé grunt globalement en utilisant npm:
```bash
  $ npm install -grunt-cli
```
###### Glup (facultatif)
nous pouvons aussi utiliser le Gulp Task Runner au lieu de grunt. on peut utilisé glup pour rechargement live, Linting(gestion des erreurs css/js), et pour compilé SASS ou LESS.
```bash
 $ npm install -g glup
```
Note : Vous devez avoir les autorisations d'installer le paquet globalement, donc utilisé un super utilisateur ou un sudo.

# Téléchargement de l'application
Il y a plusieurs manières d'obtenir l'application:

##### Clonage du dépôt de GitHub
Vous pouvez également employer Git pour copier directement le dépôt de MEAN.JS:
```bash
$ git clone https://github.com/PolesProd/AppEV.git
```
Ceci copiera la dernière version du dépôt de l'application.

##### Télécharger le fichier zip de dépôt
Vous pouvez aussi télécharger une copie zip de la dernière version de l'application. Vous pouvez utilisé la commande wget:
```bash
$ wget https://github.com/PolesProd/AppEV/archive/master.zip
```

# Installation rapide
Une fois que vous avez installé toutes les conditions préalables, vous êtes presque près à commencé à développer l'application MEAN.

La première chose à faire est d'installer les dépendances de Node.js. Du fait de MEAN.JS le fichier package.json contient tous les package dont a besoin l'application pour fonctionner, pour en savoir plus au sujet de l'installation de package visiter la section NPM & Package.json.

Pour installer des dépendances de Node.js utiliser npm encore, avec la commande:
```bash
  $ npm installent
```
Cette commande :

D'abord elle installe les dépendances requises pour que l'application fonctionne.

Si vous êtes en cours d'exécution dans un environnement de développement, il va également installer des dépendances de développement nécessaires pour tester et exécuter votre application

Enfin, quand le procédé d'installation est terminé, le npm lancera la commande <b>bower install</b> pour installer tous les modules front-end requis pour l'application.

##### Lancer l'application avec le grunt
Après que le procédé d'installation soit terminé, vous pouvez lancé l'application en utilisant grunt, pour ce faire lancé la commande:
```bash
 $ grunt
```
L'application devrait ce lancé sur le port 3000 à l'adresse http://localhost:3000.

##### Lancer l'application avec glup (facultatif)
Après que le procédé d'installation soit terminé, vous pouvez lancé l'application en utilisant glup, pour ce faire lancé la commande:
```bash
 $ glup
 ```
 L'application devrait ce lancé sur le port 3000 à l'adresse http://localhost:3000.
