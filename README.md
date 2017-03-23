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
nous pouvons aussi utiliser le Gulp Task Runner au lieu de grunt. on peut utilisé glup pour rechargement live, Linting(gestion), et pour compilé SASS ou LESS.
 $ npm install -g glup

Note : Votre utilisateur ne pourrait pas avoir les autorisations d'installer le paquet globalement, ainsi employez un super utilisateur ou un sudo.

# Téléchargement MEAN.JS
Il y a plusieurs manières que vous pouvez obtenir le texte constant de MEAN.JS :

Générateur de Yo
Bien que le générateur de meanjs soit libéré, les sous générateurs sont toujours en cours de développement. Voyez le Repo de générateur pour l'information sur la façon dont utiliser le générateur de meanjs.

Note : Si vous voulez soutenir la fusion de git la met à jour serait meilleure d'employer le clone de git pour votre création initiale de projet, ne vous inquiètent pas pourrait toujours utiliser le générateur.

Clonage du dépôt de GitHub
Vous pouvez également employer Git pour copier directement le dépôt de MEAN.JS :

meanjs de https://github.com/meanjs/mean.git de clone de git de $
Ceci copiera la dernière version du dépôt de MEAN.JS à un dossier de meanjs.

Télécharger le fichier zip de dépôt
Une autre manière d'employer le texte constant de MEAN.JS est de télécharger une copie de fermeture éclair de la dernière version d'écurie de MEAN.JS. Vous pouvez également faire ceci utilisant la commande de wget :

$ de wget https://github.com/meanjs/mean/archive/v0.4.2.zip - O meanjs.zip ; défaites la fermeture éclair de meanjs.zip ; rm meanjs.zip
N'oubliez pas de retitrer mean-0.4.2 après votre nom de projet.

Installez vite
Une fois que vous avez installé toutes les conditions préalables, vous êtes juste quelques étapes à partir de commencer à vous développer application MOYENNE.

La première chose que vous devriez faire est d'installer les dépendances de Node.js. Le texte constant vient pré-empaqueté avec un package.jsonfile qui contient la liste de modules que vous devez commencer votre application, à l'en savoir plus au sujet des modules installés visitent la section de NPM &Package.json.

Pour installer des dépendances de Node.js vous allez employer le npm encore, courez juste ceci dans le commande-line :

  $ de npm installent

Cette commande fait quelques choses :
D'abord il installera les dépendances requises pour application pour courir.
Si vous courez dans un environnement de développement, il installera alors également des dépendances de développement requises pour examiner et courir votre application.
En conclusion, quand le procédé d'installation est terminé, le npm lancera un installcommand de tonnelle pour installer tous les modules d'entrée requis pour l'application.
Fonctionnement de votre application avec le grognement
Après que le procédé d'installation soit terminé, vous pourrez courir votre application utilisant le grognement, courez juste la tâche de défaut de grognement :

 grognement de $
Votre application devrait fonctionner sur le port 3000 ainsi en votre navigateur entrez juste à http://localhost:3000.
Courant votre application avec le groupe d'octets (facultatif)
Après que le procédé d'installation soit terminé, vous pourrez courir votre application utilisant le groupe d'octets, courez juste la tâche de défaut de groupe d'octets :

 groupe d'octets de $
Votre application devrait fonctionner sur le port 3000 ainsi en votre navigateur entrez juste à http://localhost:3000.
Voilà. votre application devrait fonctionner à ce jour, pour se poursuivre par votre contrôle de développement les autres sections dans cette documentation.
Si vous rencontrez n'importe quel essai de problème la section de dépannage.

Dépannage
Pendant la procédure d'installation vous pouvez rencontrer quelques problèmes, ainsi que pouvez-vous faire ?
Vérifiez Node.js et versions de npm
Les avancements rapides dans des modules de Javascript peuvent parfois causer des questions de version avec les dépendances du MOYEN. Nous essayons de suivre les versions stables, et nous assurons que les versions de modules sont compatibles avec ces versions. Nous ne pouvons pas commander les versions préinstallées de plates-formes, ainsi assurez-vous que vous n'avez pas installé des versions sans support de Node.js et de MongoDB.

MongoDB
La version 2.4.x de MongoDB est soutenue.
Node.js
La version 0.12.x de noeud est soutenue.
npm
la version 2.0.x de npm est soutenue.
Mettez à jour le npm, la tonnelle, le grognement, ou le groupe d'octets
Vous pouvez trouver qu'il y a d'erreur étrange pendant installent comme l'erreur des npm : ENOENT, mettant à jour habituellement ces outils à la dernière version résout le problème.

Mettant à jour le npm (Unix/Linux)
Pour mettre à jour le npm courez juste cette commande dans le commande-line :
 mise à jour de npm de $ - npm de g
Mettant à jour le npm (Windows)
Il y a une question connue avec le npm 1.x qui est installé par défaut avec la dernière version de NodeJS. Si vous éprouvez les serrures de dossier pendant le « npm installent » l'étape, se réfèrent svp ici.

Mise à jour de la tonnelle
Pour mettre à jour la tonnelle courez juste cette commande dans le commande-line :
 mise à jour de npm de $ - tonnelle de g
Mise à jour du grognement
Pour mettre à jour le grognement courez juste cette commande dans le commande-line :
 mise à jour de npm de $ - g grognement-cli
Mise à jour du groupe d'octets
Pour mettre à jour le groupe d'octets courez juste cette commande dans le commande-line :
 mise à jour de npm de $ - groupe d'octets de g
Npm de nettoyage et cachette de tonnelle
Le npm et la tonnelle emploie un système de mise en antémémoire qui cache les paquets que vous avez déjà installés. Le npm souvent de nettoyage et la cachette de la tonnelle peuvent résoudre certains des problèmes que vous rencontrez pendant la procédure d'installation.

La cachette des npm de nettoyage
Pour nettoyer la cachette des npm courez juste cette commande dans le commande-line :
 cachette de npm de $ propre
La cachette de la tonnelle de nettoyage
Pour nettoyer la cachette de la tonnelle courez juste cette commande dans le commande-line :
 cachette de tonnelle de $ propre
Questions communes
Il y a quelques erreurs communes tout en installant le moyen :

Le noeud fonctionne mais l'application d'AngularJS ne chargera pas
Le contrôle au voir tous vos paquets d'entrée ont été installés. Le directeur de paquet de tonnelle est habitué pour installer le paquet d'entrée et il aura besoin d'un dossier de .bowerrc pour installer les paquets dans le bon emplacement.
La tonnelle devrait installer les paquets dans le public/dossier de bibliothèque, ainsi si ce dossier ou certains de ses sous-dossiers n'existe pas, pour fonctionner :
 mise à jour de tonnelle de $
Ceci installera les paquets absents.
Erreur : pour se relier à [localhost : 27017]
Si vous employez un contrôle local de MongoDB pour voir si son fonctionnement. Au cas où vous emploieriez un service externe vérifiez URI dans les fichiers de configuration.
Parfois ce peut être une question locale ou quelque chose que nous n'avons pas couvert, au cas où vous auriez toute autre question satisfont le contactez-nous par l'intermédiaire de la page de la communauté.

Noeud-culot commun, grognement-culot, question de groupe d'octets-culot
Une autre erreur commune pour des applications utilisant le CULOT tourne autour du noeud-culot et le grognement-culot ou le groupe d'octets-culot selon votre choix. L'erreur peut se produire pendant le npm installent ou en mettant en marche le serveur.

L'erreur pendant installent au sujet du noeud-culot, du grognement-culot, ou du groupe d'octets-culot
Désinstallez d'abord le projet et les modules globaux de groupe d'octets-culot et de grognement-culot.
 $ de npm désinstallent le grognement-culot
$ de npm désinstallent le groupe d'octets-culot
$ de npm désinstallent - le grognement-culot de g
$ de npm désinstallent - le groupe d'octets-culot de g
Désinstallez après le module global de noeud-culot.
 $ de npm désinstallent - le noeud-culot de g
Installez le noeud-culot global premier. Installez alors les modules de grognement-culot et/ou de groupe d'octets-culot.
 $ de npm installent le grognement-culot
$ de npm installent le groupe d'octets-culot
Essayez maintenant le npm installent encore du dossier de projet.
 $ de npm installent
Si votre npm installent échoue toujours en ce moment. Répétez les étapes ci-dessus mais la reconstruction de npm d'utilisation - g après que le noeud-culot global installent, mais avant d'installer les modules de culot de grognement/groupe d'octets de projet.
 reconstruction de npm de $ - g
Comme suggéré ci-dessus, vous pouvez également essayer la mise à jour de npm.
 mise à jour de npm de $ - g
Dossiers
La structure de dossier de votre application de MEANJS est montrée dans le diagramme suivant :

 Structure de dossier de MEANJS

Le dossier de racine d'application est montré ici avec le <project-home> de nom mais le vôtre sera appelé celui que vous aimiez selon la façon dont vous décidez d'identifier votre propre application. Est ci-dessous une explication de ce qui disparaît où et pourquoi.

<project-home>
C'est la base de votre application et tient ce qui suit :

Fichiers de configuration d'application ;
Fichiers de configuration cachés ;
Un ensemble de dossiers employés pour établir et commencer votre application ; et enfin et surtout…
Les quatre dossiers principaux contenant de divers modules et bibliothèques de code.
config
Le dossier de config est où vous logez tous les arrangements d'exécution variables de configuration employés par votre application aussi bien qu'un ensemble de fonctions d'aide d'application. Les sous-dossiers suivants sont présents dans des config…

config/capitaux
Cette section contient votre cadre de gestion de patrimoine. Quand votre application de MEANJS fonctionne, il y aura un ensemble de capitaux employés pour fournir la fonctionnalité à vos utilisateurs. Les capitaux dans ce contexte se composent des dossiers de tels images, feuilles de style en cascade (CSS), Javascript (js) et vues (c.-à-d. calibres de HTML).

En plus, il peut y avoir des variations sur les différents capitaux spécifiques utilisés selon lesquels l'environnement votre application fonctionne dedans (c.-à-d. réalisateur, essai, poussée). Le rôle essentiel de ce cadre de capitaux est de dire à l'application quels dossiers de capitaux il doit connaître et où il peut les trouver.

config/ENV
Cette section tient les dossiers qui fournissent des arrangements de configuration pour différents environnements système (c.-à-d. gens du pays, réalisateur, essai, poussée) soutenus par votre application de MEANJS.

config/bibliothèque
La section bibliothèque est à la maison à de diverses fonctions d'aide, c.-à-d. des modules de 'bibliothèque', employés par votre application de MEANJS. Elle inclut les composants qui fournissent l'appui tel qu'amorcer l'application, établissant des expresscapabilities, notant, l'interaction de base de données, téléchargements à parties multiples, semant de nouveaux comptes utilisateurs, et établissant des connexions de prise.

modules
Le dossier de modules est à la maison à la logique d'entrée principale d'AngularJS pour l'application. Car vous créez de diverses capacités et caractéristiques d'entrée dans l'application, chacun résidera dans ce dossier comme module autonome. Comme décrit dans le guide de promoteur d'AngularJS, « vous pouvez penser à un module comme récipient pour les différentes parties de votre APP ».

Tandis que nous fournissons quelques uns hors de la boîte, vous serez responsable de créer vos propres modules comme vous employez MEANJS pour développer votre propre application. Les sous-répertoires dans chaque dossier de modules devraient généralement avoir la structure suivante…

modules/*/client
Code de clients et dossiers associés concernant le module spécifique.

modules/*/server
Code de côté serveur et dossiers associés concernant le module spécifique.

modules/*/tests
Le code et les dossiers associés employés pour vérifier/valident l'autre code lié au module.

public
Ce dossier contient tous les dossiers d'entrée statiques employés par l'APP à servir. Il inclut des éléments établis de la source aussi bien que des tiers bibliothèques externes de votre application exigées par votre application.

Car vous procédez en établissant votre application, vous verrez deux sous-dossiers dans le dossier public…

public/bibliothèque
Des bibliothèques externes employées par votre application et présentées par la tonnelle seront placées ici.

public/dist
Des dossiers d'application finaux que vous construisez opérationnel seront placés ici. Par exemple, ce sera la destination pour les manuscrits minified pour l'usage dans la production.

scripts
Ce dossier est à la maison à de divers manuscrits d'aide utilisés pendant le développement, l'administration et l'opération de votre application.

Essais de serveur
Nous employons le moka pour examiner la logique de côté serveur. Les essais de moka sont asynchrones, faciles à maintenir, et des utilisations une syntaxe lisible de BDD.

Affirmations

Le moka a besoin d'une bibliothèque externe d'affirmation pour affirmer le résultat de chaque essai, dans ce cas Should.js est employé. Si est une bibliothèque expressive visant à simplifier des essais et à être lisible. Elle prolonge l'Object.prototype avec un acquéreur non-enumerable simple qui te permet d'exprimer comment cet objet devrait se comporter.

Examinez les dossiers

Chaque entité ont son propre dossier d'essai localisé à l'intérieur de leur dossier respectif d'essais de serveur de module. Ex. : modules/noyau/essais/serveur

Essais d'écriture

Il y a quelques étapes communes que nous employons pour examiner une entité :

Dans le beforeEach ou avant des fonctions prenez soin des conditions préalables et créez les objets que vous êtes sur le point pour employer dans vos essais.
Pour chaque début d'essai avec une fonction de description pour indiquer quelle méthode est examinée.
Après, ajoutez vos essais de scénario utilisant il fonction.
Dans il fonction courent la fonctionnalité et l'utilisation d'essais si affirmez ce qu'être le résultat final devrait.
Enfin l'utilisation ensuite ou l'afterEach fonctionne pour mener vos essais et espace libre à bonne fin la base de données d'essai.
Passeport
Le passeport est un intergiciel d'authentification, qui te permet d'appliquer beaucoup de méthodes d'authentification dans votre application exprès.

Le passeport utilise une approche modulaire qui utilise des modules de stratégies d'authentification, offrant des solutions simples et configurables d'authentification.

Ce texte constant vient pré-empaqueté avec 7 mécanismes d'authentification mis en application dans le dossier des config/passport.js :

Local
La stratégie locale est employée pour authentifier des utilisateurs par l'intermédiaire de l'username et du mot de passe.
Facebook
La stratégie de Facebook est employée pour authentifier des utilisateurs par l'intermédiaire de leur compte de Facebook.
Github
La stratégie de Github est employée pour authentifier des utilisateurs par l'intermédiaire de leur compte de Github.
Google
La stratégie de Google est employée pour authentifier des utilisateurs par l'intermédiaire de leur compte de Google.
Linkedin
La stratégie de Linkedin est employée pour authentifier des utilisateurs par l'intermédiaire de leur compte de Linkedin.
Paypal
La stratégie de Paypal est employée pour authentifier des utilisateurs par l'intermédiaire de leur compte de Paypal.
Twitter
La stratégie de Twitter est employée pour authentifier des utilisateurs par l'intermédiaire de leur compte de Twitter.
Pour comprendre le passeport meilleur nous recommandons que vous visitez la section de guide dans le site Web officiel.

Service de menus d'AngularJS
MEAN.JS a un service d'AngularJS que les aides vous contrôlent vos menus d'application. Le service de menu a plusieurs méthodes :

Menus.getMenu (menuId)
Renvoie un objet de menu identifié par l'argument de menuId.
 menu de variété = Menus.getMenu ('myMenu') ;
Menus.addMenu (menuId, [options])
Crée un nouvel objet de menu, qui sera identifié par l'argument de menuId. Inclut les arguments suivants :
menuId (requis) - indique l'identificateur de menu pour la future référence.
options (facultatives ; Défaut : {}) - indique que les options objectent pour initialiser le menu avec. Les options possibles incluent :
articles (défaut : []) - un choix de commandes de menu pour initialiser le menu avec.
rôles (défaut : ['utilisateur, admin']) - une rangée indiquant les rôles qui sont permis de regarder ce menu.
Menus.addMenu ('myMenu', {rôles : '*'}) ;
Menus.removeMenu (menuId)
Enlève un menu identifié par l'argument de menuId.
 Menus.removeMenu ('myMenu') ;
Menus.addMenuItem (menuId, [options])
Crée un nouvel objet de commande de menu. Cette méthode incluent également des couples des arguments :
menuId (requis) - indique l'identificateur de menu.
options (facultatives ; Défaut : {}) - indique que les options objectent pour initialiser la commande de menu avec. Les options possibles incluent :
titre (facultatif ; Défaut : '') - un titre de ficelle pour la commande de menu.
état (facultatif ; Défaut : '') - la valeur d'UIRoute, qui est employée pour définir le plan d'URL où cette commande de menu est marquée en tant qu'active.
dactylographiez (facultatif ; Défaut : 'article') - ceci peut être 'article' ou 'dropdown'.
classe (facultative ; Défaut : ) - classe non définie de CSS à s'appliquer à l'article de liste de menu (Li) qui est créé.
rôles (facultatifs ; Défaut : menu.roles) - une rangée indiquant les rôles qui sont permis de regarder cette commande de menu.
placez (facultatif ; Défaut : 0) - spécifiez l'ordre de l'aspect.
Menus.addMenuItem ('topbar', {titre : 'Commande de menu', état : 'menuitemstate'}) ;
Menus.removeMenuItem (menuId, menuItemState)
Enlève un menu existant avec l'identificateur fourni de menu. Cette méthode incluent également des couples des arguments :
menuId (requis) - indique l'identificateur de menu.
menuItemState (requis) - indique le déclarer de commande de menu qui devrait être enlevé.
Menus.removeMenuItem ('topbar', 'menuitemstate') ;
Menus.addSubMenuItem (menuId, parentItemState, [options])
Ajoute un article de sous-menu à un objet existant d'article. Cette méthode incluent également des couples des arguments :
menuId (requis) - indique l'identificateur de menu.
parentItemState (requis) - indique l'état de commande de menu de parent.
options (facultatives ; Défaut : {}) - indique que les options objectent pour initialiser la sous commande de menu avec. Les options possibles incluent :
titre (facultatif ; Défaut : '') - un titre de ficelle pour la commande de menu.
état (facultatif ; Défaut : '') - la valeur d'UIRoute, qui est employée pour définir le plan d'URL où cette commande de menu est marquée en tant qu'active.
rôles (facultatifs ; Défaut : parent.roles) - une rangée indiquant les rôles qui sont permis de regarder cette commande de menu.
placez (facultatif ; Défaut : 0) - spécifiez l'ordre de l'aspect.
Menus.addSubMenuItem ('topbar', 'dropdown1state', {titre : 'Sous commande de menu', état : 'submenuitemstate'}) ;
Menus.removeSubMenuItem (menuId, submenuItemState)
Enlève un menu existant avec l'identificateur fourni de menu. Cette méthode incluent également des couples des arguments :
menuId (requis) - indique l'identificateur de menu.
submenuItemState (requis) - indique le sous déclarer de commande de menu qui devrait être enlevé.
Menus.removeSubMenuItem ('topbar', 'submenuitemstate') ;
Utilisant les menus le service est habituellement fait dans des sections de configuration de vos modules d'utilisation. Une configuration simple ressemblerait à ceci :

angular.module ('exemple') .run (['menus',
  fonction (menus) {
    Menus.addMenuItem ('topbar', {titre : 'Exemple', état : 'exemple'}) ;

    Menus.addMenuItem ('topbar', {titre : 'Exemple Dropdown', état : 'exampledropdown', type : 'dropdown'}) ;
    Menus.addSubMenuItem ('topbar', 'exampledropdown', {titre : 'Sous article d'exemple', état : 'examplesubitem'}) ;
  }
]) ;
Ressources
Développement de Web de MOYEN - développement d'application Web de deuxième édition avec des modèles de MOYEN de MOYEN maîtrisant le développement MOYEN de Web : Plein Javascript expert de pile (vidéo)
