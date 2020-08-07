<?php $regex = [
	[
		'desc' => '/\s{2}\n/i',
		'output' => function ($content) {
			return '<br/>';
		}
	],
	[	
		'desc' => '/^(?!3|4|5|6|f|i|o|u).+$/m', // All except block elements can be enclosed in a paragraph.
		'output' => function ($content) {
			return '<p>' . $content[0] . '</p>';
		} 
	],
	[	
		'desc' => '/^3\([^)]+\)$/mi', // 3(title)
		'output' => function ($content) {
			return '<h3>' . substr($content[0], 2, -1) . '</h3>';
		} 
	],
	[	
		'desc' => '/^4\([^)]+\)$/mi', // 4(title)
		'output' => function ($content) {
			return '<h4>' . substr($content[0], 2, -1) . '</h4>';
		} 
	],
	[	
		'desc' => '/^5\([^)]+\)$/mi', // 5(title)
		'output' => function ($content) {
			return '<h5>' . substr($content[0], 2, -1) . '</h5>';
		} 
	],
	[	
		'desc' => '/^6\([^)]+\)$/mi', // 6(title)
		'output' => function ($content) {
			return '<h6>' . substr($content[0], 2, -1) . '</h6>';
		} 
	],
	[
		'desc' => '/I\([^()]+\([^()]+\){2}/i', // i(alternative(url))
		'output' => function ($content) {
			$values = explode('(', substr($content[0], 2, -2)); // Remove i( from start and )) from end then split values by using the separator (.
			return '<img loading="lazy" src="' . $values[1] . '" alt="' . $values[0] . '" />';
		}
	],
	[
		'desc' => '/F\([^)]+\([^)]+\([^)]+\){3}/i', // f(legend(alternative(url)))
		'output' => function ($content) {
			$values = explode('(', substr($content[0], 2, -3)); // Remove f( from start and ))) from end then split values by using the separator (.
			return '<figure><img loading="lazy" src="' . $values[2] . '" alt="' . $values[1] . '" /><figcaption>' . $values[0] . '</figcaption></figure>';
		}
	],
	[
		'desc' => '/A\([^()]+\([^()]+\){2}/i', // a(label(url))
		'output' => function ($content) {
			$values = explode('(', substr($content[0], 2, -2)); // Remove a( from start and )) from end then split values by using the separator (.
			return '<a href="' . $values[1] . '">' . $values[0] . '</a>';
		}
	],
	[
		'desc' => '/S\([^)]+\)/i', // s(text)
		'output' => function ($content) {
			return '<strong>' . substr($content[0], 2, -1) . '</strong>';
		}
	],
	[
		'desc' => '/E\([^)]+\)/i', // e(text)
		'output' => function ($content) {
			return '<em>' . substr($content[0], 2, -1) . '</em>';
		}
	],
	[
		'desc' => '/O\({3}.+\){3}/i', // o(((value)))
		'output' => function ($content) {
			return '<ol>' . substr($content[0], 2, -1) . '</ol>';
		}
	],
	[
		'desc' => '/U\({3}.+\){3}/i', // u(((value)))
		'output' => function ($content) {
			return '<ul>' . substr($content[0], 2, -1) . '</ul>';
		}
	],
	[
		'desc' => '/\({2}[^()]+\){2}/i', // ((value)) only inside o() or u()
		'output' => function ($content) {
			return '<li>' . substr($content[0], 2, -2) . '</li>';
		}
	]
];