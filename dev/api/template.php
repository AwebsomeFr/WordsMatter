<?php // Build the final page (datas + template).

function buildPost ($output) {
	
	$post =	

	'<!DOCTYPE html>' .
	'<html>' .
	'<head>' .
		'<meta charset="utf-8" />' .
		'<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />' .
		'<title>' . $output->title . '</title>' .
	'</head>' .
	'<body>' .
		'<main>' .
			'<article>' .
				'<h1>' . $output->title . '</h1>' .
				'<div>' . $output->introduction . '</div>';

				for($i = 0, $l = count($output->sections); $i < $l; $i++) {

					$post .= 
					
					'<section>' .
						'<h2>' . $output->sections[$i]->title . '</h2>' . 
						'<div>' . $output->sections[$i]->content . '</div>' .
					'</section>';

				};

			$post .=

			'</article>' .
		'</main>' .
	'</body>' .
	'</html>';

	return $post;

}