const REGEX = [
	{
		desc: /\s{2}\n/g,
		output: () => {
			return '<br/>'; 
		}
	},
	{
		desc: /^(?!3|4|5|6|f|i|o|u).+$/gm, // All except block elements can be enclosed in a paragraph.
		output: (content) => {
			return '<p>' + content + '</p>';
		}
	},
	{
		desc: /^3\([^)]+\)$/gim, // 3(title)
		output: (content) => {
			return '<h3>' + content.substring(2, content.length - 1) + '</h3>';
		}
	},
	{
		desc: /^4\([^)]+\)$/gim, // 4(title)
		output: (content) => {
			return '<h4>' + content.substring(2, content.length - 1) + '</h4>';
		}
	},
	{
		desc: /^5\([^)]+\)$/gim, // 5(title)
		output: (content) => {
			return '<h5>' + content.substring(2, content.length - 1) + '</h5>';
		}
	},
	{
		desc: /^6\([^)]+\)$/gim, // 6(title)
		output: (content) => {
			return '<h6>' + content.substring(2, content.length - 1) + '</h6>';
		}
	},
	{
		desc: /I\([^()]+\([^()]+\){2}/gi, // i(alternative(url))
		output: (content) => {
			let dt = content.substring(2, content.length -2).split('('); // Remove i( from start and )) from end then split values by using the separator (.
			return '<img src="' + dt[1] + '" alt="' + dt[0] + '" />'; 
		}
	},
	{
		desc: /F\([^)]+\([^)]+\([^)]+\){3}/gi, // f(legend(alternative(url)))
		output: (content) => {
			let dt = content.substring(2, content.length -3).split('('); // Remove f( from start and ))) from end then split values by using the separator (.
			return '<figure><img src="' + dt[2] + '" alt="' + dt[1] + '" /><figcaption>' + dt[0] + '</figcaption></figure>';
		}
	},
	{
		desc: /A\([^()]+\([^()]+\){2}/gi, // a(label(url))
		output: (content) => {
			let dt = content.substring(2, content.length -2).split('('); // Remove a( from start and )) from end then split values by using the separator (.
			return '<a href="' + dt[1] + '">' + dt[0] + '</a>';
	}
	},
	{	
		desc: /S\([^)]+\)/gi, // s(text)
		output: (content) => {
			return '<strong>' + content.substring(2, content.length - 1) + '</strong>';
		}
	},
	{
		desc: /E\([^)]+\)/gi, // e(text)
		output: (content) => {
			return '<em>' + content.substring(2, (content.length - 1)) + '</em>';
		}
	},
	{
		desc: /O\({3}.+\){3}/gi, // o(((value)))
		output: (content) => {
			return '<ol>' + content.substring(2, content.length - 1) + '</ol>';
		}
	},
	{
		desc: /U\({3}.+\){3}/gi, // u(((value)))
		output: (content) => {
			return '<ul>' + content.substring(2, content.length - 1) + '</ul>';
		}
	},
	{
		desc: /\({2}[^()]+\){2}/gi, // ((value)) only inside o() or u()
		output: (content) => {
			return '<li>' + content.substring(2, content.length - 2) + '</li>';
		}
	}
];