"use strict";

document.body.onload = () => {

	/* --- 1. Build the interface --- */

		const UI = {};
		
		UI.main = chess({ type: 'main' });

		// Dial.
		UI.dial = chess({
			type: 'div',
			attributes: {
				id: 'dial',
				class: 'hidden'
			},
			children: [
				{
					type: 'button',
					attributes: {
						id: 'bt-close-dial',
						onclick: 'dial()'
					},
					text: LAB.bt.close 
				},
				{
					type: 'div',
					attributes: {
						id: 'dial-content'
					}
				}
			]
		});

		// Main nav.
		UI.nav = chess({
			type: 'nav',
			attributes: {
				id: 'main-nav'
			}, 
			children: [
				{
					type: 'button',
					attributes: {
						id: "bt-open-menu",
						title: LAB.bt.menu,
						onclick: "toggleMenu(true)" 
					},
					text: LAB.bt.menu,
				},
				{
					type: 'div',
					attributes: {
						id: 'nav-container',
						class: 'hidden',
						onmouseleave: 'toggleMenu(false)'
					},
					children: [
						{
							type: 'button',
							attributes: {
								id: "bt-save-work",
								class: "nav-button disabled",
								onclick: "saveIntoLocalStorage()" 
							},
							text: LAB.bt.save,
						},
						{
							type: 'button',
							attributes: {
								id: "bt-delete-work",
								class: "nav-button danger disabled",
								onclick: "deleteFromLocalStorage()" 
							},
							text: LAB.bt.delete + ' X',
						},
						{
							type: 'button',
							attributes: {
								id: "bt-release-work",
								class: "nav-button disabled",
								onclick: "pushPost()" 
							},
							text: LAB.bt.push,
						},
						{
							type: 'button',
							attributes: {
								id: "bt-list-work",
								class: "nav-button disabled",
								onclick: "getFiles()" 
							},
							text: LAB.bt.list,
						},
						{
							type: 'button',
							attributes: {
								id: "bt-export-work",
								class: "nav-button",
								onclick: "exportToFile()" 
							},
							text: LAB.bt.export,
						},
						{
							type: 'div',
							children: [
								{	
									type: 'label',
									attributes: {
										id: 'label-open-file',
										class: 'nav-button'
									},
									text: LAB.bt.import,
									children: [
										{
											type: 'input',
											attributes: {
												accept: 'text/plain',
												id: 'input-open-file',
												onchange: 'importFromFile(this.files[0])',
												type: 'file'
											}
										}
									]
								}
							]
						},
						{
							type: 'button',
							attributes: {
								id: "bt-switch-theme",
								class: "nav-button",
								onclick: "toggleTheme()" 
							},
							text: LAB.bt.theme,
						},
						{
							type: 'button',
							attributes: {
								id: "bt-set-width",
								class: "nav-button disabled",
								onclick: "setWidth()" 
							},
							text: LAB.bt.width,
						},
						{
							type: 'button',
							attributes: {
								id: "bt-set-height",
								class: "nav-button",
								onclick: "setHeight()" 
							},
							text: LAB.bt.height,
						},
						{
							type: 'button',
							attributes: {
								id: "bt-read-help",
								class: "nav-button",
								onclick: "onHelp()" 
							},
							text: LAB.bt.doc,
						},
						{
							type: 'button',
							attributes: {
								id: "bt-close-nav",
								class: "nav-button",
								onclick: "toggleMenu(false)" 
							},
							text: LAB.bt.close,
						}
					]
				}
			]
		});

		// Output.
		UI.output = chess({
			type: 'article',
			attributes: {
				id: 'output',
				onclick: 'toggleMenu(false)'
			},
			children: [
				{
					type: 'h1',
					attributes: {
						id: "output-art-title"
					}
				},
				{
					type: 'div',
					attributes: {
						id: "output-art-introduction"
					}
				}
			]
		});

		// Input.
		UI.input = chess({
			type: 'article',
			attributes: {
				id: 'input',
				onclick: 'toggleMenu(false)'
			},
			children: [
				{
					type: 'label',
					attributes: {
						for: 'input-art-title'
					},
					text: LAB.input.h1
				},
				{
					type: 'input',
					attributes: {
						id: 'input-art-title',
						oninput: 'runEditor(\'input-art-title\')',
						placeholder: LAB.input.h1,
						type: 'text'
					}
				},
				{
					type: 'label',
					attributes: {
						for: 'input-art-introduction'
					},
					text: LAB.input.intro
				},
				{
					type: 'textarea',
					attributes: {
						id: 'input-art-introduction',
						oninput: 'runEditor(\'input-art-introduction\')',
						placeholder: LAB.input.intro
					}
				},
				{
					type: 'button',
					attributes: {
						id: 'bt-add-section',
						onclick: 'addSection()'
					},
					text: LAB.bt.addSection
				}
			]
		});

		document.body.appendChild(UI.dial);
		UI.main.appendChild(UI.nav);
		UI.main.appendChild(UI.output);
		UI.main.appendChild(UI.input);
		document.body.appendChild(UI.main);

	/* --- 2. Enable features under conditions --- */

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
			if(req.status == 200) {
				// Enable features.
				document.getElementById('bt-list-work').classList.remove('disabled');
				document.getElementById('bt-release-work').classList.remove('disabled');
				document.getElementById('bt-open-menu').setAttribute('class', 'online'); 
			}
		};
		req.send('editorId=' + EDITOR_ID);

		// Autoset viewport.
		setViewportHeight();
		window.onresize = () => {
			setViewportHeight();
		}

		document.documentElement.lang = LANG;

};