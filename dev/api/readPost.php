<?php

ini_set('display_errors', true);
ini_set('html_errors', false);
error_reporting(E_ALL);

/* 
Job : read and return the content of the selected post from its draft.
Return : a JSON containing the content of the post.
To : /app/js/functions.js | readPost
*/

if(isset($_POST['editorId']) && isset($_POST['post'])) {

	require './config.php';

	if($_POST['editorId'] === EDITOR_ID) {

		echo file_get_contents(INPUT_DIR . '/' . $_POST['post'] . '/draft.txt');
		
	}

}