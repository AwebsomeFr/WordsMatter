var marker = 0;
var varTemp;

const DATA_NAME = 'post';
const MESS = {

	wsUnavailable: 
		'<p class="b">Votre post ne peut être sauvegardé ou supprimé : l\'API <i>Web Storage</i> semble indisponible ou a été désactivée sur votre navigateur web.</p>',
	wsSaveSucc: 
		'<p class="g">Le contenu de votre post a été enregistré avec succès dans la mémoire locale du navigateur web.</p>',
	wsSaveFail: 
		'<p class="b">Une erreur est survenue pendant l\'enregistrement de votre post dans la mémoire locale du navigateur web.</p>',
	wsDelAskConf: 
		'<p class="a"> Supprimer le contenu de la mémoire locale du navigateur web ? Attention : cette opération est irréversible.</p>' +
		'<button class="danger" onclick="deleteFromLocalStorage(true)">Confirmer la suppression</button>',
	wsDelEmpty: 
		'<p class="b">Il n\'y a rien à supprimer de la mémoire du navigateur web ! Pour pouvoir supprimer quelque chose, commencez par <a href="#" onclick="saveIntoLocalStorage()">sauvegarder</a> votre post dans la mémoire du navigateur web.</p>' +
			'<p>(Vous souhaitiez simplement réinitialiser WordsMatter ? Vous pouvez <a href="#" onclick="refresh()">recharger la page</a> ?)</p>',
	wsDelSucc: 
		'<p class="g">Le contenu de votre post a été supprimé avec succès de la mémoire locale du navigateur web.</p>',
	wsDelFail: 
		'<p class="b">Une erreur est survenue pendant la suppression de votre post de la mémoire locale du navigateur web. Si le problème persiste, essayez de supprimer les données de navigation de votre navigateur.</p>',
	loadSucc: 
		'<p class="g">Le contenu de votre post a été rechargé avec succès.</p>',
	servTitleEmpty: 
		'<p class="b">Votre post doit avoir un titre pour être publié ou sauvegardé en tant que brouillon sur le blog.</p>',
	servUnavailable: 
		'<p class="b">Le serveur est injoignable : votre post ne peut être envoyé vers le blog. Vérifiez votre connexion Internet, réessayez dans quelques instants. Si le problème persiste, contactez le prestataire en charge de la configuration de votre WordsMatter.</p>',
	servConfNew:
		'<p class="a"> Vous allez envoyer du contenu vers le blog.</p>' +
		'<p>Si le titre principal (h1) de votre post est précédé d\'un %, il sera sauvegardé en tant que <b>brouillon</b>, mais ne sera pas rendu public.</p>' +
		'<p>Pour valider la <b>publication</b> de votre post, assurez-vous que son titre principal (h1) ne débute pas par %.</p>' +
		'<button onclick="pushPost(true)">Valider</button>',
	servConfUpdate:
		'<p class="a"> Attention : un post avec un titre identique est déjà présent sur le blog. Souhaitez-vous le remplacer ?</p>' +
		'<p>Pour rappel, vous pouvez transformer ce post en brouillon en faisant précéder d\'un % son titre principal (h1) ou le rendre public, en supprimant le %.</p>' +
		'<button onclick="pushPost(true)">Mettre à jour</button>',
	servConfDel: 
		'<p class="a"> Supprimer le post sélectionné du blog ? Cette opération est irréversible.</p>' +
		'<button class="danger" onclick="deleteFromServer(true, varTemp)">Confirmer la suppression</button>',
	servDelSucc: 
		'<p class="g">Votre post été supprimé avec succès du blog.</p>',
	servDelFail: 
		'<p class="b">Une erreur est survenue pendant la suppression du post du server. Réessayez. Si le problème persiste, contactez le prestataire en charge de la configuration de WordsMatter.</p>',
	servSucc: 
		'<p class="g">Félicitations : votre post a été envoyé avec succès vers le blog.</p>',
	servFail: 
		'<p class="b">Une erreur est survenue pendant le traitement de la mise en ligne : votre post n\'a pas été publié. Réessayez. Si le problème persiste, contactez le prestataire en charge de la configuration de WordsMatter.</p>',
	servEmpty:
		'<p class="b">Il n\'y a encore ni post ni brouillon sur le blog.</p>',

};

resetPost();

// Is the Web Storage API available ?
if(localStorage) {
	
	// Enable features.
	document.getElementById('bt-save-work').classList.remove('disabled');
	document.getElementById('bt-delete-work').classList.remove('disabled');

	// Autoload.
	if(localStorage.getItem('post')) {
		importFromLocalStorage(JSON.parse(localStorage.getItem('post')));
	}

}

// Is the server available ?
(function() {

	let req = createRequest(API_URL + 'initServer.php');
	req.onload = () => {

		if(req.status === 200) {

			// Enable feature.
			document.getElementById('bt-list-work').style.display = 'block';
			document.getElementById('bt-release-work').style.display = 'block';
			document.getElementById('bt-open-menu').setAttribute('class', 'online'); 

		}

	};

	req.send('EditorId=' + EDITOR_ID);

})();

// Is the screen width more or equal to 768px ?

/* For notice only (achieved with @media in style.main.css)

	// Enable feature.
	document.getElementById('bt-set-width').classList.remove('disabled');
	
} */