<?php function buildHtmlPost ($post) {
	
	$tpl =

		'<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
			<title>' . $post->title . '</title>
		</head>
		<body>
			<main>
				<article>
					<h1>' . $post->title . '</h1>
					<div>' . $post->introduction . '</div>';

					for($i = 0, $l = count($post->sections); $i < $l; $i++) {

						$tpl .= '
							
							<section>
								<h2>' . $post->sections[$i]->title . '</h2> 
								<div>' . $post->sections[$i]->content . '</div>
							</section>';

					};

	$tpl .=

				'</article>
			</main>
		</body>
		</html>';

	return $tpl;

}