<?php $regex = [
	[ // <br>
		'desc' => '/\s{2}\n/',
		'output' => function ($ct) {
			return '<br/>';
		}
	],
	[ // Protect escaped underscores by convert them.
		'desc' => '/\\\_/',
		'output' => function () {
			return '```';
		}
	],
	[ // Only inline elements should be enclosed in a <p>.
		'desc' => '/^(?!3_|4_|5_|6_|_\s|__\s|\!\[[^\]]+\]\([^\)]+\)).+$/m',
		'output' => function ($ct) {
			return '<p>' . $ct[0] . '</p>';
		}
	],
	[ // <h3> / <h4> / <h5> / <h6>
		'desc' => '/^(3|4|5|6)_(?!\s).+/m', // n_title
		'output' => function ($ct) {
			return '<h' . $ct[0][0] . '>' . substr($ct[0], 2) . '</h' . $ct[0][0] . '>';
		} 
	],
	[ // <img> / <figure>
		'desc' => '/\!\[[^\]]+\]\([^\)]+\)/', // ![alt|legend](img_url)
		'output' => function ($ct) {
			$dt = explode('](', substr($ct[0], 2, -1));
			$dt[0] = explode('|', $dt[0]); 
			return count($dt[0]) > 1 ? // Is there a legend ?
				'<figure>' .
					'<img loading="lazy" src="' . $dt[1] . '" alt="' . $dt[0][0] . '" />' .
					'<figcaption>' .	 $dt[0][1] . '</figcaption>' .
				'</figure>' :
				'<img loading="lazy" src="' . $dt[1] . '" alt="' . $dt[0][0] . '" />';

		}
	],
	[ // <a>
		'desc' => '/\[[^\]]+\]\([^\)]+\)/', // [label](url)
		'output' => function ($ct) {
			$dt = explode('](', substr($ct[0], 1, -1));
			return '<a href="' . $dt[1] . '">' . $dt[0] . '</a>';
		}
	],
	[ // <ol>
		'desc' => '/(^__\s.*\n){1,}/m',
		'output' => function ($ct) {
			return '<ol>' . $ct[0] . '</ol>';
		}
	],
	[ // <li>
		'desc' => '/^(<ol>)?__\s.+/m', // __ ordered list item (the first element will be preceeding by <ol>)
		'output' => function ($ct) {
			return strpos($ct[0], '<ol>__') === 0 ?
				'<ol><li>' . substr($ct[0], 7) . '</li>' :
				'<li>' . substr($ct[0], 3) . '</li>';
		}
	],
	[ // <ul>
		'desc' => '/(^_\s.*\n){1,}/m',
		'output' => function ($ct) {
			return '<ul>' . $ct[0] . '</ul>';
		}
	],
	[ // <li>
		'desc' => '/^(<ul>)?_\s.+/m', // _ unordered list item (the first element will be preceeding by <ul>)
		'output' => function ($ct) {
			return strpos($ct[0], '<ul>_') === 0 ?
				'<ul><li>' . substr($ct[0], 6) . '</li>' :
				'<li>' . substr($ct[0], 2) . '</li>';
		}
	],
	[ // <strong>
		'desc' => '/(__)(?!\s)(.+?[_]*)\1/', // (space)__strong text__
		'output' => function ($ct) {
			return '<strong>' . substr($ct[0], 2, -2) . '</strong>';
		}
	],
	[ // <em>
		'desc' => '/(_)(?!\s)(.+?)\1/', // (space)_emphasic text_
		'output' => function ($ct) {
			return '<em>' . substr($ct[0], 1, -1) . '</em>';
		}
	],
	[ // (escaped underscores)
		'desc' => '/```/',
		'output' => function () {
			return '_';
		}
	]
];