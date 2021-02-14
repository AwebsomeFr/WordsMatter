'use strict';

/* --- To customize --- */

	// Must be equal to the id specified in 'api/config.php'. Please create your own and complex ID.
	const EDITOR_ID = 'editor-tjJshBE63cSDDYkEeSZ8NNrNkdHDm5vUuCktkzS24f3uXesgeC';

	// The URL where the api directory is located. Please rename it (see the documentation).
	const API_URL = './api/';

	// Supported : fr / en.
	const LANG = 'en'; 

/* --- i18n --- */

	const LAB = {};
	
	LAB.bt = {
		add: 'Add',
		addA: 'Add a hyperlink',
		addEm: 'Add emphasic text ',
		addFig: 'Add a figure',
		addHx: 'Add a subtitle of level ',
		addImg: 'Add an image',
		addOl: 'Add an ordered list ',
		addSec: 'Add a section',
		addStr: 'Add strong text',
		addUl: 'Add an unordered list',
		advReading: 'Advantage reading',
		advWriting: 'Advantage writing',
		awb: 'WordsMatter is offered with enthusiasm by',
		balanced: 'Balanced',
		close: 'Close',
		configuration: 'configuration',
		confirm: 'Confirm',
		delSec: 'Delete the section',
		delete: 'Delete',
		doc: 'Documentation',
		exportPost: 'Export to .txt file',
		loadPost: 'Import from .txt file',
		listPost: 'Edit from the blog',
		menu: 'Menu',
		offline: 'offline',
		online: 'online',
		open: 'Open',
		getImages: 'Manage gallery',
		pickImg: 'Or pick one here',
		private: 'private',
		published: 'published',
		pushPost: 'Push to the blog',
		uploadImg: 'Upload an image (formats accepted: JPEG, PNG, WEBP / maximum file size: 1Mb).',
		save: 'Save',
		setHeight: 'Adjust height',
		setTheme: 'Light theme / dark theme',
		setWidth: 'Adjust width',
		update: 'Update'
	};

	LAB.input = {
		postClass: 'Class (optional)',
		postDate: 'Publication date',
		postDraft: 'Save as a draft ?',
		imgAlt: 'Description (alternative)',
		secContent: 'Content of the section',
		h1: 'Title of the post (h1)',
		h2: 'Title of the section (h2)',
		secIntro: 'Introduction (optional)',
		imgLeg: 'Image caption',
		lab: 'Label',
		list: 'Elements making up the list (one by line)',
		txtToTransf: 'Text to transform',
		url: 'Address (URL)'
	};

	// 0: fail, 1: success, X: unavailable, Y: empty.
	LAB.notice = {
		error: 'An error has occurred.',
		load0: 'Error while loading post.',
		load1: 'Post successfully loaded.',
		serv0: 'Error while uploading: the post was not published.',
		serv1: 'Post sent on the blog successfully.',
		servContentY: 'Impossible: there is no post or draft on the blog yet.',
		servDel0: 'Error while deleting blog post.',
		servDel1: 'Post deleted from blog.',
		servTitleY: 'Impossible: the post must have a title to be published or saved as a draft on the blog.',
		wsDel0: 'Error while deleting the post from the local memory of the web browser.',
		wsDel1: 'Post deleted from the local memory of the web browser.',
		wsDelY: 'Nothing to delete from the local memory of the web browser.',
		wsSave0: 'Error while saving the post in the local memory of the web browser.',
		wsSave1: 'Post saved in the local memory of the web browser.',
	};

	LAB.dial = {
		confDelSec: 'The content of this section will be lost.',
		confDelServ: 'Permanently delete the selected post from the blog?',
		confDelWs: 'Permanently delete the post from the local memory of the web browser?',
		confPushServ: 'You will now send content to the blog.',
		confUpdateServ: 'A post with an identical title already exists on the blog. Replace it ?',
		editPost: 'Which post do you want to edit from the blog?',
		exportPost: 'Copy and paste the following content into a .txt file. Use the <i>Import from .txt file</i> option accessible from the menu to reload it.',
		setHeight: 'Choose how the writing and writing areas should occupy the height space.',
		setWidth: 'Select the MAXIMUM width used by WordsMatter.'
	};

	if(LANG === 'fr') {
		
		LAB.bt = {
			add: 'Ajouter',
			addA: 'Ajouter un lien hypertexte',
			addEm: 'Ajouter du texte emphasique',
			addFig: 'Ajouter une figure',
			addHx: 'Ajouter un sous-titre de niveau ',
			addImg: 'Ajouter une image',
			addOl: 'Ajouter une liste ordonnée',
			addSec: 'Ajouter une section',
			addStr: 'Ajouter du texte important',
			addUl: 'Ajouter une liste non ordonnée',
			advReading: 'Avantager lecture',
			advWriting: 'Avantager écriture',
			awb: 'WordsMatter est proposé avec enthousiasme par',	
			balanced: 'Equilibré',
			close: 'Fermer',
			configuration: 'configuration',
			confirm: 'Confirmer',
			delSec: 'Supprimer la section',
			delete: 'Supprimer',
			doc: 'Documentation',
			exportPost: 'Exporter vers fichier .txt',
			loadPost: 'Importer depuis fichier .txt',
			listPost: 'Modifier depuis le blog',
			menu: 'Menu',
			offline: 'déconnecté',	
			online: 'connecté',
			open: 'Ouvrir',
			getImages: 'Gérer la galerie',
			pickImg: 'Ou choisissez-en une ici',
			private: 'privé',
			published: 'publié',
			pushPost: 'Envoyer vers le blog',
			uploadImg: 'Charger une image (formats acceptés: JPEG, PNG, WEBP / taille de fichier maximale : 1Mo)',
			save: 'Sauvegarder',
			setHeight: 'Ajuster la hauteur',
			setTheme: 'Thème clair / thème sombre',
			setWidth: 'Ajuster la largeur',
			update: 'Mettre à jour'
		};

		LAB.input = {
			postClass: 'Classe (optionnelle)',
			postDate: 'Date de publication',
			postDraft: 'Sauvegarder en tant que brouillon ?',
			imgAlt: 'Description (alternative)',
			secContent: 'Contenu de section',
			h1: 'Titre du post (h1)',
			h2: 'Titre de section (h2)',
			secIntro: 'Introduction (optionnelle)',
			imgLeg: 'Légende de l\'image',
			lab: 'Libellé',
			list: 'Eléments composant la liste (un par ligne)',
			txtToTransf: 'Texte à transformer',
			url: 'Adresse (URL)'
		};

		LAB.notice = {
			error: 'Une erreur est survenue.',
			load0: 'Erreur pendant le chargement du post.',
			load1: 'Post chargé avec succès.',
			serv0: 'Erreur lors de la mise en ligne : le post n\'a pas été publié.',
			serv1: 'Post envoyé avec succès vers le blog.',
			servContentY: 'Impossible : il n\'y a encore ni post ni brouillon sur le blog.',
			servDel0: 'Erreur lors de la suppression du post du blog.',
			servDel1: 'Post supprimé du blog.',
			servTitleY: 'Impossible : le post doit avoir un titre pour être publié ou sauvegardé en tant que brouillon sur le blog.',
			wsDel0: 'Erreur lors de la suppression du post de la mémoire locale du navigateur web.',
			wsDel1: 'Post supprimé de la mémoire locale du navigateur web.',
			wsDelY: 'Rien à supprimer de la mémoire locale du navigateur web.',
			wsSave0: 'Erreur lors de l\'enregistrement du post dans la mémoire locale du navigateur web.',
			wsSave1: 'Post enregistré dans la mémoire locale du navigateur web.',
		};

		LAB.dial = {
			confDelSec: 'Le contenu de cette section sera perdu.',
			confDelServ: 'Supprimer définitivement le post sélectionné du blog ?',
			confDelWs: 'Supprimer définitivement le post de la mémoire locale du navigateur web ?',
			confPushServ: 'Vous allez maintenant envoyer du contenu vers le blog.',
			confUpdateServ: 'Un post avec un titre identique existe déjà sur le blog. Le remplacer ?',
			editPost: 'Quel post souhaitez-vous modifier depuis le blog ?',
			exportPost: 'Copiez-collez le contenu suivant dans un fichier .txt. Utilisez l\'option <i>Importer depuis fichier .txt</i> accessible depuis le menu pour le recharger.',
			setHeight: 'Choisissez de quelle manière les zones d\'écriture et de rédaction doivent occuper l\'espace dans la hauteur. ',
			setWidth: 'Choisissez la largeur MAXIMALE utilisée par WordsMatter.'
		};
	
	}

/* --- Regexes --- */

	const REGEX = [

		{ // <br>
			desc: /\s{2}\n/g,
			output: () => '<br/>'
		},
		{ // Only inline elements (strong, em, img) should be enclosed in a <p>.
			desc: /^(?!3_|4_|5_|6_|_\s|__\s|\!\[[^\]]+\]\([^\)]+\)).+$/gm, 
			output: (ct) => `<p>${ct}</p>`
		},
		{ // <h3>
			desc: /^3_.+$/gim, // 3_title
			output: (ct) => `<h3>${ct.substring(2)}</h3>`
		},
		{ // <h4>
			desc: /^4_.+$/gim, // 4_title
			output: (ct) => `<h4>${ct.substring(2)}</h4>`
		},
		{ // <h5>
			desc: /^5_.+$/gim, // 5_title
			output: (ct) => `<h5>${ct.substring(2)}</h5>`
		},
		{ // <h6>
			desc: /^6_.+$/gim, // 6_title
			output: (ct) => `<h6>${ct.substring(2)}</h6>`
		},
		{ // <img> / <figure>
			desc: /\!\[[^\]]+\]\([^\)]+\)/gi, // ![alt|legend](img_url)
			output: (ct) => {
				let dt = ct.substring(2, ct.length -1).split('](');
				dt[0] = dt[0].split('|');
				return dt[0].length > 1 ? // Is there a legend?
					`<figure>
						<img src="${dt[1]}" alt="${dt[0][0]}" />
						<figcaption>${dt[0][1]}</figcaption>
					</figure>`:
					`<img src="${dt[1]}" alt="${dt[0][0]}" />`;
			}
		},
		{ // <a>
			desc: /\[[^\]]+\]\([^\)]+\)/gi, // [label](url)
			output: (ct) => {
				let dt = ct.substring(1, ct.length - 1).split('](');
				return `<a href="${dt[1]}">${dt[0]}</a>`;
			}
		},
		{ // <ol>
			desc: /(^__\s.*\n){1,}/gim,
			output: (ct) => `<ol>${ct}</ol>`
		},
		{ // <li>
			desc: /^(<ol>)?__\s.+/gim, // __ ordered list item (the first element will be preceeding by <ol>)
			output: (ct) =>
				ct.startsWith('<ol>__') ?
					`<ol><li>${ct.substring(7,ct.length)}</li>` :
					`<li>${ct.substring(3,ct.length)}</li>`
		},
		{ // <ul>
			desc: /(^_\s.*\n){1,}/gim,
			output: (ct) => `<ul>${ct}</ul>`
		},
		{ // <li>
			desc: /^(<ul>)?_\s.+/gim, // _ unordered list items (the first element will be preceeding by <ul>)
			output: (ct) =>
				ct.startsWith('<ul>_') ?
					`<ul><li>${ct.substring(6,ct.length)}</li>` :
					`<li>${ct.substring(2,ct.length)}</li>`
		},
		{ // <strong>
			desc: /_{2}[^_]+_{2}/gi, // __strong text__
			output: (ct) => `<strong>${ct.substring(2, ct.length - 2)}</strong>`
		},
		{ // <em>
			desc: /_[^_]+_/gi, // _emphasic text_
			output: (ct) => `<em>${ct.substring(1, ct.length - 1)}</em>`
		},
	];