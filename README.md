**ATTENTION : CE DOCUMENT N'EST PLUS A JOUR.**

# WordsMatter

> Rédigez depuis l'Application ; partagez grâce à l'API connectée. WordsMatter est un module de gestion de blog 100% autonome, libre et gratuit. Son efficience en fait une alternative écoresponsable aux Systèmes de Gestion de Contenu traditionnels (CMS).

## Sommaire

### Sur cette page

* [Le projet](#le-projet)
    *   [Pourquoi WordsMatter ?](#pourquoi-wordsmatter)
    *   [Concept](#concept)
* [Installer et configurer WordsMatter](#installer-et-configurer-wordsMatter)
    *   [Technologies](#technologies)
    *   [Licence](#licence)
    *   [Obtenir](#obtenir)
    *   [Premiers pas](#premiers-pas)
    *   [Configuration](#configuration)
    *   [i18n](#i18n)
    *   [Remarques](#remarques)
    *   [Contributions](#contributions)
    *   [Garantie et support](#garantie-et-support)

### Liens externes

*   [Essayer l'éditeur en live](https://awebsomefr.github.io/WordsMatter/)
*   [Afficher la documentation utilisateur](https://awebsomefr.github.io/WordsMatter/prod/help.html)
*   [WordsMatter en action](https://awebsome.fr/blog-awebsome)
*   [Awebsome.fr](https://awebsome.fr)

## Le projet

### Pourquoi WordsMatter

C'est **un besoin récurrent** de mes clients professionnels : pouvoir mettre en ligne, en parfaite autonomie, du contenu rédactionnel sur leur site web écoresponsable. Encore aujourd'hui et pour de nombreux prestataires, il s'agit d'un *gap* infranchissable, **la fonctionnalité rédhibitoire** qui interdit de proposer un site web codé en dur alors que tout le reste s'y prête. S'orienter alors vers un Système de Gestion de Contenu (ou Content Management System, en anglais) comme c'est bien souvent le cas apporte **un degré de complexité technique élevé**. À l'administration comme à utilisation, cette approche entraîne d'**importants inconvénients** (consommation en données et en énergie excessive, lenteurs et instabilités, vulnérabilités...). C'est à l'encontre de **l'effort qui est attendu de nous**, développeurs web, dans le cadre du déploiement de services en ligne raisonnés.

Vous avez à charge de créer un site vitrine simple et efficient comportant toutefois un espace de blog ? 

**WordsMatter est une solution adaptée à cet enjeu.**

**Indépendant**, il peut venir se greffer à n'importe quel projet web existant.

Quelques arguments supplémentaires : 

*   WordsMatter **répond strictement à un besoin** : alimenter un blog. Son efficience fonctionnelle le rend **plus sûr**, **plus rapide** et **bien plus neutre pour l'environnement** que les solutions traditionnellement plébiscitées.
*   WordsMatter fonctionne en **mode hors-ligne** sur la majorité des navigateurs web et son **interface responsive** lui permet d'être exploité sur mobile comme sur tablette ou sur ordinateur.
*   WordsMatter n'utilise **aucune dépendance**. De fait, **son intégrité ne tient qu'à lui et à ses utilisateurs** et n'est pas conditionnée à d'incessantes mises à jour.
*   WordsMatter est **ultra léger** : moins de 100ko, documentation comprise.
*   WordsMatter est **libre de droits** et **distribué gratuitement**.

### Concept

Le fonctionnement de WordsMatter est simpliste : l'**application web**, utilisée depuis un téléphone, une tablette ou un ordinateur, communique avec l'**API**, hébergée sur le serveur du blog à alimenter. 

L'application peut **envoyer du contenu** brut à l'API (publier, sauvegarder en tant que brouillon) ou **en recevoir** de sa part (modifier / supprimer un post ou un brouillon).

 Leur mise en relation se fait sans friction et de façon sécurisée grâce à **un identifiant commun** connu des deux parties.

## Installer et configurer WordsMatter

### Technologies

*   Côté client, l'application web WordsMatter repose exclusivement sur HTML, CSS et JavaScript Vanilla.
*   Côté serveur, l'API WordsMatter est codée en PHP natif.
*   Aucune base de données n'est requise pour utiliser WordsMatter.

### Licence

Dans l'intérêt de **l'efficience, de l'inclusion et de la sobriété numérique**, [WordsMatter est proposé sous licence GNU GPL version 3 ou ultérieure](https://www.gnu.org/licenses/gpl-3.0.en.html).

### Obtenir

*   [Téléchargement direct](https://github.com/AwebsomeFr/WordsMatter/archive/master.zip)
*   [Explorer le code source](https://github.com/AwebsomeFr/WordsMatter)

### Premiers pas

L'archive du dépôt WordsMatter contient un dossier `dev` et un dossier `prod`. Ces deux répertoires sont **similaires**, à une exception près : les fichiers du dossier `prod` ont été minifiés pour un déploiement immédiat en production (ce qui est possible, mais toutefois limité et risqué, comme expliqué plus loin). 

Ces répertoires contiennent :

* L'application WordsMatter. Elle dépend des fichiers `index.html`, `help.html` et du dossier `app`. **Attention : en l'absence de mot de passe, quiconque accède à une version donnée de l'application WordsMatter peut se connecter à l'API correspondante. L'application ne doit donc en aucun cas être hébergée sur le serveur web destinataire**.
* L'API WordsMatter. Elle dépend du dossier `api`. **Cette API est à placer en lieu sûr sur le serveur web destinataire**.

Après avoir copié le dossier `dev` ou `prod` sur votre terminal, ouvrez le fichier `index.html` placé à la racine pour lancer l'application web en mode hors-ligne (fonctionnalités limitées). Atteignez ce point d'entrée depuis un serveur web local pour pouvoir vous connecter à l'API.  

*Note : sur certains systèmes d'exploitation mobiles, scripts et styles sont désactivés si vous tentez d'ouvrir le fichier directement. Il est alors nécessaire d'accéder à l'application depuis un chemin interne propre au média de stockage.*

#### Configuration

Dans la pratique, il est plus simple de configurer WordsMatter depuis des fichiers non compressés (`dev`).

Voici les fichiers où il est utile d'intervenir : 

*   `/app/js/config.js`
*   `/api/config.php`
*   `/api/template.php`
*   (`/api/push.php`)

Les deux premiers contiennent des constantes à personnaliser avant tout lancement de WordsMatter dans le but de **créer une configuration sécurisée**. Si vous avez lancé WordsMatter avant d'avoir édité ces fichiers, veillez à supprimer le dossier `blog` généré à la racine du projet avant de commencer ici.

*   `/app/js/config.js`
    *   `EDITOR_ID` est un identifiant unique et stocké en clair à attribuer à votre application WordsMatter.
    *   `API_URL` indique où le répertoire de l'API WordsMatter est hébergé. Ce dossier aura été **renommé** avant d'être placé sur **un serveur distant** (explications à suivre).
    *   `LANG` définit la langue de l'interface utilisateur de l'application WordsMatter. Valeurs disponibles : 'fr' pour français, 'en' pour anglais. 
*  `/api/config.php`
    *   `EDITOR_ID` doit être égale à la constante du même nom décrite ci-dessus.
    *   `INPUT_DIR` indique où les backups et les brouillons seront sauvegardés pour édition ultérieure. S'il n'existe pas, ce dossier sera automatiquement créé par WordsMatter lors de sa première connexion avec l'API.
    *   `OUTPUT_DIR` indique où les posts formatés et publiés sur le site web seront stockés. S'il n'existe pas, ce dossier sera automatiquement créé par WordsMatter lors de sa première connexion avec l'API.
    *   `JSON_INDEX` indique un fichier au format .json où seront listés les posts avec leur titre, leur nom de fichier, leur dernière date d'édition et leur statut (brouillon ou non). S'il n'existe pas, ce fichier sera automatiquement créé par WordsMatter lors de sa première connexion avec l'API.
    *   `SITE_TYPE` précise le format de sortie des fichiers. La valeur par défaut, 'static', produit des fichiers HTML à la manière des générateurs de sites statiques, sans toutefois (encore) reconstruire le site tout entier. Une valeur 'dynamic' génère des fichiers PHP et donc, des pages dynamiques.

Quelques points **importants** à retenir :

*   **Requêtes CORS** : Pour que l'application puisse échanger avec l'API, les requêtes CORS (Cross-origin resource sharing) doivent être autorisées par le serveur. Le dossier `api` contient un fichier `.htaccess` configuré en ce sens. Par précautions, sauf besoins contraires, l'acceptation des requêtes CORS devrait se limiter à ce seul dossier. Le fichier `.htaccess` est un fichier caché. Assurez-vous de l'inclure lorsque vous déplacez des fichiers ou de sélectionner le dossier `api` tout entier.
*   **Identification de la source et protection de la cible** : Aucun mot de passe ne sera jamais demandé à l'utilisateur ni par l'application ni par l'API. Ces dernières sont configurées pour échanger dès lors que l'identifiant d'éditeur établi dans les fichiers `config.js` et `config.php` concordent. Pour éviter les attaques de force brute liées à une URL d'API prévisible, **il est impératif de renommer le dossier `api` dans le but de créer une adresse impossible à deviner**. Dans la mesure où ce nom de dossier **doit pouvoir constituer une URL valide**, cela exclut l'utilisation de certains caractères. Une solution peut être de combiner minuscules, majuscules et chiffres (sans accents) dans la longueur. Par exemple, un intitulé de 100 caractères tel que "`KguZ5n9vnXh4saDpe65LcmgzybjLcTG9wdqveEkwWvFx5eZLpwVXrpFnQwEvSfc5fEh2EeAbhpFDWd3MPAbNMFNXYASHHr4CACcv`" pourrait donner lieu à une URL imprévisible telle que "`https://votre-site-.fr/KguZ5n9vnXh4saDpe65LcmgzybjLcTG9wdqveEkwWvFx5eZLpwVXrpFnQwEvSfc5fEh2EeAbhpFDWd3MPAbNMFNXYASHHr4CACcv/`". Attention : pour que cette protection soit efficace, pensez à interdire l'exploration de l'arborescence du site (exemple : `.htaccess` à la racine du site contenant la directive `Options -Indexes`).
*   **HTTPS** : Il est vivement conseillé d'utiliser WordsMatter dans un contexte HTTPS afin d'éviter l'interception d'informations lors des échanges entre application et API.

Intéressons-nous enfin aux deux derniers fichiers :

*   `/api/template.php` est le modèle de page par défaut auquel est injecté le html valide lors de la publication d'un post. Ce modèle, dépourvu de CSS, est un bon point de départ pour créer un site web écoresponsable et unique. A vous de vous l'approprier.
*   `/api/push.php` définit la procédure à suivre lors de la publication d'un post. Si quelque chose ne vous convient pas, où que vous souhaitez aller plus loin, il faut sans doute commencer par ici.

### i18n

À ce jour :

* L'application WordsMatter est entièrement traduite en français et en anglais.
* Seule la version française des documentations techniques / utilisateur est disponible.
* Le code source est exclusivement commenté en anglais.

### Remarques

*   WordsMatter ne génère pas de sommaire de blog prêt à l'emploi. Il existe bien des manières de procéder : à vous d'implémenter la vôtre. Le fichier `index.json` (nom par défaut) créé dans le dossier `blog` et tenu à jour par l'application WordsMatter peut facilement être exploité dans ce but.
*   De même, WordsMatter ne produit aucun sitemap.

### Contributions

**L'objectif de WordsMatter est de répondre, avec efficience, à un besoin précis**. Si toutefois vous pensez qu'il manque une fonctionnalité **essentielle**, découvrez un bug quelconque ou remarquez une coquille ici ou ailleurs, [merci d'ouvrir une nouvelle _Issue_ sur GitHub](https://github.com/AwebsomeFr/WordsMatter/issues). Votre contribution est par ailleurs la bienvenue sur les Issues éventuellement ouvertes.

### Garantie et support

WordsMatter est proposé en l'état, **sans garantie aucune** quant à son fonctionnement dans des conditions différentes à celles de son développement. S'agissant d'**un travail bénévole**, il est de la responsabilité de chacun de prendre les dispositions qui s'imposent pour garantir l'intégrité de son travail. Tout dysfonctionnement éventuel lié à WordsMatter ne saurait être reproché à Awebsome. Par ailleurs, **le support client de ce projet n'est assuré par Awebsome que POUR les clients Awebsome. Si WordsMatter vous a été installé par un prestataire différent, merci d'adresser vos questions à ce dernier.**