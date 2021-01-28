"use strict";

/* --- To customize --- */

	// Must be equal to the id specified in 'api/config.php'. Please create your own and complex ID.
	const EDITOR_ID = 'editor-tjJshBE63cSDDYkEeSZ8NNrNkdHDm5vUuCktkzS24f3uXesgeC';

	// The URL where the api directory is located. Please rename it (see the documentation).
	const API_URL = './api/';

	// Supported : fr.
	const LANG = 'fr'; 

/* --- i18n --- */

	const LAB = {};

	if(LANG === 'fr') {

		LAB.bt = {
			addA: 'Créer un lien hypertexte',
			addEm: 'Créer du texte emphasique',
			addFig: 'Créer une figure',
			addHx: 'Créer un sous-titre de niveau ',
			addImg: 'Créer une image',
			addOl: 'Créer une liste ordonnée',
			addSec: 'Ajouter une section',
			addStr: 'Créer du texte important',
			addUl: 'Créer une liste non ordonnée',
			close: 'Fermer',
			delSec: 'Supprimer la section',
			delete: 'Supprimer',
			doc: 'Documentation ?',
			exportPost: 'Exporter vers fichier .txt ↑',
			importPost: 'Importer depuis fichier .txt ↓',
			listPost: 'Modifier depuis le blog ↓',
			menu: 'Menu',
			open: 'Ouvrir',
			pushPost: 'Envoyer vers le blog ↑',
			save: 'Sauvegarder ↑',
			setHeight: 'Ajuster la hauteur ↕',
			setTheme: 'Thème clair / thème sombre ☼',
			setWidth: 'Ajuster la largeur ↔'
		};

		LAB.input = {
			lib: 'Libellé',
			content: 'Contenu de section',
			h1: 'Titre du post (h1)',
			h2: 'Titre de section (h2)',
			alt: 'Description (alternative)',
			leg: 'Légende de l\'image',
			intro: 'Introduction optionnelle',
			list: 'Eléments composant la liste (délimiteur : %%)',
			txtToTransf: 'Texte à transformer',
			url: 'Adresse (URL)'
		};

		LAB.dial = {
			export: `Copiez-collez le contenu suivant dans un fichier .txt. Utilisez l'option <i>Importer depuis fichier .txt</i> accessible depuis le menu pour le recharger.`,
			modify: `Quel post souhaitez-vous modifier depuis le blog ?`,
			delSection: `Le contenu de cette section sera perdu.`,
			wsUnavailable: `<p class="b">Le post ne peut être sauvegardé/supprimé : l'API <i>Web Storage</i> est indisponible ou a été désactivée sur ce navigateur web.</p>`,
			wsSaveSucc: `<p class="g">Post enregistré dans la mémoire locale du navigateur web.</p>`,
			wsSaveFail: `<p class="b">Erreur lors de l'enregistrement du post dans la mémoire locale du navigateur web.</p>`,
			wsDelAskConf: 
				`<p class="a"> Supprimer définitivement le post de la mémoire locale du navigateur web ?</p>
				<button class="danger" onclick="deleteFromLocalStorage(true)">Confirmer la suppression</button>`,
			wsDelEmpty: `<p class="b">Rien à supprimer de la mémoire locale du navigateur web.</p>`,
			wsDelSucc: `<p class="g">Post supprimé de la mémoire locale du navigateur web.</p>`,
			wsDelFail: `<p class="b">Erreur lors de la suppression du post de la mémoire locale du navigateur web. Si le problème persiste, supprimez les données de navigation du navigateur web.</p>`,
			loadSucc: `<p class="g">Post chargé avec succès.</p>`,
			servTitleEmpty: `<p class="b">Le post doit avoir un titre pour être publié ou sauvegardé en tant que brouillon sur le blog.</p>`,
			servUnavailable: `<p class="b">Serveur injoignable : le post ne peut être envoyé vers le blog. Vérifiez votre connexion Internet. Si le problème persiste, contactez le prestataire en charge de votre blog.</p>`,
			servConfNew:
				`<p class="a"> Vous allez envoyer du contenu vers le blog. Si le titre principal (h1) du post est précédé d'un %, il sera sauvegardé en tant que brouillon, mais ne sera pas rendu public.</p>
				<button onclick="pushPost(true)">Envoyer</button>`,
			servConfUpdate:
				`<p class="a"> Un post avec un titre identique existe déjà sur le blog. Le remplacer ?</p>
				<p>Note : Si le titre principal (h1) du post est précédé d'un %, il sera sauvegardé en tant que brouillon, mais ne sera pas rendu public.</p>
				<button onclick="pushPost(true)">Mettre à jour</button>`,
			servConfDel: 
				`<p class="a"> Supprimer définitivement le post sélectionné du blog ?</p>
				<button class="danger" onclick="deleteFromServer(true, varTemp)">Confirmer la suppression</button>`,
			servDelSucc: `<p class="g">Post supprimé du blog.</p>`,
			servDelFail: `<p class="b">Erreur lors de la suppression du post du blog. Si le problème persiste, contactez le prestataire en charge de votre blog.</p>`,
			servSucc: `<p class="g">Post envoyé avec succès vers le blog.</p>`,
			servFail: `<p class="b">Erreur lors de la mise en ligne : le post n'a pas été publié. Si le problème persiste, contactez le prestataire en charge de votre blog.</p>`,
			servEmpty: `<p class="b">Impossible : il n'y a encore ni post ni brouillon sur le blog.</p>`,
			setHeight: 'Déplacez le curseur pour modifier la hauteur de prévisualisation.',
			setWidth: 'Déplacez le curseur pour modifier la largeur de travail.'
		};

	}

/* --- Regexes --- */

	const REGEX = [
		{
			desc: /\s{2}\n/g,
			output: () => '<br/>'
		},
		{
			desc: /^(?!3|4|5|6|f|i|o|u).+$/gm, // All except block elements can be enclosed in a paragraph.
			output: (content) => `<p>${content}</p>`
		},
		{
			desc: /^3\([^)]+\)$/gim, // 3(title)
			output: (content) => `<h3>${content.substring(2, content.length - 1)}</h3>`
		},
		{
			desc: /^4\([^)]+\)$/gim, // 4(title)
			output: (content) => `<h4>${content.substring(2, content.length - 1)}</h4>`
		},
		{
			desc: /^5\([^)]+\)$/gim, // 5(title)
			output: (content) => `<h5>${content.substring(2, content.length - 1)}</h5>`
		},
		{
			desc: /^6\([^)]+\)$/gim, // 6(title)
			output: (content) => `<h6>${content.substring(2, content.length - 1)}</h6>`
		},
		{
			desc: /I\([^()]+\([^()]+\){2}/gi, // i(alternative(url))
			output: (content) => {
				let dt = content.substring(2, content.length -2).split('('); // Remove i( from start and )) from end then split values by using the separator (.
				return `<img src="${dt[1]}" alt="${dt[0]}" />`; 
			}
		},
		{
			desc: /F\([^)]+\([^)]+\([^)]+\){3}/gi, // f(legend(alternative(url)))
			output: (content) => {
				let dt = content.substring(2, content.length -3).split('('); // Remove f( from start and ))) from end then split values by using the separator (.
				return `<figure><img src="${dt[2]}" alt="${dt[1]}" /><figcaption>${dt[0]}</figcaption></figure>`;
			}
		},
		{
			desc: /A\([^()]+\([^()]+\){2}/gi, // a(label(url))
			output: (content) => {
				let dt = content.substring(2, content.length -2).split('('); // Remove a( from start and )) from end then split values by using the separator (.
				return `<a href="${dt[1]}">${dt[0]}</a>`;
		}
		},
		{	
			desc: /S\([^)]+\)/gi, // s(text)
			output: (content) => `<strong>${content.substring(2, content.length - 1)}</strong>`
		},
		{
			desc: /E\([^)]+\)/gi, // e(text)
			output: (content) => `<em>${content.substring(2, (content.length - 1))}</em>`
		},
		{
			desc: /O\({3}.+\){3}/gi, // o(((value)))
			output: (content) => `<ol>${content.substring(2, content.length - 1)}</ol>`
		},
		{
			desc: /U\({3}.+\){3}/gi, // u(((value)))
			output: (content) => `<ul>${content.substring(2, content.length - 1)}</ul>`
		},
		{
			desc: /\({2}[^()]+\){2}/gi, // ((value)) only inside o() or u()
			output: (content) => `<li>${content.substring(2, content.length - 2)}</li>`
		}
	];