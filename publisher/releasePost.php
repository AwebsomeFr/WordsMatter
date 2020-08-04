<?php

// Are all value given ?
if(isset($_POST['EditorId']) && isset($_POST['post']) && isset($_POST['validation'])) { 

	require './config.php';

	// Is the user legitimate ?
	if($_POST['EditorId'] == EDITOR_ID) {

		require './template.php';

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

				1. To lowercase > 2. No accents > 3. No spaces, no hyphens > 4. No special characters except dashes > 5. If necessary, remove any extra dashes > 6. If necessary, remove dashe from start > 7. If necessary, remove dashe from end.

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

		define('FILENAME', buildFileName(json_decode($_POST['post'])->title));

		// Validation is false ? Ask user confirmation !
		if($_POST['validation'] == 'false') {

			// New post ?
			if(!file_exists(OUTPUT_FOLDER . FILENAME . 'OUTPUT_EXTENSION') && !file_exists(INPUT_FOLDER . FILENAME . INPUT_EXTENSION)) {
				echo 'release';
				exit;
			}

			// Existing post ?
			else {
				echo 'update';
				exit;	
			}

		}

		// Validation is true ? Proceed !
		else if($_POST['validation'] == 'true') {

			require './regex.php';

			// Raw datas.
			$input = (object) array(
				'title' => json_decode($_POST['post'])->title,
				'introduction' => json_decode($_POST['post'])->introduction,
				'sections' => json_decode($_POST['post'])->sections
			);

			// HTML produced.
			$output = (object) array(
				'title' => $input->title,
				'introduction' => runEditor($input->introduction, $regex, true),
				'sections' => []
			);
			if($input->sections != null) {
				foreach ($input->sections as $section) {
					array_push($output->sections, 
						(object) array(
							'title' => $section->title,
							'content' => runEditor($section->content, $regex, true)
						)
					);
				}
			}

			define('POST', buildPost($output)); 

			// Export generated content.
			file_put_contents(OUTPUT_FOLDER . FILENAME . OUTPUT_EXTENSION, POST);
			// Export the corresponding WordsMatter backup.
			file_put_contents(INPUT_FOLDER . FILENAME . INPUT_EXTENSION, $_POST['post']);

			// Success ?
			if(file_exists(OUTPUT_FOLDER . FILENAME . OUTPUT_EXTENSION) && 
				file_exists(INPUT_FOLDER . FILENAME . INPUT_EXTENSION)) {
			
				// Update the list.
				$posts = json_decode(file_get_contents(LIST_OF_POSTS));

				for($i = 0, $l = count($posts); $i < $l; $i++) {

					// Is the post already listed into the JSON file ?
					if($posts[$i]->title === $output->title) {

						// If yes, remove from the list.
						array_splice($posts, $i, 1);
						break;

					}

				}

				// List the post at the start of the array.
				array_unshift($posts, 
					(object) array(
						"date" => date('Y/m/d'),
						"title" => $output->title,
						"filename" => FILENAME
					)
				);
				
				file_put_contents(LIST_OF_POSTS, json_encode($posts));
	
				echo 'success';
	
			}

		}

	}

}