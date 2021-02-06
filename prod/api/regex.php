<?php $regex = [ [ 'desc' => '/\s{2}\n/i', 'output' => function ($ct) { return '<br/>'; } ], [ 'desc' => '/^(?!3_|4_|5_|6_|_\s|__\s|\!\[[^\]]+\]\([^\)]+\)).+$/m', 'output' => function ($ct) { return '<p>' . $ct[0] . '</p>'; } ], [ 'desc' => '/^3_.+$/mi', 'output' => function ($ct) { return '<h3>' . substr($ct[0], 2) . '</h3>'; } ], [ 'desc' => '/^4_.+$/mi', 'output' => function ($ct) { return '<h4>' . substr($ct[0], 2) . '</h4>'; } ], [ 'desc' => '/^5_.+$/mi', 'output' => function ($ct) { return '<h5>' . substr($ct[0], 2) . '</h5>'; } ], [ 'desc' => '/^6_.+$/mi', 'output' => function ($ct) { return '<h6>' . substr($ct[0], 2) . '</h6>'; } ], [ 'desc' => '/\!\[[^\]]+\]\([^\)]+\)/i', 'output' => function ($ct) { $dt = explode('](', substr($ct[0], 2, -1)); $dt[0] = explode('|', $dt[0]); return count($dt[0]) > 1 ? '<figure>' . '<img loading="lazy" src="' . $dt[1] . '" alt="' . $dt[0][0] . '" />' . '<figcaption>' . $dt[0][1] . '</figcaption>' . '</figure>' : '<img loading="lazy" src="' . $dt[1] . '" alt="' . $dt[0][0] . '" />'; } ], [ 'desc' => '/\[[^\]]+\]\([^\)]+\)/i', 'output' => function ($ct) { $dt = explode('](', substr($ct[0], 1, -1)); return '<a href="' . $dt[1] . '">' . $dt[0] . '</a>'; } ], [ 'desc' => '/(^__\s.*\n){1,}/im', 'output' => function ($ct) { return '<ol>' . $ct[0] . '</ol>'; } ], [ 'desc' => '/^(<ol>)?__\s.+/im', 'output' => function ($ct) { return strpos($ct[0], '<ol>__') === 0 ? '<ol><li>' . substr($ct[0], 7) . '</li>' : '<li>' . substr($ct[0], 3) . '</li>'; } ], [ 'desc' => '/(^_\s.*\n){1,}/im', 'output' => function ($ct) { return '<ul>' . $ct[0] . '</ul>'; } ], [ 'desc' => '/^(<ul>)?_\s.+/im', 'output' => function ($ct) { return strpos($ct[0], '<ul>_') === 0 ? '<ul><li>' . substr($ct[0], 6) . '</li>' : '<li>' . substr($ct[0], 2) . '</li>'; } ], [ 'desc' => '/_{2}[^_]+_{2}/i', 'output' => function ($ct) { return '<strong>' . substr($ct[0], 2, -2) . '</strong>'; } ], [ 'desc' => '/_[^_]+_/i', 'output' => function ($ct) { return '<em>' . substr($ct[0], 1, -1) . '</em>'; } ], ];