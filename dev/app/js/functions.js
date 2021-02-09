"use strict";

// These variables should not exist.
let marker = 0;

/* --- User Interface --- */

	const setViewportHeight = () => UI.main.style.height = window.innerHeight + 'px';

	const savePref = (name, value) => {
		if(localStorage) {
			localStorage.setItem(name, value);
		}
	};

	const toggleMenu = (boolean) => {
		boolean ?
			UI.nav.classList.add('visible'):
			UI.nav.classList.remove('visible')
	};

	const toDarkTheme = () => {	
		document.body.classList.add('dark');
		savePref('color-scheme', 'dark');
	}

	const toLightTheme = () => {
		document.body.classList.remove('dark');
		savePref('color-scheme', 'light');
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
			`<h2>${LAB.bt.setHeight}</h2>
			<p>${LAB.dial.setHeight}</p>
			${options}`
		);

	};

	const setWidth = () => {

		let options = '';

		for(let width of [360, 540, 768, 1024, 1280, 'Max']) {
			options += 
				`<button onclick="
					UI.main.setAttribute('class', 'mw${width}'),
					savePref('max-width', 'mw${width}'),
					dial()">
					${width}${isNaN(width) ? '': 'px'}
				</button>`;
		}

		dial(
			`<h2>${LAB.bt.setWidth}</h2>
			<p>${LAB.dial.setWidth}</p>
			${options}`
		);

	};

	const openLink = (link) => window.open(link);

	const dial = (mess) => {
		
		if(mess != undefined) {
			
			UI.dial.querySelector('div').innerHTML = mess;
			UI.dial.classList.add('visible');

			// Add a class to the latest button for focus trap.
			let bts = UI.dial.getElementsByTagName('button');
			bts[bts.length - 1].classList.add('dial-trap-last');
			
			// Give focus to the first useful button (sometimes, focus is given to the first input).
			bts[1].focus();

		}
		
		else {
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
						`<h2>${LAB.bt.delete}</h2>
						<p> ${LAB.dial.confDelWs}</p> 
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
		if(document.getElementById('out-h1').textContent.trim() != '') { 

			let req = createRequest(API_URL + 'push.php');
				
			req.onload = () => {

				// Is the server available ?
				if(req.status === 200) {

					// New post ? Ask confirm push.
					if(req.responseText === 'release') {
						dial(
							`<h2>${LAB.bt.pushPost}</h2>
							<p>${LAB.dial.confPushServ}</p>
							<button onclick="pushPost(true)">${LAB.bt.confirm}</button>`,						
						);
					}

					// Existing post ? Ask confirm update.
					else if(req.responseText === 'update') {
						dial(
							`<h2>${LAB.bt.pushPost}</h2>
							<p>${LAB.dial.confUpdateServ}</p>
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

	
			dial(
				`<p>${LAB.dial.confDelServ}</p>
				<button class="danger" onclick="deleteFromServer(true, '${dirName}')">${LAB.bt.confirm}</button>`
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
					`<h2>${LAB.bt.listPost}</h2>
					<p>${LAB.dial.editPost}</p>
					<ul>`;
					for(let file of files) {
						message += `<li >
							<button
								class="danger"
								onclick="deleteFromServer(false, \'${file.dir}\')"
								title="${LAB.bt.delete}">
								X
							</button>
							<button 
								onclick="importFromServer(\'${file.dir}\')"
								title="${LAB.bt.open}"
								value="${file.dir}">
								${file.title} 
								${file.isDraft ? 
									`<span class="private"><br/>${LAB.bt.private}</span>` : 
									`<span class="published"><br/>${LAB.bt.published}</span>`
								}
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
			`<h2>${LAB.bt.exportPost}</h2>
			<p>${LAB.dial.exportPost}</p>
			<p style="color:var(--color1)">${JSON.stringify(getPost())}</p>`
		);

	};

/* --- Core features --- */

	const chess = (obj) => { // = Create HTML Elements Short Syntax.

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
		let outputElm = document.getElementById(inputId.replace('in', 'out')); 
		let content = inputElm.value.replace(/(<([^>]+)>)/ig, ''); // Striping source tags to prevent unexpected HTML.	

		if(inputElm.type === 'textarea') {
			
			for(let regex of REGEX) {
				content = content.replace(regex.desc, regex.output);
			}

		}

		outputElm.innerHTML = content;

	};

	const getPost = () => {
		
		let post = {
			date: document.getElementById('post-date').value,
			isDraft: document.getElementById('post-draft').checked,
			class: document.getElementById('post-class').value,
			title: document.getElementById('in-h1').value,
			introduction: document.getElementById('in-intro').value,
			sections: null
		};
		
		let sectionElms = document.getElementsByClassName('in-section');		
		
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

		document.getElementById('post-date').value = post.date;

		document.getElementById('post-draft').checked = post.isDraft;
		
		document.getElementById('post-class').value = post.class;

		document.getElementById('in-h1').value = post.title;
		runEditor('in-h1');

		document.getElementById('in-intro').value = post.introduction;
		runEditor('in-intro');

		if(post.sections) {
		
			for(let section of post.sections) {
				
				let currentMarker = marker;
				document.getElementById('bt-add-section').click();

				document.getElementById('in-sec-title-' + currentMarker).value = section.title;
				runEditor('in-sec-title-' + currentMarker);

				document.getElementById('in-sec-content-' + currentMarker).value = section.content;
				runEditor('in-sec-content-' + currentMarker);

			}

		}

	};

	const resetPost = () => {

		// Reset main title.
		document.getElementById('in-h1').value = '';
		runEditor('in-h1');
		
		// Reset introduction.
		document.getElementById('in-intro').value = '';
		runEditor('in-intro');

		// For each section...
		for(let sectionElm of document.getElementsByClassName('in-section')) {
			// ...Remove output part.
			document.getElementById(sectionElm.id.replace('in', 'out')).remove();
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
					id: 'out-sec-' + marker
				},
				children: [
					{ 
						type: 'h2',
						attributes: {
							id: 'out-sec-title-' + marker
						}
					},
					{ 
						type: 'div',
						attributes: {
							id: 'out-sec-content-' + marker
						}
					}
				]
			})
		);

		let inputSecElm = chess({
			type: 'section',
			attributes: {
				class: 'in-section',
				id: 'in-sec-' + marker
			}
		});

		for (let elmToCreate of [
			{ type: 'input', id: 'in-sec-title-' + marker, placeholder: LAB.input.h2 },
			{ type: 'textarea', id: 'in-sec-content-' + marker, placeholder: LAB.input.secContent }

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
									document.getElementById('in-sec-' + currentMarker).remove();
									document.getElementById('out-sec-' + currentMarker).remove();
								}

						}
					}
				]
			})
	);

		UI.input.querySelector('div').appendChild(inputSecElm);
		
		// Scroll down and focus to the new section.
		document.location.replace(document.location.pathname + '#in-sec-title-' + marker);
		inputSecElm.children[1].focus();
	
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

				case 'h3': 
				case 'h4': 
				case 'h5': 
				case 'h6':
					output = `\n${object.tag.substring(1,2)}_${e.target.elements[0].value}\n`;
					break;

				case 'strong': 
					output = `__${e.target.elements[0].value}__`;
					break;

				case 'em':
					output = `_${e.target.elements[0].value}_`;
					break;

				case 'ol':
				case 'ul':
					let nScore = object.tag === 'ol' ? '__' : '_'; 
					output = '\n'
					for(let elm of e.target.elements[0].value.split('\n')) { 
						if(elm.trim() !== '') {
							output += `${nScore} ${elm.trim()}\n`; 
						}
					}
					break;

				case 'a':
					output = `[${e.target.elements[1].value}](${e.target.elements[0].value})`;
					break;

				case 'img':
					output = `![${e.target.elements[1].value}](${e.target.elements[0].value})`;
					break;

				case 'figure':
					output = `![${e.target.elements[2].value}|${e.target.elements[1].value}](${e.target.elements[0].value})`;
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