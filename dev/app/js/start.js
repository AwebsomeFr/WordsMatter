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

	// Status.
	UI.status = chess({
		type: 'div',
		attributes: {
			id: 'status'
		},
		html: '<svg viewBox="0 0 24 24"><path d="M14 12h-4v-12h4v12zm4.213-10.246l-1.213 1.599c2.984 1.732 5 4.955 5 8.647 0 5.514-4.486 10-10 10s-10-4.486-10-10c0-3.692 2.016-6.915 5-8.647l-1.213-1.599c-3.465 2.103-5.787 5.897-5.787 10.246 0 6.627 5.373 12 12 12s12-5.373 12-12c0-4.349-2.322-8.143-5.787-10.246z"/></svg>',
		children: [
			{
				type: 'p',
				attributes: {
					class: "online"
				},
				text: LAB.bt.online

			},
			{
				type: 'p',
				attributes: {
					class: "offline"
				},
				text: LAB.bt.offline
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
					title: LAB.bt.menu,
					onclick: "toggleMenu(true)" 
				},
				text: LAB.bt.menu
			},
			{
				type: 'div',
				attributes: {
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
						html: '<span>↑</span>' + LAB.bt.save,
					},
					{
						type: 'button',
						attributes: {
							id: "bt-delete-work",
							class: "nav-button ws-required",
							onclick: "deleteFromLocalStorage()" 
						},
						html: '<span>X</span>' + LAB.bt.delete,
					},
					{
						type: 'button',
						attributes: {
							id: "bt-release-work",
							class: "nav-button serv-required",
							onclick: "pushPost()" 
						},
						html: '<span>↑</span>' + LAB.bt.pushPost,
					},
					{
						type: 'button',
						attributes: {
							id: "bt-list-work",
							class: "nav-button serv-required",
							onclick: "getFiles()" 
						},
						html: '<span>↓</span>' + LAB.bt.listPost,
					},
					{
						type: 'button',
						attributes: {
							id: "bt-export-work",
							class: "nav-button",
							onclick: "exportToFile()" 
						},
						html: '<span>↑</span>' + LAB.bt.exportPost,
					},
					{
						type: 'label',
						attributes: {
							id: 'label-open-file',
							class: 'nav-button'
						},
						html: '<span>↓</span>' + LAB.bt.importPost,
						children: [
							{
								type: 'input',
								attributes: {
									accept: 'text/plain',
									onchange: 'importFromFile(this.files[0])',
									type: 'file'
								}
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
						html: '<span>☼</span>' + LAB.bt.setTheme,
					},
					{
						type: 'button',
						attributes: {
							id: "bt-set-width",
							class: "nav-button",
							onclick: "setWidth()" 
						},
						html: '<span>↔</span>' + LAB.bt.setWidth,
					},
					{
						type: 'button',
						attributes: {
							id: "bt-set-height",
							class: "nav-button",
							onclick: "setHeight()" 
						},
						html: '<span>↕</span>' + LAB.bt.setHeight,
					},
					{
						type: 'button',
						attributes: {
							id: "bt-read-help",
							class: "nav-button",
							onclick: "openLink('./help.html')"
						},
						html: '<span>?</span>' + LAB.bt.doc,
					},
					{
						type: 'button',
						attributes: {
							class: "nav-button",
							onclick: "openLink('https://awebsome.fr')" 
						},
						html: 
						`<span><img src="./app/img/words-matter-logo-100px.png" alt="Logo WordsMatter" /></span>
						<p>${LAB.bt.awb} <u>Awebsome</u>.</p>`
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
				type: 'details',
				attributes: {
					class: 'input-config'
				},
				children: [
					{
						type: 'summary',
						text: LAB.bt.configuration

					},
					{
						type: 'label',
						children: [
							{
								type: 'input',
								attributes: {
									id: 'input-art-class',
									type: 'text'
								}
							},
						],
						text: LAB.input.postClass
					},
					{
						type: 'label',
						children: [
							{
								type: 'input',
								attributes: {
									id: 'input-art-date',
									type: 'date'
								}
							},
						],
						text: LAB.input.postDate
					},
					{
						type: 'label',
						children: [
							{
								type: 'input',
								attributes: {
									id: 'input-art-draft',
									type: 'checkbox'
								}
							}
						],
						text: LAB.input.postDraft
					},
				]
			},
			{
				type: 'div',
				attributes: {
					class: 'input-content'
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
				]
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

	// Shortcuts.
	document.onkeydown = (e) => {
	
		if(e.code === 'Escape') {
			dial();
		}

		else if(e.ctrlKey || e.metaKey) {
			switch(e.code) {
				case 'KeyS':
					saveIntoLocalStorage();
					e.preventDefault();
					break;
				case 'KeyP':
					pushPost();
					e.preventDefault();
					break;
				case 'KeyO':
					getFiles();
					e.preventDefault();
					break;
			}
		}
	}

	document.body.appendChild(UI.notice);
	document.body.appendChild(UI.dial);
	document.body.appendChild(UI.status);
	UI.main.appendChild(UI.nav);
	UI.main.appendChild(UI.output);
	UI.main.appendChild(UI.input);
	document.body.appendChild(UI.main);

	document.documentElement.lang = LANG;

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
		let permission = req.responseText;
		if(permission === 'true') {
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