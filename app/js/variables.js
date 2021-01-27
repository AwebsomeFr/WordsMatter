"use strict";

let marker = 0;
let varTemp;
const DATA_NAME = 'post';
const MESS = {

	wsUnavailable: '<p class="b">Le post ne peut être sauvegardé/supprimé : l\'API <i>Web Storage</i> est indisponible ou a été désactivée sur ce navigateur web.</p>',
	wsSaveSucc: '<p class="g">Post enregistré dans la mémoire locale du navigateur web.</p>',
	wsSaveFail: '<p class="b">Erreur lors de l\'enregistrement du post dans la mémoire locale du navigateur web.</p>',
	wsDelAskConf: 
		'<p class="a"> Supprimer définitivement le post de la mémoire locale du navigateur web ?</p>' +
		'<button class="danger" onclick="deleteFromLocalStorage(true)">Confirmer la suppression</button>',
	wsDelEmpty: '<p class="b">Rien à supprimer de la mémoire locale du navigateur web.</p>',
	wsDelSucc: '<p class="g">Post supprimé de la mémoire locale du navigateur web.</p>',
	wsDelFail: '<p class="b">Erreur lors de la suppression du post de la mémoire locale du navigateur web. Si le problème persiste, supprimez les données de navigation du navigateur web.</p>',
	loadSucc: '<p class="g">Post chargé avec succès.</p>',
	servTitleEmpty: '<p class="b">Le post doit avoir un titre pour être publié ou sauvegardé en tant que brouillon sur le blog.</p>',
	servUnavailable: '<p class="b">Serveur injoignable : le post ne peut être envoyé vers le blog. Vérifiez votre connexion Internet. Si le problème persiste, contactez le prestataire en charge de votre blog.</p>',
	servConfNew:
		'<p class="a"> Vous allez envoyer du contenu vers le blog.</p>' +
		'<p>Note : Si le titre principal (h1) du post est précédé d\'un %, il sera sauvegardé en tant que brouillon, mais ne sera pas rendu public.</p>' +
		'<button onclick="pushPost(true)">Envoyer</button>',
	servConfUpdate:
		'<p class="a"> Un post avec un titre identique existe déjà sur le blog. Le remplacer ?</p>' +
		'<p>Note : Si le titre principal (h1) du post est précédé d\'un %, il sera sauvegardé en tant que brouillon, mais ne sera pas rendu public.</p>' +
		'<button onclick="pushPost(true)">Mettre à jour</button>',
	servConfDel: 
		'<p class="a"> Supprimer définitivement le post sélectionné du blog ?</p>' +
		'<button class="danger" onclick="deleteFromServer(true, varTemp)">Confirmer la suppression</button>',
	servDelSucc: '<p class="g">Post supprimé du blog.</p>',
	servDelFail: '<p class="b">Erreur lors de la suppression du post du serveur. Si le problème persiste, contactez le prestataire en charge de la configuration de WordsMatter.</p>',
	servSucc: '<p class="g">Post envoyé avec succès vers le blog.</p>',
	servFail: '<p class="b">Erreur lors de la mise en ligne : le post n\'a pas été publié. Si le problème persiste, contactez le prestataire en charge de votre blog.</p>',
	servEmpty: '<p class="b">Impossible : il n\'y a encore ni post ni brouillon sur le blog.</p>',

};