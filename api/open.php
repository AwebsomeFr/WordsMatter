<?php

// Are all value given ?
if(isset($_POST['EditorId']) && isset($_POST['filename'])) { 

	require './config.php';

	// Is the user legitimate ?	
	if($_POST['EditorId'] == EDITOR_ID) {

		// Proceed (return the content of the selected post).
		echo file_get_contents(
			INPUT_DIR . $_POST['filename'] . 'txt'
		);

	}

}