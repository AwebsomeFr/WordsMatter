<?php $regex = [ [ 'desc' => '/\s{2}\n/i', 'output' => function ($content) { return '<br/>'; } ], [ 'desc' => '/^(?!3|4|5|6|f|i|o|u).+$/m', 'output' => function ($content) { return '<p>' . $content[0] . '</p>'; } ], [ 'desc' => '/^3\([^)]+\)$/mi', 'output' => function ($content) { return '<h3>' . substr($content[0], 2, -1) . '</h3>'; } ], [ 'desc' => '/^4\([^)]+\)$/mi', 'output' => function ($content) { return '<h4>' . substr($content[0], 2, -1) . '</h4>'; } ], [ 'desc' => '/^5\([^)]+\)$/mi', 'output' => function ($content) { return '<h5>' . substr($content[0], 2, -1) . '</h5>'; } ], [ 'desc' => '/^6\([^)]+\)$/mi', 'output' => function ($content) { return '<h6>' . substr($content[0], 2, -1) . '</h6>'; } ], [ 'desc' => '/I\([^()]+\([^()]+\){2}/i', 'output' => function ($content) { $values = explode('(', substr($content[0], 2, -2)); return '<img loading="lazy" src="' . $values[1] . '" alt="' . $values[0] . '" />'; } ], [ 'desc' => '/F\([^)]+\([^)]+\([^)]+\){3}/i', 'output' => function ($content) { $values = explode('(', substr($content[0], 2, -3)); return '<figure><img loading="lazy" src="' . $values[2] . '" alt="' . $values[1] . '" /><figcaption>' . $values[0] . '</figcaption></figure>'; } ], [ 'desc' => '/A\([^()]+\([^()]+\){2}/i', 'output' => function ($content) { $values = explode('(', substr($content[0], 2, -2)); return '<a href="' . $values[1] . '">' . $values[0] . '</a>'; } ], [ 'desc' => '/S\([^)]+\)/i', 'output' => function ($content) { return '<strong>' . substr($content[0], 2, -1) . '</strong>'; } ], [ 'desc' => '/E\([^)]+\)/i', 'output' => function ($content) { return '<em>' . substr($content[0], 2, -1) . '</em>'; } ], [ 'desc' => '/O\({3}.+\){3}/i', 'output' => function ($content) { return '<ol>' . substr($content[0], 2, -1) . '</ol>'; } ], [ 'desc' => '/U\({3}.+\){3}/i', 'output' => function ($content) { return '<ul>' . substr($content[0], 2, -1) . '</ul>'; } ], [ 'desc' => '/\({2}[^()]+\){2}/i', 'output' => function ($content) { return '<li>' . substr($content[0], 2, -2) . '</li>'; } ] ];