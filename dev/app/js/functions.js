'use strict';

// This global should not exist.
let marker = 0;

/* --- User interface --- */

	const setViewportHeight = () => UI.main.style.height = window.innerHeight + 'px';

	const savePref = (name, value) => localStorage.setItem(name, value);

	const toggleMenu = boolean => boolean ? UI.nav.classList.add('--visible') : UI.nav.classList.remove('--visible');

	const toggleTheme = () => UI.body.classList.contains('--dark') ? toLightTheme() : toDarkTheme();
	
	const toDarkTheme = () => {	
		UI.body.classList.add('--dark');
		savePref('theme', '--dark');
	};
	const toLightTheme = () => {
		UI.body.classList.remove('--dark');
		savePref('theme', '--light');
	};

	const setHeight = () => {
	
		const heights = [
			['0.75fr 0.25fr', LAB.bt.advReading], 
			['0.5fr 0.5fr', LAB.bt.balanced], 
			['0.25fr 1.5fr', LAB.bt.advWriting]
		];
		let options = '';

		for(const height of heights) {
			options += 
				`<button onclick="
					UI.main.style.gridTemplateRows = 'auto ${height[0]}', 
					dial() ">
					${height[1]}
				</button>`;
		}

		dial(
			`<h2>${LAB.bt.setHeight}</h2>
			<p>${LAB.dial.setHeight}</p>
			${options}`
		);

	};

	const setWidth = () => {

		const widths = [360, 540, 768, 1024, 1280, 'Max'];
		let options = '';

		for(const width of widths) {
			options += 
				`<button onclick="
					UI.main.setAttribute('class', '--mw${width}'),
					savePref('max-width', '--mw${width}'),
					dial() ">
					${width}${isNaN(width) ? '': 'px'}
				</button>`;
		}

		dial(
			`<h2>${LAB.bt.setWidth}</h2>
			<p>${LAB.dial.setWidth}</p>
			${options}`
		);

	};

	const dial = mess => {
		
		if(mess !== undefined) {
			
			_.Q('div', UI.dial).innerHTML = mess;
			UI.dial.classList.add('--visible');

			let bts = _.T('button', UI.dial);			
			if(bts.length > 1) {				
				// Add a class to the latest button for focus trap.
				bts[bts.length - 1].classList.add('dial-trap-last');
				// Give focus to the first useful button (sometimes, focus is given to the first input).
				bts[1].focus();
			}

		}
		
		else {
			UI.dial.classList.remove('--visible');
		}

		toggleMenu(false);

	};

	const setNotice = (notice, state) => {
		
		dial();
		UI.notice.setAttribute('class', 'wm-notice');
		UI.notice.textContent = notice;
		void UI.notice.offsetWidth;
		UI.notice.setAttribute('class', 'wm-notice --visible ' + state);
		
	};

	const negNotice = notice => setNotice(notice, '--bad');

	const posNotice = notice => setNotice(notice, '--good');

/* --- Manage posts --- */

	/* --- Commons --- */

		const getPost = () => {
			
			let post = {
				date: _.I('post-date').value,
				isDraft: _.I('post-draft').checked,
				class: _.I('post-class').value,
				title: _.I('in-h1').value,
				introduction: _.I('in-intro').value,
				sections: null
			};
			
			const secElms = _.C('wm-in__section');

			if(secElms.length > 0) {
				post.sections = [];
				for(const secElm of secElms) {
					post.sections.push(
						{
							title: _.Q('input', secElm).value,
							content: _.Q('textarea', secElm).value,
						}
					);
				}
			}
			
			return post;
			
		};

		const setPost = input => {

			try {

				const post = JSON.parse(input);
				emptyPost();
	
				// Restore values.
				_.I('post-date').value = post.date;
				_.I('post-draft').checked = post.isDraft;	
				_.I('post-class').value = post.class;
	
				_.I('in-h1').value = post.title;
				runEditor('in-h1');
	
				_.I('in-intro').value = post.introduction;
				runEditor('in-intro');
	
				if(post.sections) {
				
					for(const sec of post.sections) {
						
						let currentMarker = marker;
						_.I('bt-add-section').click();
	
						_.I('in-sec-title-' + currentMarker).value = sec.title;
						runEditor('in-sec-title-' + currentMarker);
	
						_.I('in-sec-content-' + currentMarker).value = sec.content;
						runEditor('in-sec-content-' + currentMarker);
	
					}
	
				}

				posNotice(LAB.notice.load1);

			}

			catch(e) {
				negNotice(LAB.notice.load0);
			}
			
		};

		const emptyPost = () => {

			_.I('in-h1').value = '';
			runEditor('in-h1');
			
			_.I('in-intro').value = '';
			runEditor('in-intro');

			const secElms = _.C('wm-in__section');
			while(secElms.length >= 1) {
				const secElm = secElms[0]; 
				secElms[0].remove(); // Remove input.
				_.I(secElm.id.replace('in', 'out')).remove(); // Remove output.
			}

		};

	/* --- With Web Storage API --- */

		const pushLocalPost = () => {

			const datasContent = JSON.stringify(getPost());
			localStorage.setItem('post', datasContent);			
			localStorage.getItem('post') === datasContent ?
				posNotice(LAB.notice.wsSave1):
				negNotice(LAB.notice.wsSave0);
			
		};

		const deleteLocalPost = () => {

			if(localStorage.getItem('post')) {	
				if(confirm(LAB.dial.confDelWs)) {
					localStorage.removeItem('post');
					!localStorage.getItem('post') ?
						[emptyPost(), posNotice(LAB.notice.wsDel1)]:
						negNotice(LAB.notice.wsDel0);
				}
			}

			else {
				negNotice(LAB.notice.wsDelY);
			}

		};

	/* --- With files --- */

		const exportPost = () => dial(
			`<h2>${LAB.bt.exportPost}</h2>
			<p>${LAB.dial.exportPost}</p>
			<p style="color:var(--color1)">${JSON.stringify(getPost())}</p>`
		);

		const importPost = file => {

			let reader = new FileReader();		
			reader.onloadend = e => setPost(e.target.result);
			reader.readAsText(file);

		};

	/* --- With the API --- */

		const ajaxManager = (script /* string */, args /* array */, callback /* function */) => {
			
			let req = new XMLHttpRequest();

			req.open('POST', API_URL + script + '.php', true);
			req.onload = () => callback(req.responseText);

			let formData = new FormData();
			formData.append('editorId', EDITOR_ID);

			if(args !== null) {
				for(let arg of args) {
					formData.append(arg.name, arg.value);
				}
			}
			
			req.send(formData);

		};

		const getPosts = () => {

			ajaxManager(
				'getPosts',
				null,
				resp => {

					const posts = JSON.parse(resp);
					
					if(posts.length > 0) {

						let dialBody = 
							`<h2>${LAB.bt.listPost}</h2>
							<p>${LAB.dial.editPost}</p>
							<ul>`;

						for(const post of posts) {
							dialBody += 
								`<li >
									<button
										class="--danger"
										onclick="deletePost(\'${post.dir}\')"
										title="${LAB.bt.delete}">
										X
									</button>
									<button 
										onclick="readPost(\'${post.dir}\')"
										title="${LAB.bt.open}"
										value="${post.dir}">
										${post.title} 
										${post.isDraft ? 
											`<span class="private"><br/>${LAB.bt.private}</span>` : 
											`<span class="published"><br/>${LAB.bt.published}</span>`
										}
									</button>
								</li>`;
						}
						
						dialBody += 
							'</ul>';
						
						dial(dialBody);

					}

					else {
						negNotice(LAB.notice.servContentY);
					}

				}

			);

		};

		const readPost = post => {

			ajaxManager(
				'readPost',
				[{ name: 'post', value: post }],
				resp => setPost(resp)
			);

		};

		const pushPost = (validation = false) => {

			// Has a title been specified ?
			if(_.I('out-h1').textContent.trim() != '') { 

				ajaxManager(
					'pushPost',
					[{name: 'post', value: JSON.stringify(getPost())}, {name: 'validation', value: validation}],
					resp => {

						switch(resp) {
						
							case 'release': // New post ? Ask confirm push.
								dial(
									`<h2>${LAB.bt.pushPost}</h2>
									<p>${LAB.dial.confPushServ}</p>
									<button onclick="pushPost(true)">${LAB.bt.confirm}</button>`,						
								);
								break;

							case 'update': // Existing post ? Ask confirm update.
								dial(
									`<h2>${LAB.bt.pushPost}</h2>
									<p>${LAB.dial.confUpdateServ}</p>
									<button onclick="pushPost(true)">${LAB.bt.update}</button>`,
								);
								break;

							case 'success':
								posNotice(LAB.notice.serv1);
								break;

							default:
								negNotice(LAB.notice.serv0);

						}
				
					}

				);

			}

			else {
				negNotice(LAB.notice.servTitleY);
			}

		};

		const deletePost = post => {
		
			if(confirm(LAB.dial.confDelServ)) {
				ajaxManager(
					'deletePost',
					[{name: 'post', value: post}],
					resp => resp === 'success' ? 
						posNotice(LAB.notice.servDel1):
						negNotice(LAB.notice.servDel0)
				);
			}

		};

/* --- Manage images --- */

	/* --- With the API --- */

		const getImages = () => {

			ajaxManager(
				'getImages',
				null,
				resp => {
					
					// Common part.
					let dialBody = 
						`<h2>${LAB.bt.getImages}</h2>
						<label>${LAB.bt.uploadImg}
							<input 
								accept="image/jpeg, image/png, image/webp"
								onchange="pushImage(this.files[0])"
								type="file"
							/>
						</label>
						<p>${LAB.bt.pickImg}.</p>`;

					// Only if there are already downloaded images. 
					if(resp !== '[]') {
						const medias = JSON.parse(resp);
						// Start container.
						dialBody += 
							`<div class="wm-gallery">
								<div>`;
						// Item.
						for(const media of medias) {
							dialBody += 
								`<div>
									<button onclick="addFromGallery('${media.normalPath}')">${LAB.bt.add}</button>
									<button 
										class="--danger"
										onclick="deleteImage('${media.name}')"
										title="${LAB.bt.delete}"	
									>X</button>
									<img loading="lazy" src="${media.thumbPath}" />
									<p>${media.name}</p>
								</div>`;
						}
						// End container.
						dialBody += 
							`</div>
						</div>`;
					}
			
					dial(dialBody);

				}
				
			);

		};

		const pushImage = file => {

			ajaxManager(
				'pushImage',
				[{ name: 'file', value: file }],
				resp => resp === 'success' ? 
					getImages():
					negNotice(LAB.notice.error)
			);

		};

		const deleteImage = picture => {

			if(confirm(`${LAB.bt.delete} ${picture} ?`)) {

				ajaxManager(
					'deleteImage',
					[{ name: 'picture', value: picture }],
					resp => resp === 'success' ? 
						getImages():
						negNotice(LAB.notice.error)
				);

			}

		};

/* --- Build things --- */

	/* 
	ghess (Get HTML Elements Short Syntax), by Awebsome.
	https://github.com/AwebsomeFr/ghess
	*/
	const _ = {
		Q: (ref, root = document) => root.querySelector(ref),
		I: (ref, root = document) => root.getElementById(ref),
		C: (ref, root = document) => root.getElementsByClassName(ref),
		T: (ref, root = document) => root.getElementsByTagName(ref)
	};

	/* 
	chess (Create HTML Elements Short Syntax), by Awebsome.
	https://github.com/AwebsomeFr/chess
	*/
	const chess = obj => { 

		let elm = document.createElement(obj.type); 

		if(obj.text) {
			elm.textContent = obj.text;
		}
		else if(obj.html) {
			elm.innerHTML = obj.html;
		}

		if(obj.attributes) {
			for(const attribute in obj.attributes) {
				elm.setAttribute(attribute, obj.attributes[attribute]);
			}
		}
		
		if(obj.events) {
			for(const event of obj.events) {
				elm.addEventListener(event.type, event.function);
			}
		}

		if(obj.children) {
			for(const child of obj.children) {
				elm.appendChild(chess(child));
			}
		}

		return elm;

	};

	const runEditor = inputId => {

		let inputElm = _.I(inputId);
		let outputElm = _.I(inputId.replace('in', 'out')); 
		let content = inputElm.value.replace(/(<([^>]+)>)/ig, ''); // Striping source tags to prevent unexpected HTML.	

		if(inputElm.type === 'textarea') {
			for(const regex of REGEX) {
				content = content.replace(regex.desc, regex.output);
			}
		}

		outputElm.innerHTML = content;

	};

	const addFromGallery = picPath => {

		dial();
		let targetElm = _.T('textarea');
		targetElm = targetElm[targetElm.length -1];
		targetElm.value += `![alternative](${picPath})`;
		runEditor(targetElm.id);

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
				class: 'wm-in__section',
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
							function: () => formatContent(_.Q('textarea', inputSecElm), { title: LAB.bt.addHx + i, tag: 'h' + i })
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
							function: () => formatContent(_.Q('textarea', inputSecElm), elmToCreate)
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
					class: '--danger',
					title: LAB.bt.delSec
				},
				events: [
					{
						type: 'click',
						function: () => {
							if(confirm(LAB.dial.confDelSec))
								{
									_.I('in-sec-' + currentMarker).remove();
									_.I('out-sec-' + currentMarker).remove();
								}

						}
					}
				]
			})
	);

		_.Q('div', UI.input).appendChild(inputSecElm);
		
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
					<input id="inline-value" type="text" value="${input}" required />`;
				break;

			case 'ol': case 'ul':
				formElm.body =
					`<label for="list-values">${LAB.input.list}</label>
					<textarea id="list-values" required>${input}</textarea>`;
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

		}

		dial(
			formElm.header +
			formElm.body +
			formElm.footer
		);

		// Give the focus on the first input or textarea available.
		if(object.tag === 'ol' || object.tag === 'ul') {
			_.Q('.wm-dial textarea').focus();
		}
		else {
			_.Q('.wm-dial input').focus();
		}

		// Build the corresponding output when the form is submitted.
		_.Q('.wm-dial form').onsubmit = (e) => {

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
					output = '\n';
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

			}

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