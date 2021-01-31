# WordsMatter

> Rédigez depuis l'Application ; partagez grâce à l'API connectée. WordsMatter est un module de gestion de blog 100% autonome, libre et gratuit. Son efficience en fait une alternative écoresponsable aux Systèmes de Gestion de Contenu traditionnels (CMS).

## Sommaire

### Sur cette page

*   [Pourquoi WordsMatter ?](#pourquoi-wordsmatter)
*   [Concept](#concept)
*   [Technologies](#technologies)
*   [License](#license)
*   [Téléchargement](#telechargement)
*   [Configuration et politique de sécurité](#dev-configure)
*   [Considérations](#dev-go-further)
*   [Évolutions et contributions](#dev-evolve)
*   [i18n](#i18n)
*   [Garantie et support](#garantie-et-support)



### Liens externes

*   [Essayer l'éditeur en live](https://awebsomefr.github.io/WordsMatter/)
*   [Afficher la documentation utilisateur](https://awebsomefr.github.io/WordsMatter/prod/index.html)
*   [WordsMatter en action](https://awebsome.fr/blog-awebsome)
*   [Awebsome.fr](https://awebsome.fr)

## Présentation du projet

### Pourquoi WordsMatter ?

C'est **un besoin récurrent** de mes clients professionnels : pouvoir mettre en ligne, en parfaite autonomie, du contenu rédactionnel sur leur site web écoresponsable. Encore aujourd'hui et pour de nombreux prestataires, il s'agit d'un *gap* infranchissable, **la fonctionnalité rédhibitoire** qui interdit de proposer un site web codé en dur alors que tout le reste s'y prête. S'orienter alors vers un Système de Gestion de Contenu (ou Content Management System, en anglais) comme c'est bien souvent le cas apporte **un degré de complexité technique élevé**. A l'administration comme à utilisation, cette approche entraîne d'**importants inconvénients** (consommation en données et en énergie excessive, lenteurs et instabilités, vulnérabilités...). C'est à l'encontre de **l'effort qui est attendu de nous**, développeurs web, dans le cadre du déploiement de services en ligne raisonnés.

Vous avez à charge de créer un site vitrine simple et efficient comportant toutefois un espace de blog ? 

**WordsMatter est une solution adaptée à cet enjeu.**

**Indépendant**, il peut venir se greffer à n'importe quel projet web existant.

Quelques arguments supplémentaires : 

*   WordsMatter **répond strictement à un besoin** : alimenter un blog. Son efficience fonctionnelle le rend **plus sûr**, **plus rapide** et **bien plus neutre pour l'environnement** que les solutions traditionnellement plébiscitées.
*   WordsMatter fonctionne en **mode hors-ligne** sur la majorité des navigateurs Web et son **interface responsive** lui permet d'être exploité sur mobile comme sur tablette ou sur ordinateur.
*   WordsMatter n'utilise **aucune dépendance**. De fait, **son intégrité ne tient qu'à lui et à ses utilisateurs** et n'est pas conditionnée à d'incessantes mises à jour.
*   WordsMatter est **ultra léger** : moins de 100ko, documentation comprise.
*   WordsMatter est **libre de droits** et **distribué gratuitement**.

### Concept

Le fonctionnement de WordsMatter est simpliste : l'**application web**, utilisée depuis un téléphone, une tablette ou un ordinateur, communique avec l'**API**, hébergée sur le serveur du blog à alimenter. L'application peut **envoyer du contenu** brut à l'API (publier, sauvegarder en tant que brouillon) ou **en recevoir** de sa part (modifier / supprimer un post ou un brouillon). Leur mise en relation se fait sans friction et de façon sécurisée grâce à **un identifiant commun** connu des deux parties.

## Installer et configurer WordsMatter

### Technologies

*   Côté client, l'application web WordsMatter repose exclusivement sur HTML, CSS et JavaScript Vanilla.
*   Côté serveur, l'API WordsMatter est codée en PHP natif.
*   Aucune base de données n'est requise pour utiliser WordsMatter.

### Licence

Dans l'intérêt de **l'efficience, de l'inclusion et de la sobriété numérique**, [WordsMatter est proposé sous licence GNU GPL version 3 ou ultérieure](https://www.gnu.org/licenses/gpl-3.0.en.html).

### Téléchargement

*   [Téléchargement direct](https://github.com/AwebsomeFr/WordsMatter/archive/master.zip)
*   [Explorer le code source](https://github.com/AwebsomeFr/WordsMatter)

### Configuration et politique de sécurité

Une fois l'archive décompressée, le dossier WordsMatter contient :

*   L'**application WordsMatter** à télécharger sur le ou les terminaux utilisateur. **Elle ne doit en aucun cas être hébergée sur le serveur**.
*   L'**API WordsMatter** à extraire de l'archive (dossier `api`) et **à placer en lieu sûr sur le serveur** (explications plus bas). Ce dossier est **le seul à devoir être hébergé**.

S'agissant d'une application Web, WordsMatter est prêt à l'emploi.

Toutefois, les fichiers :

*   `/app/js/config.js`
*   `/api/config.php`

Contiennent tous deux des constantes à personnaliser avant tout lancement de WordsMatter dans le but de **créer une configuration sécurisée**. Si vous avez lancé WordsMatter avant d'avoir édité ces fichiers, supprimez le dossier `blog` généré à la racine du projet avant de commencer ici.

*   config.js :
    *   `EDITOR_ID` est un identifiant unique attribué à l'éditeur et stocké en clair. <span>Pour des raisons évidentes de sécurité, cette valeur devrait être la plus complexe possible.</span>
    *   `API_URL` doit pointer vers l'adresse du site Web où le dossier de l'API est hébergé. <span>Ce dossier doit être renommé (explications plus bas).</span>
*   config.php :
    *   `EDITOR_ID` doit être égale à la constante du même nom décrite ci-dessus.
    *   `INPUT_DIR` doit pointer vers l'adresse où les posts et brouillons seront sauvegardés pour édition éventuelle (format .txt). <span>Ce dossier sera automatiquement créé par WordsMatter lors de sa première connexion avec l'API.</span>
    *   `OUTPUT_DIR` doit pointer vers l'adresse où les posts formatés seront exportés pour publication sur le site Web (format HTML, par défaut). <span>Ce dossier sera automatiquement créé par WordsMatter lors de sa première connexion avec l'API.</span>
    *   `POSTS_INDEX` doit pointer vers un fichier au format .json où seront listés les posts avec leur titre, leur nom de fichier, leur dernière date d'édition et leur statut (brouillon ou non). <span>Ce fichier sera automatiquement créé par WordsMatter lors de sa première connexion avec l'API.</span>

Parce que garder la maîtriser des opérations en lien avec le serveur est capital, voici les points à retenir :

*   **Requêtes CORS** : Pour que l'application puisse échanger avec l'API, les requêtes CORS (Cross-origin resource sharing) doivent être autorisées par le serveur. Le dossier `api` contient un fichier `.htaccess` configuré en ce sens. <span>Par précautions, sauf besoins contraires, l'acceptation des requêtes CORS devrait se limiter à ce seul dossier.</span> <span>Le fichier `.htaccess` est un fichier caché. Assurez-vous de l'inclure lorsque vous déplacez des fichiers ou de sélectionner le dossier `api` tout entier.</span>
*   **Identification de la source et protection de la cible** : Aucun mot de passe ne sera jamais demandé à l'utilisateur ni par l'application ni par l'API. Ces dernières sont configurées pour échanger dès lors que l'identifiant d'éditeur établi dans les fichiers `config.js` et `config.php` concordent. Pour éviter les attaques de force brute liées à une URL d'API prévisible, **il est impératif de renommer le dossier `api` dans le but de créer une adresse impossible à deviner**. Dans la mesure où ce nom de dossier **doit pouvoir constituer une URL valide**, cela exclut l'utilisation de certains caractères. Une solution peut être de combiner minuscules, majuscules et chiffres (sans accents) dans la longueur. Par exemple, un intitulé de 100 caractères tel que "`KguZ5n9vnXh4saDpe65LcmgzybjLcTG9wdqveEkwWvFx5eZLpwVXrpFnQwEvSfc5fEh2EeAbhpFDWd3MPAbNMFNXYASHHr4CACcv`" pourrait donner lieu à une URL imprévisible telle que "`https://votre-site-.fr/KguZ5n9vnXh4saDpe65LcmgzybjLcTG9wdqveEkwWvFx5eZLpwVXrpFnQwEvSfc5fEh2EeAbhpFDWd3MPAbNMFNXYASHHr4CACcv/`". <span>Attention : pour que cette protection soit efficace, il faut interdire l'exploration de l'arborescence du site (exemple : `.htaccess` à la racine du site contenant la directive `Options -Indexes`).</span>
*   **HTTPS** : Il est vivement conseillé d'utiliser WordsMatter dans un contexte HTTPS afin d'éviter l'interception d'informations lors des échanges entre l'application et l'API.

### Considérations

WordsMatter est **tout à fait fonctionnel** en l'état, cependant :

*   Le modèle de page fourni par l'API est basique et dépourvu de CSS. Ce modèle, décrit dans le fichier `template.php`, est un bon point de départ pour créer un site Internet écoresponsable et unique ; à vous de vous l'approprier. <span>Créer un sous-dossier dédié ici ou ailleurs est tout à fait envisageable (et même préférable) du moment que correspondance est faite avec fichier `releasePost.php`.</span>
*   WordsMatter ne génère pas de sommaire de blog prêt à l'emploi. Il existe bien des manières de procéder : à vous d'implémenter la vôtre. <span>Le fichier `index.json` créé dans le dossier `blog` que l'application utilise pour lister les posts peut facilement être exploité dans ce but (attention toutefois à y faire une sélection entre publications et brouillons).</span>
*   WordsMatter ne produit aucun sitemap.

### Évolutions et contributions

**L'objectif de WordsMatter est de répondre, avec efficience, à un besoin précis**. Si toutefois vous pensez qu'il manque une fonctionnalité **essentielle**, découvrez un bug quelconque ou remarquez une coquille ici ou ailleurs, [merci de me le faire savoir en ouvrant une nouvelle _Issue_ sur GitHub](https://github.com/AwebsomeFr/WordsMatter/issues). Votre contribution est par ailleurs la bienvenue sur les Issues éventuellement ouvertes.

### i18n

A ce jour :

* L'application WordsMatter est entièrement traduite en français et en anglais.
* Seule la version française des documentations techniques / utilisateur est disponible.
* Le code source est exclusivement commenté en anglais.

### Garantie et support

WordsMatter est proposé en l'état, **sans garantie aucune** quant à son fonctionnement dans des conditions différentes à celles de son développement. S'agissant d'**un travail bénévole**, il est de la responsabilité de chacun de prendre les disposition qui s'imposent pour garantir l'intégrité de son travail. Tout dysfonctionnement éventuel lié à WordsMatter ne saurait être reproché à Awebsome. Par ailleurs, **le support client de ce projet n'est assuré par Awebsome que POUR les clients Awebsome. Si WordsMatter vous a été installé par un prestataire différent, merci d'adresser vos remarques, vos questions à ce dernier.**