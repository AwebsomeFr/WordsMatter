"use strict";

// These variables should not exist.
let marker = 0;
let varTemp;

/* --- User Interface --- */

	const setViewportHeight = () => UI.main.style.height = window.innerHeight + 'px';

	const toggleMenu = (boolean) => {
		boolean ?
			UI.nav.classList.add('visible'):
			UI.nav.classList.remove('visible')
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
		
		let options = '';

		for(let height of [
			['0.75fr 0.25fr', LAB.bt.advReading], 
			['0.5fr 0.5fr', LAB.bt.balanced], 
			['0.25fr 1.5fr', LAB.bt.advWriting]
		]) {
			options += `<button onclick="UI.main.style.gridTemplateRows = 'auto ${height[0]}', dial()">${height[1]}</button>`;
		}

		dial(
			`<p>${LAB.dial.setHeight}</p>
			${options}`
		);

	};

	const setWidth = () => {

		let options = '';

		for(let width of ['360px', '540px', '768px', '1024px', '1280px', '100%']) {
			options += `<button onclick="UI.main.style.width = '${width}', dial()">${width}</button>`;
		}

		dial(
			`<p>${LAB.dial.setWidth}</p>
			${options}`
		);

	};

	const onHelp = () => window.open('./help.html');

	const dial = (mess) => {
		
		if(mess != undefined) {
			UI.dial.querySelector('div').innerHTML = mess;
			UI.main.style.opacity = '0.1';
			UI.dial.classList.add('visible');
		}
		
		else {
			UI.dial.querySelector('div').innerHTML = '';
			UI.main.style.opacity = '1';
			UI.dial.classList.remove('visible');
		}

		toggleMenu(false);

	};

	const setNotice = (notice, state) => {
		dial();
		UI.notice.setAttribute('class', '');
		UI.notice.textContent = notice;
		UI.notice.setAttribute('class', 'visible ' + state);
		setTimeout(() => {
			UI.notice.setAttribute('class', '');
		}, 2500);
	}
	const badNotice = (notice) => setNotice(notice, 'bad');
	const goodNotice = (notice) => setNotice(notice, 'good');

/* --- Web storage API --- */

	const saveIntoLocalStorage = () => {

		let datasContent = JSON.stringify(getPost());

		if(localStorage) {			
			
			localStorage.setItem('post', datasContent);
			
			if(localStorage.getItem('post') === datasContent) {
				goodNotice(LAB.notice.wsSave1);
			}
			
			else {
				badNotice(LAB.notice.wsSave0);
			}
		
		}

		else {
			badNotice(LAB.notice.wsX);
		}

	};

	const importFromLocalStorage = (post) => {

		resetPost();
		setPost(post);
		goodNotice(LAB.notice.load1);

	};

	const deleteFromLocalStorage = (validation = false) => {

		// Web Storage available ?
		if(localStorage) {

			// Is there something to delete ?
			if(localStorage.getItem('post')) {

				// User confirmation ?
				if(validation) {

					// Proceed
					localStorage.removeItem('post');

					// Success ?
					if(!localStorage.getItem('post')) {
						resetPost();
						goodNotice(LAB.notice.wsDel1);
					}

					else {
						badNotice(LAB.notice.wsDel0);
					}

				}

				else {


					dial(
						`<p> ${LAB.dial.confDelWs}</p> 
						<button class="danger" onclick="deleteFromLocalStorage(true)">${LAB.bt.confirm}</button>`	
					);
				
				
				}

			}

			else {
				badNotice(LAB.notice.wsDelY);
			}

		}

		else {
			badNotice(LAB.notice.wsX);
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
						dial(
							`<p>${LAB.dial.confPushServ}</p>
							<button onclick="pushPost(true)">${LAB.bt.confirm}</button>`,						
						);
					}

					// Existing post ? Ask confirm update.
					else if(req.responseText === 'update') {
						dial(
							`<p>${LAB.dial.confUpdateServ}</p>
							<button onclick="pushPost(true)">${LAB.bt.update}</button>`,
						);
					}

					// Success ?
					else if(req.responseText === 'success') {
						goodNotice(LAB.notice.serv1);
					}

					else {
						badNotice(LAB.notice.serv0);
					}
				
				}

				else {
					badNotice(LAB.notice.servX);
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
			badNotice(LAB.notice.servTitleY);
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
						goodNotice(LAB.notice.servDel1); 
					}

					else {
						badNotice(LAB.notice.servDel0); 
					}

				}

			};

			// Proceed.
			req.send('editorId=' + EDITOR_ID + '&dirName=' + dirName);

		}

		else {

			varTemp = dirName;
			dial(
				`<p>${LAB.dial.confDelServ}</p>
				<button class="danger" onclick="deleteFromServer(true, varTemp)">${LAB.bt.confirm}</button>`
			); 

		}

	};

	const importFromFile = (file) => {

		let reader = new FileReader();
		
		reader.onloadend = (e) => {

			resetPost();
			setPost(JSON.parse(e.target.result));
			dial(LAB.dial.load1);

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
					`<p>${LAB.dial.editPost}</p>
					<ul id="posts-list">`;
					for(let file of files) {
						message += `<li >
							<button
								class="danger"
								onclick="deleteFromServer(false, \'${file.dir}\')"
								title="${LAB.bt.delete}">
								X
							</button>
							<button
								class="${file.draft ? 'draft' : 'release'}" 
								onclick="importFromServer(\'${file.dir}\')"
								title="${LAB.bt.open}"
								value="${file.dir}">
								${file.title}
							</button>
						</li>`;
					}
					message += '</ul>';
					
					dial(message);
			
				}

				else {
					badNotice(LAB.notice.servContentY);
				}

			}

			else {
				badNotice(LAB.notice.servX);
			}

		};

		req.send('editorId=' + EDITOR_ID);

	};

	const exportToFile = () => {

		dial(
			`<p>${LAB.dial.exportPost}</p>
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

		UI.output.appendChild(
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
			{ type: 'textarea', id: 'input-sec-content-' + marker, placeholder: LAB.input.secContent }

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
						title: LAB.bt.addHx + i
					},
					events: [
						{
							type: 'click',
							function: () => formatContent(inputSecElm.querySelector('textarea'), { title: LAB.bt.addHx + i, tag: 'h' + i })
						}
					]
				})
			);
		}

		// Quick insertion for strong, em, ol, ul, a, img, figure.
		for(let elmToCreate of [
			{ text: 'str', title: LAB.bt.addStr, tag: 'strong' },
			{ text: 'em', title: LAB.bt.addEm, tag: 'em' },
			{ text: 'ol', title: LAB.bt.addOl, tag: 'ol' },
			{ text: 'ul', title: LAB.bt.addUl, tag: 'ul' },
			{ text: 'a', title: LAB.bt.addA, tag: 'a' },
			{ text: 'img', title: LAB.bt.addImg, tag: 'img' },
			{ text: 'fig', title: LAB.bt.addFig, tag: 'figure' }
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
					title: LAB.bt.delSec
				},
				events: [
					{
						type: 'click',
						function: () => {
							if(confirm(LAB.dial.confDelSec))
								{
									document.getElementById('input-sec-' + currentMarker).remove();
									document.getElementById('output-sec-' + currentMarker).remove();
								}

						}
					}
				]
			})
	);

		UI.input.insertBefore(inputSecElm, document.getElementById('bt-add-section'));
		// Scroll down to the new section.
		document.location.replace(document.location.pathname + '#input-sec-title-' + marker);
		marker++;

	};

	const formatContent = (targetElm, object) => {

		// Form parts.
		let formElm = {
			header: '<form><h2>' + object.title + '</h2>',
			body : '', // Declared into the next switch.
			footer: `<button type="submit">${LAB.bt.confirm}</button></form`	
		};

		// Case 1 : Input comes from highlighted text.
		// Case 2 : Input will come from modal.
		let input = targetElm.value.substring(targetElm.selectionStart, targetElm.selectionEnd);
		let urlRegex = /^https?/i;

		// Body of the form.
		switch(object.tag) {

			case 'h3': case 'h4': case 'h5': case 'h6':
				formElm.body =
					`<label for="h-value">${LAB.input.txtToTransf}</label>
					<input id="h-value" type="text" value="${input}" required />`;
				break;

			case 'strong': case 'em':
				formElm.body =
					`<label for="inline-value">${LAB.input.txtToTransf}</label>
					<input id="inline-value" type="text" value="${input}" required />`
				break;

			case 'ol': case 'ul':
				formElm.body =
					`<label for="list-values">${LAB.input.list}</label>
					<textarea id="list-values" required>${input}</textarea>`
				break;

			case 'a':
				formElm.body =
					`<label for="a-value">${LAB.input.url}</label>
					<input id="a-value" type="text" placeholder="https://example.com" value="${input.match(urlRegex) != null ? input : ''}" required />
					<label for="a-label">${LAB.input.lab}</label>
					<input id="a-label" type="text" value="${input.match(urlRegex) != null ? '' : input}" required />`;
				break;

			case 'img':
				formElm.body =
					`<label for="img-src">${LAB.input.url}</label>
					<input id="img-src" type="text" placeholder="https://example.com/image.png" value="${input.match(urlRegex) != null ? input : ''}" required />
					<label for="img-alt">${LAB.input.imgAlt}</label>
					<input id="img-alt" type="text" value="${input.match(urlRegex) != null ? '' : input}" required />`;
				break;

			case 'figure':
				formElm.body =
					`<label for="fig-src">${LAB.input.url}</label>
					<input id="fig-src" type="text" placeholder="https://example.com/image.png" value="${input.match(urlRegex) != null ? input : ''}" required />
					<label for="fig-legend">${LAB.input.imgLeg}</label>
					<input id="fig-legend" type="text" value="${input.match(urlRegex) != null ? '' : input}" required />
					<label for="fig-alt">${LAB.input.imgAlt}</label>
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