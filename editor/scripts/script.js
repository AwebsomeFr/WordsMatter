var marker = 0;
var varTemp;

const DATA_NAME = 'post';
const MESS = {

	wsUnavailable: 
		'<p class="b">Votre post ne peut être sauvegardé ou supprimé : l\'API <i>Web Storage</i> semble indisponible ou a été désactivée sur votre navigateur web.</p>',
	wsSaveSucc: 
		'<p class="g">Le contenu de votre post a été enregistré dans la mémoire locale du navigateur web.</p>',
	wsSaveFail: 
		'<p class="b">Une erreur est survenue pendant l\'enregistrement de votre post dans la mémoire locale du navigateur web.</p>',
	wsDelAskConf: 
		'<p><b style="color:#ffa500">!</b> Supprimer le contenu de la mémoire locale du navigateur web ? Cette opération est irréversible.</p>' +
		'<p>(peut-être souhaiteriez-vous <a href="#" onclick="exportToFile()">exporter votre post vers un fichier .txt</a> ou le <a href="#" onclick="servPost()">publier sur le blog</a> avant ?)</p>' +
		'<button onclick="dial()">Annuler</button>' +
		'<button class="danger" onclick="deleteFromLocalStorage(true)">Confirmer la suppression</button>',
	wsDelEmpty: 
		'<p class="b">Il n\'y a rien à supprimer de la mémoire du navigateur web ! Pour pouvoir supprimer quelque chose, commencez par <a href="#" onclick="saveIntoLocalStorage()">sauvegarder</a> votre post dans la mémoire du navigateur web.</p>' +
			'<p>(Vous souhaitiez simplement réinitialiser WordsMatter ? Vous pouvez <a href="#" onclick="refresh()">recharger la page</a> ?)</p>',
	wsDelSucc: 
		'<p class="g">Le contenu de votre post a bien été supprimé de la mémoire locale du navigateur web.</p>',
	wsDelFail: 
		'<p class="b">Une erreur est survenue pendant la suppression de votre post de la mémoire locale du navigateur web. Si le problème persiste, essayez de supprimer les données de navigation de votre navigateur.</p>',
	loadSucc: 
		'<p class="g">Le contenu de votre post a été chargé avec succès.</p>',
	servTitleEmpty: 
		'<p class="b">Votre post doit avoir un titre pour être publié. Précisez-ce dernier, puis réessayez.</p>',
	serverUnavailable: 
		'<p class="b">Le serveur est injoignable : votre post ne peut être publié. Vérifiez votre connexion Internet, réessayez dans quelques instants. Si le problème persiste, contactez le prestataire en charge de la configuration de votre blog.</p>',
	servConfNew:
		'<p><b style="color:#ffa500">!</b> Vous allez publier un nouveau post.</p>' +
		'<button onclick="dial()">Annuler</button>' +
		'<button onclick="releasePost(true)">Publier le post</button>',
	servConfUpdate:
		'<p><b style="color:#ffa500">!</b> Attention : un post avec un titre identique a déjà été publié. Souhaitez-vous le remplacer ?</p>' +
		'<button onclick="dial()">Annuler</button>' +
		'<button onclick="releasePost(true)">Mettre à jour</button>',
	servConfDel: 
		'<p><b style="color:#ffa500">!</b> Supprimer le post sélectionné du serveur ? Cette opération est irréversible.</p>' +
		'<button onclick="dial()">Annuler</button>' +
		'<button class="danger" onclick="deleteFromServer(true, varTemp)">Confirmer la suppression</button>',
	servDelSucc: 
		'<p class="g">Votre post a bien été supprimé du serveur.</p>',
	servDelFail: 
		'<p class="b">Une erreur est survenue pendant la suppression du post du server. Réessayez. Si le problème persiste, contactez le prestataire en charge de la configuration de votre blog.</p>',
	servSucc: 
		'<p class="g">Félicitations : votre post a été publié avec succès.</p>',
	servFail: 
		'<p class="b">Une erreur est survenue pendant le traitement de la mise en ligne : votre post n\'a pas été publié. Réessayez. Si le problème persiste, contactez le prestataire en charge de la configuration de votre blog.</p>',
	servEmpty:
		'<p class="b">Il n\'y a encore aucun post en ligne. Lorsque vous aurez publié du contenu, vos articles seront listés ici.</p>',

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

	let req = createRequest(PUBLISHER_URL + 'initServer.php');
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