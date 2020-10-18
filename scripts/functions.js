/* --- User Interface --- */

	toggleMenu = (boolean) => {

		if(boolean === true) {
			document.getElementById('nav-container').classList.remove('hidden');
		}
		else {
			document.getElementById('nav-container').classList.add('hidden');
		}
		
	};

	toggleTheme = () => {

		document.body.classList.toggle('light-theme');

	};

	setHeight = () => {

		dial(
			'<p>Déplacez le curseur pour modifier la répartition verticale entre les deux zones.</p>' +
			'<input ' +
				 'type="range"' + 
				 'min="0.25"' +
				 'max="4"' +
				 'step="0.25"' +
				 'oninput="document.querySelector(\'main\').style.gridTemplateRows = \'auto 1fr \' + this.value + \'fr\'" />'
		);

	};

	setWidth = () => {

		dial(
			'<p>Déplacez le curseur pour ajuster la largeur de travail utile.</p>' +
			'<input ' +
				 'type="range"' + 
				 'min="25"' +
				 'max="100"' +
				 'step="5"' +
				 'oninput="document.querySelector(\'main\').style.width = this.value + \'%\'" />'
		);

	};

	onHelp = () => {

		window.open('./help.html');

	}; 

	dial = (mess) => {
		
		let dialogElm = document.getElementById('dial');
		
		if(mess != undefined) {
			dialogElm.querySelector('div').innerHTML = mess;
			document.querySelector('main').style.opacity = '0.3';
			dialogElm.classList.remove('hidden');
		}

		else {
			dialogElm.querySelector('div').innerHTML = '';
			document.querySelector('main').style.opacity = '1';
			dialogElm.classList.add('hidden');
		}

		toggleMenu(false);

	};

	refresh = () => {

		window.location.reload();

	};

/* --- Web storage API --- */

	saveIntoLocalStorage = () => {

		let datasContent = JSON.stringify(getPost());

		// Web Storage available ?
		if(localStorage) {
			
			// Proceed.
			localStorage.setItem(DATA_NAME, datasContent);
			
			// Success ?
			dial(
				localStorage.getItem(DATA_NAME) === datasContent ?	
				MESS.wsSaveSucc :
				MESS.wsSaveFail
			);

		}

		else {
			dial(MESS.wsUnavailable);
		}

	};

	importFromLocalStorage = (post) => {

		resetPost();
		setPost(post);
		dial(MESS.loadSucc);

	};

	deleteFromLocalStorage = (validation = false) => {

		// Web Storage available ?
		if(localStorage) {

			// Is there something to delete ?
			if(localStorage.getItem(DATA_NAME)) {

				// User confirmation ?
				if(validation) {

					// Proceed
					localStorage.removeItem(DATA_NAME);

					// Success ?
					if(!localStorage.getItem(DATA_NAME)) {
						resetPost();
						dial(MESS.wsDelSucc);
					}

					else {
						dial(MESS.wsDelFail);
					}

				}

				else {
					dial(MESS.wsDelAskConf);
				}

			}

			else {
				dial(MESS.wsDelEmpty);
			}

		}

		else {
			dial(MESS.wsUnavailable);
		}

	};

/* --- Server --- */

	createRequest = (url) => {

		let req = new XMLHttpRequest();
		req.open('POST', url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		return req;
		
	};

	releasePost = (validation = false) => {

		// Has a title been specified ?
		if(document.getElementById('output-art-title').textContent.trim() != '') { 

			let req = createRequest(API_URL + 'releasePost.php');
			req.onload = () => {

				// Is the server available ?
				if(req.status === 200) {

					// New post ? Ask confirm release.
					if(req.responseText == 'release') {
						dial(MESS.servConfNew);
					}

					// Existing post ? Ask confirm update.
					else if(req.responseText == 'update') {
						dial(MESS.servConfUpdate);
					}

					// Success ?
					else if(req.responseText == 'success') {
						dial(MESS.servSucc);
					}

					else {
						dial(MESS.servFail);
					}
				
				}

				else {
					dial(MESS.servUnavailable);
				}

			};

			req.send('post=' + JSON.stringify(getPost()) + '&EditorId=' + EDITOR_ID + '&validation=' + validation);

		}

		else {
			dial(MESS.servTitleEmpty);
		}

	};

	deleteFromServer = (validation = false, filename) => {
	
		// User confirmation ?
		if(validation) {

			let req = createRequest(API_URL + 'deletePost.php');
			req.onload = () => {

				// Is the server available ?
				if(req.status === 200) {

					// Success ?
					if(req.responseText == 'success') {
						dial(MESS.servDelSucc); 
					}

					else {
						dial(MESS.servDelFail); 
					}

				}

			};

			// Proceed.
			req.send('EditorId=' + EDITOR_ID + '&filename=' + filename);

		}

		else {

			// Note for dev : is there a way to avoid this global ? 
			varTemp = filename;
			dial(MESS.servConfDel); 

		}

	};

	importFromFile = (file) => {

		let reader = new FileReader();
		
		reader.onloadend = (e) => {

			resetPost();
			setPost(JSON.parse(e.target.result));
			dial(MESS.loadSucc);

			};

		reader.readAsText(file);

	};

	importFromServer = (filename) => {

		let req = createRequest(API_URL + 'openPost.php');
		req.onload = () => {

			if(req.status === 200) {

				importFromLocalStorage(JSON.parse(req.responseText));

			}

		};

		req.send('EditorId=' + EDITOR_ID + '&filename=' + filename);

	};

	getFiles = () => {

		let req = createRequest(API_URL + 'getPosts.php');
		req.onload = () => {

			if(req.status === 200) {

				let files = JSON.parse(req.responseText);
				
				if(files.length > 0) {

					let message = '<p>Quel post ou brouillon souhaitez-vous modifier ?</p><ul id="posts-list">';
					for(let file of files) {
						message += '<li>' +
							'<button class="danger" onclick="deleteFromServer(false, this.nextSibling.textContent)">X</button>' +
							'<button onclick="importFromServer(this.textContent)">' + file.filename + '</button>' +
						'</li>';
					}
					message += '</ul>';

					dial(message);

				}

				else {
					dial(MESS.servEmpty);
				}

			}

			else {
				dial(MESS.servUnavailable);
			}

		};

		req.send('EditorId=' + EDITOR_ID);

	};

	exportToFile = () => {

		dial(
			'<p>Copiez-collez le contenu suivant dans un fichier et sauvegardez ce dernier avec l\'extension <i>.txt</i>.</p>' +
			'<p id="raw-data">' + JSON.stringify(getPost()) + '</p>' +
			'<p>Utilisez l\'option <i>Importer depuis fichier .txt</i> accessible depuis le menu pour recharger le contenu du fichier.</p>'
		);

	};

/* --- Core features --- */

	// Create HTML Elements Shortest Syntax (CHESS). Documentation : https://github.com/AwebsomeFr/chess
	chess = (object) => {

		var htmlElm = document.createElement(object.type);  
		
		if(object.text) {
			htmlElm.innerHTML = object.text;
		}
		
		if(object.attributes) {
			for(var attribute in object.attributes) {
				htmlElm.setAttribute(attribute, object.attributes[attribute]);
			}	
		}
		
		if(object.event) {
			htmlElm.addEventListener(object.event.type, object.event.callback);
		}

		if(object.children) {
			for(var i = 0, l = object.children.length; i < l; i++) {
				htmlElm.appendChild(chess(object.children[i]));
			}
		}
		
		return htmlElm;

	};

	runEditor = (inputId) => {

		let inputElm = document.getElementById(inputId);
		let outputElm = document.getElementById(inputId.replace('input', 'output')); 
		let content = inputElm.value.replace(/(<([^>]+)>)/ig, ''); // Striping source tags to prevent unexpected HTML.	

		if(inputElm.type === 'textarea') {
			
			for(let regex of REGEX) {
				content = content.replace(regex.desc, regex.output);
			}

		}

		outputElm.innerHTML = content;
		return content;

	};

	getPost = () => {
		
		let post = {
			title: document.getElementById('input-art-title').value,
			introduction: document.getElementById('input-art-introduction').value,
			sections: null
		};
		
		let sectionElms = document.getElementsByClassName('input-section');		
		
		if(sectionElms.length > 0) {

			post.sections = [];
			
			for(let sectionElm of sectionElms) {
				
				post.sections.push(
					{
						title: sectionElm.querySelector('input').value,
						content: sectionElm.querySelector('textarea').value,
					}
				);

			}

		}
		
		return post;
		
	};

	setPost = (post) => {
		
		document.getElementById('input-art-title').value = post.title;
		runEditor('input-art-title');

		document.getElementById('input-art-introduction').value = post.introduction;
		runEditor('input-art-introduction');

		if(post.sections) {
		
			for(let section of post.sections) {
				
				let currentMarker = marker;
				document.getElementById('bt-add-section').click();

				document.getElementById('input-sec-title-' + currentMarker).value = section.title;
				runEditor('input-sec-title-' + currentMarker);

				document.getElementById('input-sec-content-' + currentMarker).value = section.content;
				runEditor('input-sec-content-' + currentMarker);

			}

		}

	};

	resetPost = () => {

		// Reset main title.
		document.getElementById('input-art-title').value = '';
		runEditor('input-art-title');
		
		// Reset introduction.
		document.getElementById('input-art-introduction').value = '';
		runEditor('input-art-introduction');

		// For each section...
		for(let sectionElm of document.getElementsByClassName('input-section')) {
			// ...Remove output part.
			document.getElementById(sectionElm.id.replace('input', 'output')).remove();
			// ...Remove input part.
			sectionElm.remove();
		}

	};

	addSection = () => {

		let currentMarker = marker;

		document.getElementById('output').appendChild(
			chess(
				{
					type: 'section',
					attributes: {
						id: 'output-sec-' + marker
					},
					children: [
						{ 
							type: 'h2',
							attributes: {
								id: 'output-sec-title-' + marker
							}
						},
						{ 
							type: 'div',
							attributes: {
								id: 'output-sec-content-' + marker
							}
						}
					]
				}
			)
		);

		let inputSecElm = chess(
			{
				type: 'section',
				attributes: {
					class: 'input-section',
					id: 'input-sec-' + marker
				}
			}
		);

		for (let elmToCreate of [
			{ type: 'input', id: 'input-sec-title-' + marker, placeholder: 'Titre de section (h2)' },
			{ type: 'textarea', id: 'input-sec-content-' + marker, placeholder: 'Contenu' }

		]){
			inputSecElm.appendChild(
				chess(
					{
						type: 'label',
						text: elmToCreate.placeholder,
						attributes: {
							for: elmToCreate.id,
						}
					}
				)
			);
			inputSecElm.appendChild(
				chess(
					{
						type: elmToCreate.type,
						attributes: {
							id: elmToCreate.id,
							placeholder: elmToCreate.placeholder,
							type: 'text'
						},
						event: {
							type: 'input',
							callback () {
								runEditor(this.attributes.id.value);
							}
						}
					}
				)
			);

		}

		// Quick insertion for titles.
		for(let i = 3; i <= 6; i++) {
			inputSecElm.appendChild(
				chess(
					{
						type: 'button',
						text: 'h' + i,
						attributes: {
							title: 'Insérer sous-titre de niveau ' + i
						},
						event: {
							type: 'click',
							callback () {
								formatContent(inputSecElm.querySelector('textarea'), 'h' + i);
							}
						}
					}
				)
			);
		}

		// Quick insertion for strong, em, ol, ul, a, img, figure.
		for(let elmToCreate of [
			{ text: 'str', title: 'Insérer texte important', type: 'strong' },
			{ text: 'em', title: 'Insérer texte emphasique', type: 'em' },
			{ text: 'ol', title: 'Insérer liste ordonnée', type: 'ol' },
			{ text: 'ul', title: 'Insérer liste non ordonnée', type: 'ul' },
			{ text: 'a', title: 'Insérer lien hypertexte', type: 'a' },
			{ text: 'img', title: 'Insérer image', type: 'img' },
			{ text: 'fig', title: 'Insérer figure', type: 'figure' }
		]) {
			inputSecElm.appendChild(
				chess(
					{
						type: 'button',
						text: elmToCreate.text,
						attributes: {
							title: elmToCreate.title
						},
						event: {
							type: 'click',
							callback () {
								formatContent(inputSecElm.querySelector('textarea'), elmToCreate.type);
							}
						}
					}
				)
			);
		}

		// Del a section.
		inputSecElm.appendChild(
			chess(
				{
					type: 'button',
					text: 'X',
					attributes: {
						class: 'danger',
						title: 'Supprimer la section'
					},
					event: {
						type: 'click',
						callback () {
							if(confirm('Le contenu de cette section sera perdu.'))
							{
								document.getElementById('input-sec-' + currentMarker).remove();
								document.getElementById('output-sec-' + currentMarker).remove();
							}
						}
					}
				}
			)
		);

		document.getElementById('input').insertBefore(inputSecElm, document.getElementById('bt-add-section'));
		// Scroll down to the new section.
		document.location.replace(document.location.pathname + '#input-sec-title-' + marker);
		marker++;

	};

	formatContent = (targetElm, tag) => {

		let highlightedContent = targetElm.value.substring(targetElm.selectionStart, targetElm.selectionEnd);
		let formatedContent;
		switch(tag) {
			case 'h3':
			case 'h4':
			case 'h5':
			case 'h6':
				let level = tag.substring(1,2);
				formatedContent = 
					level + '(' +
					(highlightedContent !== '' ? highlightedContent : prompt('Titre de niveau ' + level + ' :')) +
					')\n';
				break;
			case 'strong':
				formatedContent = 
					's(' +
					(highlightedContent !== '' ? highlightedContent : prompt('Texte "important" :')) +
					') ';
				break;
			case 'em':
				formatedContent = 
					'e(' +
					(highlightedContent !== '' ? highlightedContent : prompt('Texte "emphasique" :')) +
					') ';
				break;
			case 'a':
				formatedContent =
					'a(' +
					prompt('Libellé du lien hypertexte :') +
					'(' + (prompt('Url du lien hypertexte.\nExemple (sans guillemets) : "https://exemple.fr".')) +
					')) ';
				break;
			case 'ol':
			case 'ul':
				let added;
				let mess = 'Ajouter à la liste :\n(Terminé ? Annuler pour valider la liste)\n\n'; 
				formatedContent = tag === 'ol' ? 'o(' : 'u('; // Prefix the parenthesis to identify the sorting method
				while(added = prompt(mess)) {
					formatedContent += '((' + added + '))';
					mess += '"' + added + '"\n';
				}
				formatedContent += ')';
				break;
			case 'img':
				formatedContent =
					'i(' +
					prompt('Description alternative de l\'image :') +
					'(' + (prompt('Url à laquelle l\'image est disponible.\nExemple (sans guillemets) : "https://exemple.fr/image.png".')) +
					')) ';
				break;
			case 'figure':
				formatedContent =
					'f(' +
					prompt('Légende de l\'image :') +
					'(' + prompt('Description alternative à l\'image :') +
					'(' + (prompt('Url à laquelle l\'image est disponible.\nExemple (sans guillemets) : "https://exemple.fr/image.png".')) +
					'))) ';
				break;
		}
		// Prefix and suffix the formatted data of the rest of the content.
		targetElm.value = 
			targetElm.value.substring(0, targetElm.selectionStart) +
			formatedContent +
			targetElm.value.substring(targetElm.selectionEnd);
		// Give focus to the user.
		runEditor(targetElm.id);
		targetElm.focus();

	};