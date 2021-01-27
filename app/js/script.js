"use strict";

document.body.onload = () => {

	resetPost();

	// Is the Web Storage API available ?
	if(localStorage) {
		
		// Enable features.
		document.getElementById('bt-save-work').classList.remove('disabled');
		document.getElementById('bt-delete-work').classList.remove('disabled');

		// Reload content.
		if(localStorage.getItem('post')) {
			importFromLocalStorage(JSON.parse(localStorage.getItem('post')));
		}

		// Reload theme. 
		if(localStorage.getItem('theme') === 'light') {
			toLightTheme();
		}

	}

	// Is the server available ?
	let req = createRequest(API_URL + 'init.php');
	
	req.onload = () => {
	
		if(req.status === 200) {
			// Enable features.
			document.getElementById('bt-list-work').style.display = 'block';
			document.getElementById('bt-release-work').style.display = 'block';
			document.getElementById('bt-open-menu').setAttribute('class', 'online'); 
		}

	};

	req.send('editorId=' + EDITOR_ID);

	// Autoset viewport.
	setViewportHeight();
	window.onresize = () => {
		setViewportHeight();
	}

};