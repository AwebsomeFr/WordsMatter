<?php // Automatically return HTTP code 200 when if found by the Application WordsMatter.

require './config.php';

// Is the user legitimate ?
if($_POST['EditorId'] == EDITOR_ID) {

	// Are the folders created ?
	if(!is_dir(INPUT_FOLDER)) {
		mkdir(INPUT_FOLDER, 0777, true);
	} 
	if(!is_dir(OUTPUT_FOLDER)) {
		mkdir(OUTPUT_FOLDER, 0777, true);
	}
	if(!file_exists(POSTS_INDEX)) {
		file_put_contents(POSTS_INDEX, '[]');
	}

}