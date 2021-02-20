<?php 

/* 
	Job : Check that the application matches the API and create necessary files and directories. 
	Return : 'granted' if OK.
	To : /app/js/start.js
*/

if(isset($_POST['editorId'])) {

	require './config.php';
	
	if($_POST['editorId'] === EDITOR_ID) {
	
		if(!is_dir(INPUT_DIR)) {
			mkdir(INPUT_DIR, 0777, true);
		} 
		if(!is_dir(OUTPUT_DIR)) {
			mkdir(OUTPUT_DIR, 0777, true);
		}
		if(!is_dir(GALLERY_DIR)) {
			mkdir(GALLERY_DIR, 0777, true);
			mkdir(GALLERY_DIR . '/thumbs/', 0777, true);
			mkdir(GALLERY_DIR . '/normals/', 0777, true);
	
		}
		if(!file_exists(POSTS_INDEX)) {
			file_put_contents(POSTS_INDEX, '[]');
		}
	
		echo 'granted';
	
	}

}