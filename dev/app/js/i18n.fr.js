'use strict';

const LAB = {
	meta: {
		desc : 'Rédigez depuis l\'Application ; partagez grâce à l\'API connectée. WordsMatter est un module de gestion de blog 100% autonome, libre et gratuit. Son efficience en fait une alternative écoresponsable aux Systèmes de Gestion de Contenu traditionnels (CMS).',
		title :'WordsMatter | Écrivez ici, publiez ailleurs.'
	},
	bt: {
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
		condImg: 'Formats acceptés : JPEG, PNG, WEBP.<br/>Taille de fichier maximale : 1Mo.',
		save: 'Sauvegarder',
		availImg: 'Image(s) disponible(s)',
		setHeight: 'Ajuster la hauteur',
		setTheme: 'Thème clair / thème sombre',
		setWidth: 'Ajuster la largeur',
		update: 'Mettre à jour'
	},
	input: {
		postClass: 'Classe',
		postDate: 'Publié le',
		postDraft: 'Brouillon ?',
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
	},
	notice: {
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
		wsSave1: 'Post enregistré dans la mémoire locale du navigateur web.'
	},
	dial: {
		confDelSec: 'Le contenu de cette section sera perdu.',
		confDelServ: 'Supprimer définitivement le post sélectionné du blog ?',
		confDelWs: 'Supprimer définitivement le post de la mémoire locale du navigateur web ?',
		confPushServ: 'Vous allez maintenant envoyer du contenu vers le blog.',
		confUpdateServ: 'Un post avec un titre identique existe déjà sur le blog. Le remplacer ?',
		editPost: 'Quel post souhaitez-vous modifier depuis le blog ?',
		exportPost: 'Copiez-collez le contenu suivant dans un fichier .txt. Utilisez l\'option <i>Importer depuis fichier .txt</i> accessible depuis le menu pour le recharger.',
		setHeight: 'Choisissez de quelle manière les zones d\'écriture et de rédaction doivent occuper l\'espace dans la hauteur. ',
		setWidth: 'Choisissez la largeur MAXIMALE utilisée par WordsMatter.'
	}
};