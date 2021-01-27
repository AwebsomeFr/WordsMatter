/* --- User Interface --- */

	setViewportHeight = () => {

		document.querySelector('main').style.height = window.innerHeight + 'px';
		
	}

	toggleMenu = (boolean) => {

		boolean ?
			document.getElementById('nav-container').classList.remove('hidden') :
			document.getElementById('nav-container').classList.add('hidden');
		
	};

	toggleTheme = () => {

		document.body.classList.toggle('light-theme');

	};

	setHeight = () => {

		dial(
			'<p>Déplacez le curseur pour ajuster la répartition verticale entre les deux zones.</p>' +
			'<input ' +
				 'max="4"' +
				 'min="0.25"' +
				 'oninput="document.querySelector(\'main\').style.gridTemplateRows = \'auto 1fr \' + this.value + \'fr\'" ' +
				 'step="0.25"' +
				 'type="range" />'
		);

	};

	setWidth = () => {

		dial(
			'<p>Déplacez le curseur pour ajuster la largeur de travail utile.</p>' +
			'<input ' +
				 'max="100"' +
				 'min="25"' +
				 'oninput="document.querySelector(\'main\').style.width = this.value + \'%\'" ' +
				 'step="5"' +
				 'type="range" />'
		);

	};

	onHelp = () => {

		window.open('./help.html');

	}; 

	dial = (mess) => {
		
		let dialogElm = document.getElementById('dial');
		
		if(mess != undefined) {
			dialogElm.querySelector('div').innerHTML = mess;
			document.querySelector('main').style.opacity = '0.1';
			dialogElm.classList.remove('hidden');
		}

		else {
			dialogElm.querySelector('div').innerHTML = '';
			document.querySelector('main').style.opacity = '1';
			dialogElm.classList.add('hidden');
		}

		toggleMenu(false);

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

	pushPost = (validation = false) => {

		// Has a title been specified ?
		if(document.getElementById('output-art-title').textContent.trim() != '') { 

			let req = createRequest(API_URL + 'push.php');
				
			req.onload = () => {

				// Is the server available ?
				if(req.status === 200) {

					// New post ? Ask confirm push.
					if(req.responseText === 'release') {
						dial(MESS.servConfNew);
					}

					// Existing post ? Ask confirm update.
					else if(req.responseText === 'update') {
						dial(MESS.servConfUpdate);
					}

					// Success ?
					else if(req.responseText === 'success') {
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

			req.send('post=' + 
				encodeURI( // Prevent unexpected php conversions when datas contain the % character (like %E, %F8, ...).
					JSON.stringify(
						getPost()
					)
				) 
				+ '&EditorId=' + EDITOR_ID 
				+ '&validation=' + validation
			);

		}

		else {
			dial(MESS.servTitleEmpty);
		}

	};

	deleteFromServer = (validation = false, dirName) => {
	
		// User confirmation ?
		if(validation) {

			let req = createRequest(API_URL + 'delete.php');
			req.onload = () => {

				// Is the server available ?
				if(req.status === 200) {

					// Success ?
					if(req.responseText === 'success') {
						dial(MESS.servDelSucc); 
					}

					else {
						dial(MESS.servDelFail); 
					}

				}

			};

			// Proceed.
			req.send('EditorId=' + EDITOR_ID + '&dirName=' + dirName);

		}

		else {

			// Note for dev : is there a way to avoid this global ? 
			varTemp = dirName;
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

	importFromServer = (dirName) => {

		let req = createRequest(API_URL + 'open.php');
		req.onload = () => {

			if(req.status === 200) {

				importFromLocalStorage(JSON.parse(req.responseText));

			}

		};

		req.send('EditorId=' + EDITOR_ID + '&dirName=' + dirName);

	};

	getFiles = () => {

		let req = createRequest(API_URL + 'get.php');
		req.onload = () => {

			if(req.status === 200) {

				let files = JSON.parse(req.responseText);
				
				if(files.length > 0) {
					let message = '<p>Quel post souhaitez-vous modifier depuis le blog ?</p><ul id="posts-list">';
					for(let file of files) {
						message += '<li >' +
							'<button ' +
								'class="danger" '+
								'onclick="deleteFromServer(false, this.nextSibling.value)" ' +
								'title="Supprimer l\'élément du blog">' +
								'X' +
							'</button>' +
							'<button ' + 
								'class="' + (file.draft ? 'draft' : 'release') + '" ' + 
								'onclick="importFromServer(this.value)" ' +
								'title="Ouvrir cet élément pour édition" ' +
								'value="' + file.dir + '">' + // WordsMatter uses dir behind the scene...
								file.title + // ...But user sees title.
							'</button>' +
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

		let htmlElm = document.createElement(object.type);  
		
		if(object.text) {
			htmlElm.innerHTML = object.text;
		}
		
		if(object.attributes) {
			for(let attribute in object.attributes) {
				htmlElm.setAttribute(attribute, object.attributes[attribute]);
			}	
		}
		
		if(object.event) {
			htmlElm.addEventListener(object.event.type, object.event.callback);
		}

		if(object.children) {
			for(let i = 0, l = object.children.length; i < l; i++) {
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
								formatContent(inputSecElm.querySelector('textarea'), 	{ title: 'Insérer un sous-titre de niveau ' + i, tag: 'h' + i });
							}
						}
					}
				)
			);
		}

		// Quick insertion for strong, em, ol, ul, a, img, figure.
		for(let elmToCreate of [
			{ text: 'str', title: 'Insérer du texte important', tag: 'strong' },
			{ text: 'em', title: 'Insérer du texte emphasique', tag: 'em' },
			{ text: 'ol', title: 'Insérer une liste ordonnée', tag: 'ol' },
			{ text: 'ul', title: 'Insérer une liste non ordonnée', tag: 'ul' },
			{ text: 'a', title: 'Insérer un lien hypertexte', tag: 'a' },
			{ text: 'img', title: 'Insérer une image', tag: 'img' },
			{ text: 'fig', title: 'Insérer une figure', tag: 'figure' }
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
								formatContent(inputSecElm.querySelector('textarea'), elmToCreate);
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

	formatContent = (targetElm, object) => {

		// Form parts.
		let formElm = {
			header: '<form><h2>' + object.title + '</h2>',
			body : '', // Declared into the next switch.
			footer: 	'<button type="submit">Valider</button></form>'	
		};

		// Case 1 : Input comes from highlighted text.
		// Case 2 : Input will come from modal.
		let input = targetElm.value.substring(targetElm.selectionStart, targetElm.selectionEnd);
		let urlRegex = /^https?/i;

		// Body of the form.
		switch(object.tag) {

			case 'h3': case 'h4': case 'h5': case 'h6':
				formElm.body =
					'<label for="h-value">Texte à transformer :</label>' +
					'<input id="h-value" type="text" value="' + input + '" required />';
				break;

			case 'strong': case 'em':
				formElm.body =
					'<label for="inline-value">Texte à transformer :</label>' +
					'<input id="inline-value" type="text" value="' + input + '" required />'
				break;

			case 'ol': case 'ul':
				formElm.body =
					'<label for="list-values">Eléments composant la liste (délimiteur : %%) :</label>' +
					'<textarea id="list-values" placeholder="Premier élément %% Deuxième élément %% ..." required>' + input + '</textarea>'
				break;

			case 'a':
				formElm.body =
					'<label for="a-value">URL cible :</label>' +
					'<input id="a-value" type="text" placeholder="https://exemple.fr" value="' + (input.match(urlRegex) != null ? input : '') + '" required />' +
					'<label for="a-label">Libellé explicite du lien :</label>' +
					'<input id="a-label" type="text" value="' + (input.match(urlRegex) != null ? '' : input) + '" required />';
				break;

			case 'img':
				formElm.body =
					'<label for="img-src">URL à laquelle l\'image est accessible :</label>' +
					'<input id="img-src" type="text" placeholder="https://exemple.fr/image.png" value="' + (input.match(urlRegex) != null ? input : '') + '" required />' +
					'<label for="img-alt">Description (alternative) :</label>' +
					'<input id="img-alt" type="text" value="' + (input.match(urlRegex) != null ? '' : input) + '" required />';
				break;

			case 'figure':
				formElm.body =
					'<label for="fig-src">URL à laquelle l\'image est accessible :</label>' +
					'<input id="fig-src" type="text" placeholder="https://exemple.fr/image.png" value="' + (input.match(urlRegex) != null ? input : '') + '" required />' +
					'<label for="fig-legend">Légende de l\'image :</label>' +
					'<input id="fig-legend" type="text" value="' + (input.match(urlRegex) != null ? '' : input) + '" required />' +
					'<label for="fig-alt">Description (alternative) :</label>' +
					'<input id="fig-alt" type="text" required />';
				break;

		};

		dial(
			formElm.header +
			formElm.body +
			formElm.footer
		);

		// Give the focus on the first input or textarea available.
		if(object.tag === 'ol' || object.tag === 'ul') {
			document.querySelector('#dial textarea').focus()
		}
		else {
			document.querySelector('#dial input').focus();
		}

		// Build the corresponding output when the form is submitted.
		document.querySelector('#dial form').onsubmit = (e) => {

			let output;

			switch(object.tag) {

				case 'h3': case 'h4': case 'h5': case 'h6':
					output = '\n' + object.tag.substring(1,2) + '(' + e.target.elements[0].value + ')\n';
					break;

				case 'strong': 
					output = 's(' + e.target.elements[0].value + ')';
					break;

				case 'em':
					output = 'e(' + e.target.elements[0].value + ')';
					break;

				case 'ol': case 'ul':
				 	let mod = object.tag.substring(0,1); // Is modifier is "o" or "u" ?
					output = mod + '(';
					for(let elm of e.target.elements[0].value.split('%%')) { 
						if(elm.trim() !== '') {
							output += '((' + elm.trim() + '))'; // Append each elm separatly IF not empty.
						}
					}
					output !== mod + '(' ? output += ')' : output = ''; // Close only if there at least is one valid value, else reinitialize.
				 	break;

				case 'a':
					output = 'a(' + e.target.elements[1].value + '(' + e.target.elements[0].value + '))';
					break;

				case 'img':
					output = 'i(' + e.target.elements[1].value + '(' + e.target.elements[0].value + '))';
					break;

				case 'figure':
					output = 'f(' + e.target.elements[1].value + '(' + e.target.elements[2].value + '(' + e.target.elements[0].value + ')))';
					break;

			};

			// Replace input by output.
			targetElm.value = 
				targetElm.value.substring(0, targetElm.selectionStart) +
				output + 
				targetElm.value.substring(targetElm.selectionEnd);

			// Actualize.
			e.preventDefault();
			runEditor(targetElm.id);
			targetElm.focus();
			dial();

		};

	};