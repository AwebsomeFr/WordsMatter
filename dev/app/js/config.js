'use strict';

// Please read the full documentation first : https://awebsome.fr/blog-awebsome/creer-un-blog-ecoresponsable-avec-wordsmatter/

// Must be equal to the id specified in 'api/config.php'.
// Create your own and complex ID !
const EDITOR_ID = 'editor-tjJshBE63cSDDYkEeSZ8NNrNkdHDm5vUuCktkzS24f3uXesgeC';

// The URL where the api directory is located.
// Make it as complex as possible !
const API_URL = './api/';

// User Interface Translation. The following languages are availables : fr, en.
const LANG = 'fr';

// (For even more efficiency, you can delete the language you don't need below)
const LAB = {};
if(LANG === 'fr') {
	
	LAB.meta = {
		desc : 'Rédigez depuis l\'Application ; partagez grâce à l\'API connectée. WordsMatter est un module de gestion de blog 100% autonome, libre et gratuit. Son efficience en fait une alternative écoresponsable aux Systèmes de Gestion de Contenu traditionnels (CMS).',
		title :'WordsMatter | Écrivez ici, publiez ailleurs.'
	};

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
		availImg: 'Image(s) disponible(s)',
		awb: 'WordsMatter est proposé avec enthousiasme par',	
		balanced: 'Equilibré',
		close: 'Fermer',
		condImg: 'Formats acceptés : JPEG, PNG, WEBP.<br/>Taille de fichier maximale : 1Mo.',
		configuration: 'configuration',
		confirm: 'Confirmer',
		delSec: 'Supprimer la section',
		delete: 'Supprimer',
		doc: 'Documentation',
		exportPost: 'Exporter vers fichier .txt',
		getImages: 'Gérer la galerie',
		listPost: 'Modifier depuis le blog',
		loadPost: 'Importer depuis fichier .txt',
		menu: 'Menu',
		offline: 'déconnecté',
		online: 'connecté',
		open: 'Ouvrir',
		pickImg: 'Ou choisissez-en une ici',
		private: 'privé',
		published: 'publié',
		pushPost: 'Envoyer vers le blog',
		save: 'Sauvegarder',
		see: 'Voir',
		setHeight: 'Ajuster la hauteur',
		setTheme: 'Thème clair / thème sombre',
		setWidth: 'Ajuster la largeur',
		update: 'Mettre à jour',
	};

	LAB.input = {
		compress: 'Compresser ?',
		date: 'Publié le',
		draft: 'Brouillon ?',
		h1: 'Titre du post (h1)',
		h2: 'Titre de section (h2)',
		imgAlt: 'Description (alternative)',
		imgLeg: 'Légende de l\'image',
		lab: 'Libellé',
		list: 'Eléments composant la liste (un par ligne)',
		secContent: 'Contenu de section',
		secIntro: 'Introduction (optionnelle)',
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
		wsSave1: 'Post enregistré dans la mémoire locale du navigateur web.'
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

if(LANG === 'en') {

	LAB.meta = {
		desc : 'Write from the web application; share with the API. WordsMatter is a 100% autonomous, open-source and free blog management module. Its efficiency makes it an eco-responsible alternative to traditional content management systems (CMS).',
		title :'WordsMatter | Write here, publish elsewhere.'
	};

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
		availImg: 'Available image(s)',
		awb: 'WordsMatter is offered with enthusiasm by',
		balanced: 'Balanced',
		close: 'Close',
		condImg: 'Formats accepted: JPEG, PNG, WEBP.<br/>Maximum file size: 1Mb.',
		configuration: 'configuration',
		confirm: 'Confirm',
		delSec: 'Delete the section',
		delete: 'Delete',
		doc: 'Documentation',
		exportPost: 'Export to .txt file',
		getImages: 'Manage gallery',
		listPost: 'Edit from the blog',
		loadPost: 'Import from .txt file',
		menu: 'Menu',
		offline: 'offline',
		online: 'online',
		open: 'Open',
		pickImg: 'Or pick one here',
		private: 'private',
		published: 'published',
		pushPost: 'Push to the blog',
		save: 'Save',
		see: 'See',
		setHeight: 'Adjust height',
		setTheme: 'Light theme / dark theme',
		setWidth: 'Adjust width',
		update: 'Update',
	};

	LAB.input = {
		compress: 'Compress?',
		date: 'Publication date',
		draft: 'Draft ?',
		h1: 'Title of the post (h1)',
		h2: 'Title of the section (h2)',
		imgAlt: 'Description (alternative)',
		imgLeg: 'Image caption',
		lab: 'Label',
		list: 'Elements making up the list (one by line)',
		secContent: 'Content of the section',
		secIntro: 'Introduction (optional)',
		txtToTransf: 'Text to transform',
		url: 'Address (URL)'
	};

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
		wsSave1: 'Post saved in the local memory of the web browser.'
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
	}

}