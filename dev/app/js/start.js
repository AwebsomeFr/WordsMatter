"use strict";

/* --- 1. Build the interface --- */

	const UI = {};
	
	UI.main = chess({ type: 'main' });

	// Notice.
	UI.notice = chess({
		type: 'p',
		attributes: {
			id: 'notice'
		},
	});

	// Dial.
	UI.dial = chess({
		type: 'div',
		attributes: {
			id: 'dial',
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
			id: 'main-nav',
		}, 
		children: [
			{
				type: 'button',
				attributes: {
					id: "bt-open-menu",
					title: LAB.bt.menu,
					onclick: "toggleMenu(true)" 
				},
				html: '<svg viewBox="0 0 24 24"><path d="M14 12h-4v-12h4v12zm4.213-10.246l-1.213 1.599c2.984 1.732 5 4.955 5 8.647 0 5.514-4.486 10-10 10s-10-4.486-10-10c0-3.692 2.016-6.915 5-8.647l-1.213-1.599c-3.465 2.103-5.787 5.897-5.787 10.246 0 6.627 5.373 12 12 12s12-5.373 12-12c0-4.349-2.322-8.143-5.787-10.246z"/></svg>' + LAB.bt.menu,
			},
			{
				type: 'div',
				attributes: {
					id: 'nav-container',
					onmouseleave: 'toggleMenu(false)'
				},
				children: [
					{
						type: 'button',
						attributes: {
							id: "bt-save-work",
							class: "nav-button ws-required",
							onclick: "saveIntoLocalStorage()" 
						},
						text: LAB.bt.save,
					},
					{
						type: 'button',
						attributes: {
							id: "bt-delete-work",
							class: "nav-button danger ws-required",
							onclick: "deleteFromLocalStorage()" 
						},
						text: LAB.bt.delete + ' X',
					},
					{
						type: 'button',
						attributes: {
							id: "bt-release-work",
							class: "nav-button serv-required",
							onclick: "pushPost()" 
						},
						text: LAB.bt.pushPost,
					},
					{
						type: 'button',
						attributes: {
							id: "bt-list-work",
							class: "nav-button serv-required",
							onclick: "getFiles()" 
						},
						text: LAB.bt.listPost,
					},
					{
						type: 'button',
						attributes: {
							id: "bt-export-work",
							class: "nav-button",
							onclick: "exportToFile()" 
						},
						text: LAB.bt.exportPost,
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
								text: LAB.bt.importPost,
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
						text: LAB.bt.setTheme,
					},
					{
						type: 'button',
						attributes: {
							id: "bt-set-width",
							class: "nav-button",
							onclick: "setWidth()" 
						},
						text: LAB.bt.setWidth,
					},
					{
						type: 'button',
						attributes: {
							id: "bt-set-height",
							class: "nav-button",
							onclick: "setHeight()" 
						},
						text: LAB.bt.setHeight,
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
				text: LAB.input.secIntro
			},
			{
				type: 'textarea',
				attributes: {
					id: 'input-art-introduction',
					oninput: 'runEditor(\'input-art-introduction\')',
					placeholder: LAB.input.secIntro
				}
			},
			{
				type: 'button',
				attributes: {
					id: 'bt-add-section',
					onclick: 'addSection()'
				},
				text: LAB.bt.addSec
			}
		]
	});

	document.body.appendChild(UI.notice);
	document.body.appendChild(UI.dial);
	UI.main.appendChild(UI.nav);
	UI.main.appendChild(UI.output);
	UI.main.appendChild(UI.input);
	document.body.appendChild(UI.main);

/* --- 2. Enable features under conditions --- */

	resetPost();

	// Is the Web Storage API available ?
	if(localStorage) {
		
		// Enable WS features.
		document.body.classList.add('ws-available');

		let wsData;

		// Try to reload content.
		if(wsData = localStorage.getItem('post')) {
			importFromLocalStorage(JSON.parse(wsData));
		}

		let wsPref;

		// Try to restore preferences. 
		if(wsPref = localStorage.getItem('color-scheme')) {
			if(wsPref === 'dark') {
				toDarkTheme();
			}			
		}
		if(wsPref = localStorage.getItem('max-width')) {
			UI.main.setAttribute('class', wsPref);
		}

	}

	// Is the server available ?
	let req = createRequest(API_URL + 'init.php');
	req.onload = () => {
		if(req.status == 200) {
			// Enable features.
			document.body.classList.add('serv-available');
		}
	};
	req.send('editorId=' + EDITOR_ID);

	// Autoset viewport.
	setViewportHeight();
	window.onresize = () => {
		setViewportHeight();
	}

	document.documentElement.lang = LANG;