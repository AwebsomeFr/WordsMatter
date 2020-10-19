<?php

function runEditor ($inputContent, $regex, $interpret) {

	$datasContent = $inputContent;

	// Striping source tags to prevent unexpected HTML.	
	$datasContent = preg_replace('/(<([^>]+)>)/i', '', $datasContent);
	
	// If $interpret is true, interpret language. 
	if($interpret) {
		for($i = 0, $l = count($regex); $i < $l; $i++) {
			$datasContent = preg_replace_callback($regex[$i]['desc'], $regex[$i]['output'], $datasContent);
		}
	}

	return $datasContent;
		
}

// Create a file name optimized for seo with the title.
function buildFileName ($titlePost) {

	/*

		1. To lowercase > 2. No accents > 3. No spaces, no hyphens > 4. No special characters except dashes > 5. If necessary, remove any extra dashes > 6. If necessary, remove dash from start > 7. If necessary, remove dash from end.

	*/

	/* 1 */ $fileName = strtolower($titlePost);
	/* 2 */ $fileName = str_replace([' ','à','á','â','ã','ä','ç','é','è','ê','ë','ì','í','î','ï','ò','ó','ô','õ','ö','š','ú','ù','û','ü','ý','ÿ','ž'], ['-','a','a','a','a','a','c','e','e','e','e','i','i','i','i','o','o','o','o','o','s','u','u','u','u','y','y','z'], $fileName);
	/* 3 */ $fileName = str_replace([' ', '\''], ['-','-'], $fileName);
	/* 4 */ $fileName = preg_replace('/[^a-zA-Z0-9\-]/', '', $fileName);
	/* 5 */ $fileName = preg_replace('/\-{2,}/', '-', $fileName); 
	/* 6 */ $fileName = preg_replace('/^\-/', '', $fileName);
	/* 7 */ $fileName = preg_replace('/\-$/', '', $fileName);

	return $fileName;

}