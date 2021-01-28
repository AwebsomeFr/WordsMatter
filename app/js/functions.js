"use strict";

// These variables should not exist.
let marker = 0;
let varTemp;

/* --- User Interface --- */

	const setViewportHeight = () => document.querySelector('main').style.height = window.innerHeight + 'px';

	const toggleMenu = (boolean) => {
		boolean ?
			document.getElementById('nav-container').classList.remove('hidden') :
			document.getElementById('nav-container').classList.add('hidden')
	};

	const toDarkTheme = () => {	
		document.body.classList.add('dark');
		localStorage.setItem('theme', 'dark');
	}

	const toLightTheme = () => {
		document.body.classList.remove('dark');
		localStorage.setItem('theme', 'light');
	}

	const toggleTheme = () => {
		document.body.classList.contains('dark') ?
			toLightTheme():
			toDarkTheme();
	}

	const setHeight = () => {
		dial(
			`<p>Déplacez le curseur pour ajuster la répartition verticale entre les deux zones.</p>
			<input 
				max="4"
				min="0.25" 
				oninput="document.querySelector('main').style.gridTemplateRows = 'auto 1fr ' + this.value + 'fr'" 
				step="0.25" 
				type="range" 
			/>`
		);
	};

	const setWidth = () => {
		dial(
			`<p>Déplacez le curseur pour ajuster la largeur de travail utile.</p>
			<input
				 max="100"
				 min="25"
				 oninput="document.querySelector('main').style.width = this.value + '%'"
				 step="5"
				 type="range"
			/>`
		);
	};

	const onHelp = () => window.open('./help.html');

	const dial = (mess) => {
		
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

	const saveIntoLocalStorage = () => {

		let datasContent = JSON.stringify(getPost());

		if(localStorage) {			
			localStorage.setItem(post, datasContent);
			dial(
				localStorage.getItem(post) === datasContent ?	
				LAB.dial.wsSaveSucc :
				LAB.dial.wsSaveFail
			);
		}

		else {
			dial(LAB.dial.wsUnavailable);
		}

	};

	const importFromLocalStorage = (post) => {

		resetPost();
		setPost(post);
		dial(LAB.dial.loadSucc);

	};

	const deleteFromLocalStorage = (validation = false) => {

		// Web Storage available ?
		if(localStorage) {

			// Is there something to delete ?
			if(localStorage.getItem(post)) {

				// User confirmation ?
				if(validation) {

					// Proceed
					localStorage.removeItem(post);

					// Success ?
					if(!localStorage.getItem(post)) {
						resetPost();
						dial(LAB.dial.wsDelSucc);
					}

					else {
						dial(LAB.dial.wsDelFail);
					}

				}

				else {
					dial(LAB.dial.wsDelAskConf);
				}

			}

			else {
				dial(LAB.dial.wsDelEmpty);
			}

		}

		else {
			dial(LAB.dial.wsUnavailable);
		}

	};

/* --- Server --- */

	const createRequest = (url) => {

		let req = new XMLHttpRequest();
		req.open('POST', url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		return req;
		
	};

	const pushPost = (validation = false) => {

		// Has a title been specified ?
		if(document.getElementById('output-art-title').textContent.trim() != '') { 

			let req = createRequest(API_URL + 'push.php');
				
			req.onload = () => {

				// Is the server available ?
				if(req.status === 200) {

					// New post ? Ask confirm push.
					if(req.responseText === 'release') {
						dial(LAB.dial.servConfNew);
					}

					// Existing post ? Ask confirm update.
					else if(req.responseText === 'update') {
						dial(LAB.dial.servConfUpdate);
					}

					// Success ?
					else if(req.responseText === 'success') {
						dial(LAB.dial.servSucc);
					}

					else {
						dial(LAB.dial.servFail);
					}
				
				}

				else {
					dial(LAB.dial.servUnavailable);
				}

			};

			req.send('post=' + 
				encodeURI( // Prevent unexpected php conversions when datas contain the % character (like %E, %F8, ...).
					JSON.stringify(
						getPost()
					)
				) 
				+ '&editorId=' + EDITOR_ID 
				+ '&validation=' + validation
			);

		}

		else {
			dial(LAB.dial.servTitleEmpty);
		}

	};

	const deleteFromServer = (validation = false, dirName) => {
	
		// User confirmation ?
		if(validation) {

			let req = createRequest(API_URL + 'delete.php');
			req.onload = () => {

				// Is the server available ?
				if(req.status === 200) {

					// Success ?
					if(req.responseText === 'success') {
						dial(LAB.dial.servDelSucc); 
					}

					else {
						dial(LAB.dial.servDelFail); 
					}

				}

			};

			// Proceed.
			req.send('editorId=' + EDITOR_ID + '&dirName=' + dirName);

		}

		else {

			// Note for dev : is there a way to avoid this global ? 
			varTemp = dirName;
			dial(LAB.dial.servConfDel); 

		}

	};

	const importFromFile = (file) => {

		let reader = new FileReader();
		
		reader.onloadend = (e) => {

			resetPost();
			setPost(JSON.parse(e.target.result));
			dial(LAB.dial.loadSucc);

			};

		reader.readAsText(file);

	};

	const importFromServer = (dirName) => {

		let req = createRequest(API_URL + 'open.php');
		req.onload = () => {

			if(req.status === 200) {

				importFromLocalStorage(JSON.parse(req.responseText));

			}

		};

		req.send('editorId=' + EDITOR_ID + '&dirName=' + dirName);

	};

	const getFiles = () => {

		let req = createRequest(API_URL + 'get.php');
		req.onload = () => {

			if(req.status === 200) {

				let files = JSON.parse(req.responseText);
				
				if(files.length > 0) {

					let message = 
					`<p>Quel post souhaitez-vous modifier depuis le blog ?</p>
					<ul id="posts-list">`;
					for(let file of files) {
						message += `<li >
							<button
								class="danger"
								onclick="deleteFromServer(false, this.nextSibling.value)"
								title="Supprimer l'élément du blog">
								X
							</button>
							<button
								class="${file.draft ? 'draft' : 'release'}" 
								onclick="importFromServer(this.value)"
								title="Ouvrir cet élément pour édition"
								value="${file.dir}">
								${file.title}
							</button>
						</li>`;
					}
					message += '</ul>';
					
					dial(message);
			
				}

				else {
					dial(LAB.dial.servEmpty);
				}

			}

			else {
				dial(LAB.dial.servUnavailable);
			}

		};

		req.send('editorId=' + EDITOR_ID);

	};

	const exportToFile = () => {

		dial(
			`<p>Copiez-collez le contenu suivant dans un fichier et sauvegardez ce dernier avec l'extension <i>.txt</i>. Utilisez l'option <i>Importer depuis fichier .txt</i> accessible depuis le menu pour recharger le contenu du fichier.</p>
			<p id="raw-data">${JSON.stringify(getPost())}</p>`
		);

	};

/* --- Core features --- */

	function chess(obj) { // = Create HTML Elements Short Syntax.

		let elm = document.createElement(obj.type); // REQUIRED. Define <tag> type.

		// OPTIONAL : define textual or HTML content. Only one is permitted.	
		if(obj.text) {
			elm.textContent = obj.text;
		}
		else if(obj.html) {
			elm.innerHTML = obj.html;
		}

		if(obj.attributes) { // OPTIONAL : define attributes (id, class, title, basic events...).
			for(let attribute in obj.attributes) {
				elm.setAttribute(attribute, obj.attributes[attribute]);
			}
		}
		
		if(obj.events) { // OPTIONAL : define advanced events.
			for(let event of obj.events) {
				elm.addEventListener(event.type, event.function);
			}
		}

		if(obj.children) { // OPTIONAL : append children.	
			for(let child of obj.children) {
				elm.appendChild(chess(child));
			}
		}

		return elm;

	}

	const runEditor = (inputId) => {

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

	const getPost = () => {
		
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

	const setPost = (post) => {
		
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

	const resetPost = () => {

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

	const addSection = () => {

		let currentMarker = marker;

		document.getElementById('output').appendChild(
			chess({
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
			})
		);

		let inputSecElm = chess({
			type: 'section',
			attributes: {
				class: 'input-section',
				id: 'input-sec-' + marker
			}
		});

		for (let elmToCreate of [
			{ type: 'input', id: 'input-sec-title-' + marker, placeholder: LAB.input.h2 },
			{ type: 'textarea', id: 'input-sec-content-' + marker, placeholder: LAB.input.content }

		]){
			inputSecElm.appendChild(
				chess({
					type: 'label',
					text: elmToCreate.placeholder,
					attributes: {
						for: elmToCreate.id,
					}
				})
			);
			inputSecElm.appendChild(
				chess(
					{
						type: elmToCreate.type,
						attributes: {
							id: elmToCreate.id,
							oninput: 'runEditor(this.attributes.id.value)',
							placeholder: elmToCreate.placeholder,
							type: 'text',
						},
						
					}
				)
			);

		}

		// Quick insertion for titles.
		for(let i = 3; i <= 6; i++) {
			inputSecElm.appendChild(
				chess({
					type: 'button',
					text: 'h' + i,
					attributes: {
						title: LAB.bt.addHeader + i
					},
					events: [
						{
							type: 'click',
							function: () => formatContent(inputSecElm.querySelector('textarea'), { title: LAB.bt.addHeader + i, tag: 'h' + i })
						}
					]
				})
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
				chess({
					type: 'button',
					text: elmToCreate.text,
					attributes: {
						title: elmToCreate.title
					},
					events: [
						{
							type: 'click',
							function: () => formatContent(inputSecElm.querySelector('textarea'), elmToCreate)
						}
					]
				})
			);
		}

		// Del a section.
		inputSecElm.appendChild(
			chess({
				type: 'button',
				text: 'X',
				attributes: {
					class: 'danger',
					title: LAB.bt.delSection
				},
				events: [
					{
						type: 'click',
						function: () => {
							if(confirm(LAB.dial.delSection))
								{
									document.getElementById('input-sec-' + currentMarker).remove();
									document.getElementById('output-sec-' + currentMarker).remove();
								}

						}
					}
				]
			})
	);

		document.getElementById('input').insertBefore(inputSecElm, document.getElementById('bt-add-section'));
		// Scroll down to the new section.
		document.location.replace(document.location.pathname + '#input-sec-title-' + marker);
		marker++;

	};

	const formatContent = (targetElm, object) => {

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
					`<label for="h-value">Texte à transformer :</label>
					<input id="h-value" type="text" value="${input}" required />`;
				break;

			case 'strong': case 'em':
				formElm.body =
					`<label for="inline-value">Texte à transformer :</label>
					<input id="inline-value" type="text" value="${input}" required />`
				break;

			case 'ol': case 'ul':
				formElm.body =
					`<label for="list-values">Eléments composant la liste (délimiteur : %%) :</label>
					<textarea id="list-values" placeholder="Premier élément %% Deuxième élément %% ..." required>${input}</textarea>`
				break;

			case 'a':
				formElm.body =
					`<label for="a-value">URL cible :</label>
					<input id="a-value" type="text" placeholder="https://exemple.fr" value="${input.match(urlRegex) != null ? input : ''}" required />
					<label for="a-label">Libellé explicite du lien :</label>
					<input id="a-label" type="text" value="${input.match(urlRegex) != null ? '' : input}" required />`;
				break;

			case 'img':
				formElm.body =
					`<label for="img-src">URL à laquelle l'image est accessible :</label>
					<input id="img-src" type="text" placeholder="https://exemple.fr/image.png" value="${input.match(urlRegex) != null ? input : ''}" required />
					<label for="img-alt">Description (alternative) :</label>
					<input id="img-alt" type="text" value="${input.match(urlRegex) != null ? '' : input}" required />`;
				break;

			case 'figure':
				formElm.body =
					`<label for="fig-src">URL à laquelle l'image est accessible :</label>
					<input id="fig-src" type="text" placeholder="https://exemple.fr/image.png" value="${input.match(urlRegex) != null ? input : ''}" required />
					<label for="fig-legend">Légende de l'image :</label>
					<input id="fig-legend" type="text" value="${input.match(urlRegex) != null ? '' : input}" required />
					<label for="fig-alt">Description (alternative) :</label>
					<input id="fig-alt" type="text" required />`;
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