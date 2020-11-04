<?php

// Are all value given ?
if(isset($_POST['EditorId']) && isset($_POST['filename'])) { 

	require './config.php';

	// Is the user legitimate ?	
	if($_POST['EditorId'] == EDITOR_ID) {

		// Proceed (delete the selected post).
		// Remove input file.
		unlink(INPUT_FOLDER . $_POST['filename'] . INPUT_EXTENSION);
		// Remove output file (if existing).
		if(file_exists(OUTPUT_FOLDER . $_POST['filename'] . OUTPUT_EXTENSION)) {
			unlink(OUTPUT_FOLDER . $_POST['filename'] . OUTPUT_EXTENSION);
		}

		// Success ?
		if(!file_exists(INPUT_FOLDER . $_POST['filename'] . INPUT_EXTENSION) 
			&& !file_exists(OUTPUT_FOLDER . $_POST['filename'] . OUTPUT_EXTENSION)) {

			// Update the list.
			$posts = json_decode(file_get_contents(POSTS_INDEX));

			for($i = 0, $l = count($posts); $i < $l; $i++) {

				if($posts[$i]->filename === $_POST['filename']) {

					// Remove from the list.
					array_splice($posts, $i, 1);
					break;

				}

			}

			file_put_contents(POSTS_INDEX, json_encode($posts));

			echo 'success';

		}

	}

}