const REGEX = [
	{ // <br>
		desc: /\s{2}\n/g,
		output: () => '<br/>'
	},
	{ // Protect escaped underscores by convert them.
		desc: /\\_/g, // \_
		output: ct => '```'
	},
	{ // Only inline elements should be enclosed in a <p>.
		desc: /^(?!3_|4_|5_|6_|_\s|__\s|\!\[[^\]]+\]\([^\)]+\)).+$/gm, 
		output: ct => `<p>${ct}</p>`
	},
	{ // <h3> / <h4> / <h5> / <h6>
		desc: /^(3|4|5|6)_(?!\s).+/gm, // n_title
		output: ct => `<h${ct[0]}>${ct.substring(2)}</h${ct[0]}>`
	
	},
	{ // <img> / <figure>
		desc: /\!\[[^\]]+\]\([^\)]+\)/g, // ![alt|legend](img_url)
		output: ct => {
			let dt = ct.substring(2, ct.length -1).split('](');
			dt[0] = dt[0].split('|');
			return dt[0].length > 1 ? // Is there a legend?
				`<figure>
					<img src="${dt[1]}" alt="${dt[0][0]}" />
					<figcaption>${dt[0][1]}</figcaption>
				</figure>`:
				`<img src="${dt[1]}" alt="${dt[0][0]}" />`;
		}
	},
	{ // <a>
		desc: /\[[^\]]+\]\([^\)]+\)/g, // [label](url)
		output: ct => {
			let dt = ct.substring(1, ct.length - 1).split('](');
			return `<a href="${dt[1]}">${dt[0]}</a>`;
		}
	},
	{ // <ol>
		desc: /(^__\s.*\n){1,}/gm,
		output: ct => `<ol>${ct}</ol>`
	},
	{ // <li>
		desc: /^(<ol>)?__\s.+/gm, // __ ordered list item (the first element will be preceeding by <ol>)
		output: ct =>
			ct.startsWith('<ol>__') ?
				`<ol><li>${ct.substring(7,ct.length)}</li>` :
				`<li>${ct.substring(3,ct.length)}</li>`
	},
	{ // <ul>
		desc: /(^_\s.*\n){1,}/gm,
		output: ct => `<ul>${ct}</ul>`
	},
	{ // <li>
		desc: /^(<ul>)?_\s.+/gm, // _ unordered list items (the first element will be preceeding by <ul>)
		output: ct =>
			ct.startsWith('<ul>_') ?
				`<ul><li>${ct.substring(6,ct.length)}</li>` :
				`<li>${ct.substring(2,ct.length)}</li>`
	},
	{ // <strong>
		desc: /(__)(?!\s)(.+?[_]*)\1/g, // __strong text__
		output: ct => ` <strong>${ct.substring(2, ct.length - 2)}</strong>`
	},
	{ // <em>
		desc: /(_)(?!\s)(.+?)\1/g, // _emphasic text_
		output: ct => ` <em>${ct.substring(1, ct.length - 1)}</em>`
	},
	{ // (escaped underscores)
		desc: /```/g,
		output: () => '_'
	}
];