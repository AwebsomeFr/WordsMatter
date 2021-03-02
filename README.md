# WordsMatter

> Rédigez depuis l'Application ; partagez grâce à l'API connectée. WordsMatter est un module de gestion de blog 100% autonome, libre et gratuit. Son efficience en fait une alternative écoresponsable aux Systèmes de Gestion de Contenu traditionnels (CMS).

## Découvrir le projet WordsMatter

Pour __tout savoir__ du projet WordsMatter, consultez l'article [Créer un blog écoresponsable avec WordsMatter](https://awebsome.fr/blog-awebsome/creer-un-blog-ecoresponsable-avec-wordsmatter/) publié sur le blog Awebsome. Les points listés ci-après y sont abordés __en complément__ des éléments techniques présents sur cette page :

* Le projet WordsMatter
  * Pourquoi avoir créé WordsMatter ?
  * WordsMatter est-il un CMS ou un générateur de sites statiques ?
  * Le concept Application/API WordsMatter
  * Quand utiliser WordsMatter ?
  * Arguments de poids, solution ultra légère
  * La dernière version ?
* WordsMatter : identité et super pouvoirs
  * Une interface... Au service de l'utilisateur
  * Une journée (extra)ordinaire avec WordsMatter
  * (bien) Rédiger grâce à l'Application
* WordsMatter suffit-il à créer un blog écoresponsable ?

## Installer et configurer WordsMatter
Pour installer et configurer WordsMatter, vous êtes au bon endroit.

Ce qui est ici abordé :

* Qui peut installer WordsMatter ?
* Essayer / Obtenir
* Langages et technologies
* Premiers pas
* Notes relatives à la sécurité
* Configuration
* Licence
* Garantie et support

### Qui peut installer WordsMatter ?
Dans l'absolu, WordsMatter est __simple__ et __prêt à l'emploi__. Mais __il doit être configuré avec soin__.

Si vous êtes à l'aise avec l'informatique, connaissez les concepts fondamentaux du Web et lisez avec attention les consignes ci-dessous, il est fort probable que vous saurez mettre WordsMatter en ligne par vos propres moyens. Dans le cas contraire, faites-vous accompagner ([par Awebsome, par exemple](https://awebsome.fr)).

Par défaut, WordsMatter est livré sans thème (texte noir sur fond blanc pour le blog généré). Ce n'est pas gênant en soi, mais vous souhaiterez certainement changer cela. À cette fin, la maîtrise des langages HTML et CSS est impérative.

### Essayer / Obtenir
* Envie de pratiquer l'Application ? Vous pouvez [essayer l'éditeur en mode déconnecté](https://awebsomefr.github.io/WordsMatter/)*.
* Pour la théorie,  le mieux est encore de [consulter la documentation utilisateur](https://awebsomefr.github.io/WordsMatter/app/help.fr.html)*.
* Les plus curieux peuvent [explorer le code source du projet](https://github.com/AwebsomeFr/WordsMatter)*.
* Et même aller jusqu'à [__télécharger WordsMatter__](https://github.com/AwebsomeFr/WordsMatter/archive/master.zip)*.

*Liens hébergés par GitHub.

### Langages et technologies

* Côté client, l'Application WordsMatter repose sur des langages intégrés aux navigateurs web : HTML, CSS et JavaScript.
* Côté serveur, l'API WordsMatter est en PHP natif ; un serveur Apache est requis pour son fonctionnement.

### Premiers pas
[Téléchargez l'archive du dépôt WordsMatter](https://github.com/AwebsomeFr/WordsMatter/archive/master.zip), à décompresser sur votre terminal.

1. L'Application WordsMatter dépend du fichier `index.html` et du dossier `app`.   
__Attention : quiconque accède à une version donnée de l'application WordsMatter peut se connecter à l'API qui lui aura été attribuée. L'application ne doit donc en aucun cas être hébergée sur le serveur web où le blog est alimenté__.
2. L'API WordsMatter dépend uniquement du dossier `api`.   
__Ce dossier est à placer en lieu sûr sur le serveur web destinataire__.

Pour lancer l'Application WordsMatter en __mode déconnecté__ (fonctionnalités limitées), ouvrez le fichier `index.html` dans votre navigateur web. Sur certains systèmes d'exploitation mobiles, scripts et styles peuvent être désactivés par défaut. Ce comportement rendant l'Application WordsMatter inopérationnelle, il faut alors passer par le chemin réel du fichier, relatif au média de stockage.

Pour lancer l'Application WordsMatter en __mode connecté__, atteignez ce même point d'entrée depuis un serveur web local Apache supportant PHP. Les dossiers et fichiers nécessaires à la vie du blog seront alors créés et toutes les fonctionnalités d'exploitation du blog seront débloquées. 

### Notes relatives à la sécurité

#### Protocole HTTPS  
L'Application et l'API sont prévues pour échanger dès lors que leurs identifiants concordent. Parce que l'identifiant de l'Application transite en clair, il est recommandé d'utiliser WordsMatter uniquement dans un contexte HTTPS afin de limiter le risque d'interception d'informations lors de la connexion avec l'API.

#### Cross-origin resource sharing
Afin qu'Application et API puissent échanger, les requêtes CORS doivent être autorisées côté serveur. Le dossier `api` contient un fichier `.htaccess` configuré en ce sens (fichier caché).

#### Protection de l'API
Pour se prémunir des attaques de force brute, il est vivement conseillé de renommer le dossier `api`. Ce nom de dossier devant constituer une URL valide, certains caractères sont exclus d'office ; le mieux est de combiner minuscules, majuscules et chiffres dans la longueur. Par exemple, un intitulé de 50 caractères tel que "KguZ5n9vnXh4saDpe65LcmgzybjLcTG9wdqveEkwWvFx5eZLpw" pourrait donner lieu à une URL imprévisible telle que "https://votre-site-.fr/KguZ5n9vnXh4saDpe65LcmgzybjLcTG9wdqveEkwWvFx5eZLpw". Pour que cette protection soit efficace, pensez à interdire l'exploration de l'arborescence du site (directive `Options -Indexes` ou autre à la racine de votre serveur) !

### Configuration
Pour utiliser WordsMatter en production, il est utile d'intervenir dans les fichiers : 

*   `/app/js/config.js`
*   `/api/config.php`
*   `/api/tpl-index.php`
*   `/api/tpl-post.php`

Les deux premiers contiennent des variables de configuration.
Les deux suivants sont des templates.

#### /app/js/config.js

Il contient : 

*   `EDITOR_ID` : un identifiant unique et complexe à attribuer à votre Application WordsMatter.
*   `API_URL` : adresse distante de l'API WordsMatter hébergée (chemin absolu).
*   `LANG` : la langue de l'interface utilisateur de l'Application WordsMatter ('fr' pour français, 'en' pour anglais). 

#### /api/config.php

Il contient notamment : 

*   `EDITOR_ID` : doit être égale à la constante du même nom de l'Application à associer.
*   `BLOG_PATH` : l'emplacement du blog à alimenter (chemin relatif à l'API).
*   `R_GALLERY_DIR` : à quelle adresse seront lues les images de la galerie (chemin absolu).   

#### /api/tpl-index.php

C'est le gabarit par défaut du sommaire, reconstruit dès lors qu'un post est publié / supprimé depuis l'Application. Simpliste et dépourvu de CSS, c'est un bon point de départ pour créer un blog écoresponsable.

#### /api/tpl-post.php

C'est le modèle de page par défaut auquel est injecté le HTML valide lors de la publication d'un post. Comme pour le fichier précédent, il est livré nu.

...

Pour le reste, il faudra creuser ! Le projet comporte au final __peu de fichiers__ ; tous les scripts et fonctions ont __un intitulé explicite__ ; le code source est __commenté__ lorsque que cela est utile. Votre exploration devrait s'en trouver facilitée. 

### Licence
Dans l'intérêt de l'__efficience__, de l'__inclusion__ et de la __sobriété numérique__, [WordsMatter est proposé sous licence GNU GPL version 3 ou ultérieure](https://www.gnu.org/licenses/gpl-3.0.en.html).

Pour faire simple, cela signifie que __vous pouvez faire ce que vous voulez de WordsMatter__ y compris le commercialiser (ou pas), en y ayant apporté des modifications (ou pas). Cette liberté qui vous est offerte, aussi grande soit-elle, ne devrait pas vous faire perdre de vue la raison d'être de WordsMatter (mais vous pouvez).

### Garantie et support
WordsMatter est proposé en l'état et sans garantie quant à son fonctionnement par Julien Wilhelm ([Awebsome](https://awebsome.fr)). S'agissant d'__un travail bénévole__, il est de la responsabilité de chacun de prendre les dispositions qui s'imposent pour garantir l'intégrité de son travail. Tout dysfonctionnement lié de près ou de loin à WordsMatter ne saurait être reproché à son créateur. Par ailleurs, le support client n'est assuré par Awebsome que pour les clients Awebsome. Si WordsMatter vous a été installé par un autre prestataire, merci d'adresser vos questions à ce dernier.
