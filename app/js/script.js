document.body.onload = () => {

	resetPost();

	// #1. Is the Web Storage API available ?

	if(localStorage) {
		
		// Enable features.
		document.getElementById('bt-save-work').classList.remove('disabled');
		document.getElementById('bt-delete-work').classList.remove('disabled');

		// Autoload.
		if(localStorage.getItem('post')) {
			importFromLocalStorage(JSON.parse(localStorage.getItem('post')));
		}

	}

	// #2. Is the server available ?

	let req = createRequest(API_URL + 'initServer.php');

	req.onload = () => {

		if(req.status === 200) {

			// Enable features.
			document.getElementById('bt-list-work').style.display = 'block';
			document.getElementById('bt-release-work').style.display = 'block';
			document.getElementById('bt-open-menu').setAttribute('class', 'online'); 

		}

	};

	req.send('EditorId=' + EDITOR_ID);

	// #3. Autoset viewport.

	setViewportHeight();

	window.onresize = () => {
		setViewportHeight();
	}

};