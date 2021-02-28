<?php $regex = [
	[ // <br>
		'desc' => '/\s{2}\n/i',
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
	[ // Only inline elements (strong, em, img) should be enclosed in a <p>.
		'desc' => '/^(?!3_|4_|5_|6_|_\s|__\s|\!\[[^\]]+\]\([^\)]+\)).+$/m',
		'output' => function ($ct) {
			return '<p>' . $ct[0] . '</p>';
		}
	],
	[ // <h3>	
		'desc' => '/^3_.+$/mi', // 3_title
		'output' => function ($ct) {
			return '<h3>' . substr($ct[0], 2) . '</h3>';
		} 
	],
	[ // <h4>
		'desc' => '/^4_.+$/mi', // 4_title
		'output' => function ($ct) {
			return '<h4>' . substr($ct[0], 2) . '</h4>';
		} 
	],
	[ // <h5>
		'desc' => '/^5_.+$/mi', // 5_title
		'output' => function ($ct) {
			return '<h5>' . substr($ct[0], 2) . '</h5>';
		} 
	],
	[ // <h6>
		'desc' => '/^6_.+$/mi', // 6_title
		'output' => function ($ct) {
			return '<h6>' . substr($ct[0], 2) . '</h6>';
		} 
	],
	[ // <img> / <figure>
		'desc' => '/\!\[[^\]]+\]\([^\)]+\)/i', // ![alt|legend](img_url)
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
		'desc' => '/\[[^\]]+\]\([^\)]+\)/i', // [label](url)
		'output' => function ($ct) {
			$dt = explode('](', substr($ct[0], 1, -1));
			return '<a href="' . $dt[1] . '">' . $dt[0] . '</a>';
		}
	],
	[ // <ol>
		'desc' => '/(^__\s.*\n){1,}/im',
		'output' => function ($ct) {
			return '<ol>' . $ct[0] . '</ol>';
		}
	],
	[ // <li>
		'desc' => '/^(<ol>)?__\s.+/im', // __ ordered list item (the first element will be preceeding by <ol>)
		'output' => function ($ct) {
			return strpos($ct[0], '<ol>__') === 0 ?
				'<ol><li>' . substr($ct[0], 7) . '</li>' :
				'<li>' . substr($ct[0], 3) . '</li>';
		}
	],
	[ // <ul>
		'desc' => '/(^_\s.*\n){1,}/im',
		'output' => function ($ct) {
			return '<ul>' . $ct[0] . '</ul>';
		}
	],
	[ // <li>
		'desc' => '/^(<ul>)?_\s.+/im', // _ unordered list item (the first element will be preceeding by <ul>)
		'output' => function ($ct) {
			return strpos($ct[0], '<ul>_') === 0 ?
				'<ul><li>' . substr($ct[0], 6) . '</li>' :
				'<li>' . substr($ct[0], 2) . '</li>';
		}
	],
	[ // <strong>
		'desc' => '/(__)(?!\s)(.+?[_]*)\1/', // (space)__strong text__
		'output' => function ($ct) {
			return ' <strong>' . substr($ct[0], 2, -2) . '</strong>';
		}
	],
	[ // <em>
		'desc' => '/(_)(?!\s)(.+?)\1/', // (space)_emphasic text_
		'output' => function ($ct) {
			return ' <em>' . substr($ct[0], 1, -1) . '</em>';
		}
	],
	[ // (escaped underscores)
		'desc' => '/```/',
		'output' => function () {
			return '_';
		}
	]
];