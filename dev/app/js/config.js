"use strict";

/* --- To customize --- */

	// Must be equal to the id specified in 'api/config.php'. Please create your own and complex ID.
	const EDITOR_ID = 'editor-tjJshBE63cSDDYkEeSZ8NNrNkdHDm5vUuCktkzS24f3uXesgeC';

	// The URL where the api directory is located. Please rename it (see the documentation).
	const API_URL = './api/';

	// Supported : fr.
	const LANG = 'en'; 

/* --- i18n --- */

	const LAB = {};
	
	LAB.bt = {
		addA: 'Add a hyperlink',
		addEm: 'Add emphasic text ',
		addFig: 'Add a figure',
		addHx: 'Add a subtitle of level ',
		addImg: 'Add an image',
		addOl: 'Add an ordered list ',
		addSec: 'Add a section',
		addStr: 'Add strong text',
		addUl: 'Add an unordered list',
		close: 'Close',
		confirm: 'Confirm',
		delSec: 'Delete the section',
		delete: 'Delete',
		doc: 'Documentation ?',
		exportPost: 'Export to .txt file ↑',
		importPost: 'Import from .txt file ↓',
		listPost: 'Edit from the blog ↓',
		menu: 'Menu',
		open: 'Open',
		pushPost: 'Push to the blog ↑',
		update: 'Update',
		save: 'Save ↑',
		setHeight: 'Adjust height ↕',
		setTheme: 'Light theme / dark theme ☼',
		setWidth: 'Adjust width ↔'
	};

	LAB.input = {
		lib: 'Label',
		content: 'Content of the section',
		h1: 'Title of the post (h1)',
		h2: 'Title of the section (h2)',
		alt: 'Description (alternative)',
		leg: 'Image caption',
		intro: 'Optional introduction',
		list: 'Elements making up the list (delimiter: %%)',
		txtToTransf: 'Text to transform',
		url: 'Address (URL)'
	};

	LAB.notice = {
		loadSucc: 'Post successfully loaded.',
		servDelFail: 'Error while deleting blog post.',
		servDelSucc: 'Post deleted from blog.',
		servEmpty: 'Impossible: there is no post or draft on the blog yet.',
		servFail: 'Error while uploading: the post was not published.',
		servSucc: 'Message sent on the blog successfully.',
		servTitleEmpty: 'Impossible: the post must have a title to be published or saved as a draft on the blog.',
		servUnavailable: 'Unreachable server: the post cannot be sent to the blog. Check your internet connection.',
		wsDelEmpty: 'Nothing to delete from the local memory of the web browser.',
		wsDelFail: 'Error while deleting the post from the local memory of the web browser.',
		wsDelSucc: 'Post deleted from the local memory of the web browser.',
		wsSaveFail: 'Error while saving the post in the local memory of the web browser.',
		wsSaveSucc: 'Post saved in the local memory of the web browser.',
		wsUnavailable: 'Post cannot be saved / deleted: The <i>Web Storage</i> API is unavailable.'
	};

	LAB.dial = {
		exportPost: 'Copy and paste the following content into a .txt file. Use the <i>Import from .txt file</i> option accessible from the menu to reload it.',
		editPost: 'Which post do you want to edit from the blog?',
		delSection: 'The content of this section will be lost.',
		setHeight: 'Move the slider to change the preview height.',
		setWidth: 'Move the slider to change the working width.',
		wsDelAskConf: 'Permanently delete the post from the local memory of the web browser?',
		servConfNew: 'You will now send content to the blog. If the main title (h1) of the post is preceded by a %, it will be saved as a draft, but will not be made public.',
		servConfDel: 'Permanently delete the selected post from the blog?',
		servConfUpdate: 'A post with an identical title already exists on the blog. Replace it ? Note: If the main title (h1) of the post is preceded by a %, it will be saved as a draft, but will not be made public.'
	};

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
			confirm: 'Confirmer',
			delSec: 'Supprimer la section',
			delete: 'Supprimer',
			doc: 'Documentation ?',
			exportPost: 'Exporter vers fichier .txt ↑',
			importPost: 'Importer depuis fichier .txt ↓',
			listPost: 'Modifier depuis le blog ↓',
			menu: 'Menu',
			open: 'Ouvrir',
			update: 'Mettre à jour',
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

		LAB.notice = {
			loadSucc: 'Post chargé avec succès.',
			servDelFail: 'Erreur lors de la suppression du post du blog.',
			servDelSucc: 'Post supprimé du blog.',
			servEmpty: 'Impossible : il n\'y a encore ni post ni brouillon sur le blog.',
			servFail: 'Erreur lors de la mise en ligne : le post n\'a pas été publié.',
			servSucc: 'Post envoyé avec succès vers le blog.',
			servTitleEmpty: 'Impossible : le post doit avoir un titre pour être publié ou sauvegardé en tant que brouillon sur le blog.',
			servUnavailable: 'Serveur injoignable : le post ne peut être envoyé vers le blog. Vérifiez votre connexion Internet.',
			wsDelEmpty: 'Rien à supprimer de la mémoire locale du navigateur web.',
			wsDelFail: 'Erreur lors de la suppression du post de la mémoire locale du navigateur web.',
			wsDelSucc: 'Post supprimé de la mémoire locale du navigateur web.',
			wsSaveFail: 'Erreur lors de l\'enregistrement du post dans la mémoire locale du navigateur web.',
			wsSaveSucc: 'Post enregistré dans la mémoire locale du navigateur web.',
			wsUnavailable: 'Le post ne peut être sauvegardé / supprimé : l\'API <i>Web Storage</i> est indisponible.'
		};

		LAB.dial = {
			exportPost: 'Copiez-collez le contenu suivant dans un fichier .txt. Utilisez l\'option <i>Importer depuis fichier .txt</i> accessible depuis le menu pour le recharger.',
			editPost: 'Quel post souhaitez-vous modifier depuis le blog ?',
			delSection: 'Le contenu de cette section sera perdu.',
			setHeight: 'Déplacez le curseur pour modifier la hauteur de prévisualisation.',
			setWidth: 'Déplacez le curseur pour modifier la largeur de travail.',
			wsDelAskConf: 'Supprimer définitivement le post de la mémoire locale du navigateur web ?',
			servConfNew: 'Vous allez maintenant envoyer du contenu vers le blog. Si le titre principal (h1) du post est précédé d\'un %, il sera sauvegardé en tant que brouillon, mais ne sera pas rendu public.',
			servConfDel: 'Supprimer définitivement le post sélectionné du blog ?',
			servConfUpdate: 'Un post avec un titre identique existe déjà sur le blog. Le remplacer ? Note : Si le titre principal (h1) du post est précédé d\'un %, il sera sauvegardé en tant que brouillon, mais ne sera pas rendu public.'	
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