<?php function buildHtmlIndex ($posts) {

	$tpl =	

		'<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
			<title>Blog</title>
		</head>
		<body>
			<main>
				<article>
					<ul>';
					 	// Is there at least one post ?
						if(count($posts) >= 1) {
							for($i = 0, $l = count($posts); $i < $l; $i++) {
								// Add public posts only.
								if(!$posts[$i]->isDraft) { 
									$tpl .= 
										'<li>
											<a href="' .  OUTPUT_DIR . '/' . $posts[$i]->dir . '">' . 
											$posts[$i]->title . ' 
											</a>
										</li>'; 
								}
							}
						}
			
	$tpl .=
	
					'</ul>
				</article>
			</main>
		</body>
		</html>';

	return $tpl;

}