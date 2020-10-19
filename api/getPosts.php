<?php

// Are all value given ?
if(isset($_POST['EditorId'])) { 

	require './config.php';

	// Is the user legitimate ?	
	if($_POST['EditorId'] == EDITOR_ID) {

		echo file_get_contents(POSTS_INDEX);

	}

}