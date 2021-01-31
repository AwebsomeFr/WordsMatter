# WordsMatter

**NOTE : ce README est actuellement dépassé**.

## FR

> Rédigez depuis l'Application ; partagez grâce à l'API connectée. WordsMatter est un module de gestion de blog 100% autonome, libre et gratuit. Son efficience en fait une alternative écoresponsable aux Systèmes de Gestion de Contenu traditionnels (CMS).

* [Essayer l'éditeur](https://awebsomefr.github.io/WordsMatter/)
* [Lire la documentation](https://awebsomefr.github.io/WordsMatter/help.html)
* [WordsMatter en action](https://awebsome.fr/blog-awebsome/awebsome-un-blog-ecoresponsable)
* [Awebsome](https://awebsome.fr)
* [Contact](https://awebsome.fr#contact)

## EN

> Write from the web application; share with the API. WordsMatter is a 100% autonomous, open-source and free blog management module. Its efficiency makes it an eco-responsible alternative to traditional content management systems (CMS).

* [Try the editor](https://awebsomefr.github.io/WordsMatter/) (fr)
* [Read the doc](https://awebsomefr.github.io/WordsMatter/help.html) (fr)
* [WordsMatter in live](https://awebsome.fr/blog-awebsome/awebsome-un-blog-ecoresponsable) (fr)
* [Awebsome](https://awebsome.fr) (fr)
* [Contact](https://awebsome.fr#contact)

### Développeurs : installer et configurer l'API WordsMatter

#### Sommaire

*   [Pourquoi utiliser WordsMatter ?](#dev-benefits)
*   [Le concept en quelques mots](#dev-concept)
*   [Technologies et licence](#dev-tech-license)
*   [Obtenir](#dev-download)
*   [Configuration et politique de sécurité](#dev-configure)
*   [Considérations](#dev-go-further)
*   [Évolutions et contributions](#dev-evolve)
*   [Notes de version](#dev-version-notes)

#### Pourquoi utiliser WordsMatter ?

*   WordsMatter **répond strictement à un besoin**: alimenter un blog. Son efficience fonctionnelle le rend **plus sûr**, **plus rapide** et **bien plus indolore pour l'environnement** que les solutions traditionnelles.
*   WordsMatter fonctionne en **mode hors-ligne** sur la majorité des navigateurs Web et son **interface responsive** lui permet d'être exploité sur mobile comme sur tablette ou sur ordinateur.
*   WordsMatter n'utilise **aucune dépendance**. De fait, **son intégrité ne tient qu'à lui et à ses utilisateurs** et n'est pas conditionnée à d'incessantes mises à jour.
*   WordsMatter est **ultra léger** : moins de 100ko, documentation comprise.
*   WordsMatter est **libre de droits** et **distribué gratuitement**.

#### Le concept en quelques mots

Le fonctionnement de WordsMatter est le suivant : l'application, utilisée en local, communique avec l'API, hébergée sur le site Web où le blog doit être alimenté. La mise en relation se fait sans friction, de façon sécurisée, grâce à un identifiant commun, connu des deux parties. L'application envoie à l'API le contenu à publier ou à sauvegarder en tant que brouillon. Dans le premier cas (publication), l'API génère du HTML valide à une adresse déterminée par sa configuration. Dans le second (brouillon), elle se contente d'héberger les données brutes, jusqu'à suppression ou transformation en publication par l'utilisateur. L'API peut par ailleurs lister le contenu (brouillons & posts) pour édition ou suppression depuis l'application.

#### Technologies et licence

*   Côté client, l'application WordsMatter repose exclusivement sur HTML, CSS et JavaScript Vanilla.
*   Côté serveur, l'API WordsMatter est codée en PHP natif.
*   Aucune base de données n'est requise pour utiliser WordsMatter.

[WordsMatter est proposé sous licence GNU GPL version 3 ou ultérieure](https://www.gnu.org/licenses/gpl-3.0.en.html) dans l'intérêt de **l'efficience, de l'inclusion et de la sobriété numérique**.

#### Obtenir

*   [Téléchargement direct](https://github.com/AwebsomeFr/WordsMatter/archive/master.zip)
*   [Code source](https://github.com/AwebsomeFr/WordsMatter)
*   [Essayer](https://awebsomefr.github.io/WordsMatter/)

#### Configuration et politique de sécurité

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

#### Considérations

WordsMatter est **tout à fait fonctionnel** en l'état, cependant :

*   Le modèle de page fourni par l'API est basique et dépourvu de CSS. Ce modèle, décrit dans le fichier `template.php`, est un bon point de départ pour créer un site Internet écoresponsable et unique ; à vous de vous l'approprier. <span>Créer un sous-dossier dédié ici ou ailleurs est tout à fait envisageable (et même préférable) du moment que correspondance est faite avec fichier `releasePost.php`.</span>
*   WordsMatter ne génère pas de sommaire de blog prêt à l'emploi. Il existe bien des manières de procéder : à vous d'implémenter la vôtre. <span>Le fichier `index.json` créé dans le dossier `blog` que l'application utilise pour lister les posts peut facilement être exploité dans ce but (attention toutefois à y faire une sélection entre publications et brouillons).</span>
*   WordsMatter ne produit aucun sitemap.

#### Évolutions et contributions

**L'objectif de WordsMatter est de répondre, avec efficience, à un besoin précis**. Si toutefois vous pensez qu'il manque une fonctionnalité **essentielle**, découvrez un bug quelconque ou remarquez une coquille dans la documentation, [merci de me le faire savoir en ouvrant une nouvelle _Issue_ sur GitHub](https://github.com/AwebsomeFr/WordsMatter/issues). Votre contribution est par ailleurs la bienvenue sur les Issues éventuellement ouvertes.

#### Notes de version

[Notes de version sur le dépot GitHub](https://github.com/AwebsomeFr/WordsMatter) (en).

WordsMatter est proposé tel quel sans garantie aucune quant à son fonctionnement. Tout dysfonctionnement quelconque et imputable - ou non - à WordsMatter ne saurait être reproché à son développeur, bénévole sur ce projet.