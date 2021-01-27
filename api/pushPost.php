<?php if(
	isset($_POST['EditorId']) && 
	isset($_POST['post']) && 
	isset($_POST['validation'])) 
{ 

	require './config.php';

	// Is the user legitimate ?
	if($_POST['EditorId'] == EDITOR_ID) {

		require './functions.php';
		require './template.php';

		// Is it a draft (title start with %) or a release (title don't start with %) ?
		$rawTitle = json_decode($_POST['post'])->title;
		$draft = $rawTitle[0] === '%' ? true : false;

		// Define an acceptable filename based on the provided title.
		define('FILENAME', buildFileName($rawTitle));

		// Validation is false ? Ask user confirmation !
		if($_POST['validation'] == 'false') {

			// New post ?
			if(!file_exists(INPUT_FOLDER . FILENAME . 'txt')) {
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

			// Raw datas.
			$input = (object) array(
				'title' => json_decode($_POST['post'])->title,
				'introduction' => json_decode($_POST['post'])->introduction,
				'sections' => json_decode($_POST['post'])->sections
			);

			// Export the corresponding WordsMatter backup.
			file_put_contents(INPUT_FOLDER . FILENAME . 'txt', $_POST['post']);
		
			// If draft : remove output file (if existing).
			if($draft) {
				if(file_exists(OUTPUT_FOLDER . FILENAME . OUTPUT_EXTENSION)) {
					unlink(OUTPUT_FOLDER . FILENAME . OUTPUT_EXTENSION);
				}	
			
			}

			// If release : build and add the corresponding output file.
			else {

				require './regex.php';

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

				// Build with the template.
				define('POST', buildPost($output)); 

				// Export generated content.
				file_put_contents(OUTPUT_FOLDER . FILENAME . OUTPUT_EXTENSION, POST);

			}

			// Update the list.
			$posts = json_decode(file_get_contents(POSTS_INDEX));

			for($i = 0, $l = count($posts); $i < $l; $i++) {

				// Is the post already listed into the JSON file ?
				if($posts[$i]->filename === FILENAME) {

					// If yes, remove from the list.
					array_splice($posts, $i, 1);
					break;

				}

			}

			// List the post at the start of the array.
			array_unshift($posts, 
				(object) array(
					"date" => date('Y/m/d'),
					"title" => $input->title,
					"filename" => FILENAME,
					"draft" => $draft
				)
			);
			
			file_put_contents(POSTS_INDEX, json_encode($posts));

			echo 'success';

		}

	}

}