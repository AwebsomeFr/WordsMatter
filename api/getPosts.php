<?php

/* 
	Job : get the list of the posts on the server.
	Return : a JSON containing the list of the posts.
	To : /app/js/functions.js | getPosts
*/

if(isset($_POST['editorId'])) {

	require './config.php';

	if($_POST['editorId'] === EDITOR_ID) {

		echo file_get_contents(JSON_INDEX);

	}

}