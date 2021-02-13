<?php

ini_set('display_errors', true);
ini_set('html_errors', false);
error_reporting(E_ALL);

/* 
Job : delete an image of the gallery.
Return : 'success' if done.
To : /app/js/functions.js | deleteFromGallery
*/

if(isset($_POST['picture']) && isset($_POST['editorId'])) {

	require './config.php';

	if($_POST['editorId'] === EDITOR_ID) { 
		
		if(
			unlink(GALLERY_DIR . '/thumbs/' . $_POST['picture']) &&
			unlink(GALLERY_DIR . '/normals/' . $_POST['picture'])
		) {
		   
			echo 'success';

		}
	
	}

}