<?php

ini_set('display_errors', true);
ini_set('html_errors', false);
error_reporting(E_ALL);

/* 
Job : get the list of the posts on the server.
Return : a JSON containing the list of the posts.
To : /app/js/functions.js | getPosts
*/

if(isset($_POST['editorId'])) {

	require './config.php';

	if($_POST['editorId'] === EDITOR_ID) {

		echo file_get_contents(POSTS_INDEX);

	}

}