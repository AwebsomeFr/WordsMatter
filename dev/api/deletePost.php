<?php

ini_set('display_errors', true);
ini_set('html_errors', false);
error_reporting(E_ALL);

/* 
	Job : delete a post from the server.
	Return : 'success' if done.
	To : /app/js/functions.js | deletePost
*/

if(isset($_POST['editorId']) && isset($_POST['post'])) {

	require './config.php';

	if($_POST['editorId'] === EDITOR_ID) {

		define('DIR_NAME', $_POST['post']);
		define('OUTPUT_DIR_PATH', OUTPUT_DIR . '/' . DIR_NAME); 
		define('OUTPUT_FILE_NAME', 'index' . EXTENSION);
		define('INPUT_DIR_PATH', INPUT_DIR . '/' . DIR_NAME); 
		define('INPUT_FILE_NAME', 'draft.txt');

		// Delete output content.
		if(is_dir(OUTPUT_DIR_PATH)) {
			if(is_file(OUTPUT_DIR_PATH . '/' . OUTPUT_FILE_NAME)) {
				unlink(OUTPUT_DIR_PATH . '/' . OUTPUT_FILE_NAME);
			}
			rmdir(OUTPUT_DIR_PATH);
		}

		// Delete input content.
		if(is_dir(INPUT_DIR_PATH)) {
			if(is_file(INPUT_DIR_PATH . '/' . INPUT_FILE_NAME)) {
				unlink(INPUT_DIR_PATH . '/' . INPUT_FILE_NAME);
			}
			rmdir(INPUT_DIR_PATH);
		}
			
		// Delete the element from the JSON index.
		$posts = json_decode(file_get_contents(POSTS_INDEX));
		for($i = 0, $l = count($posts); $i < $l; $i++) {
			if($posts[$i]->dir === $_POST['post']) {
				array_splice($posts, $i, 1);
				break;
			}
		}
		file_put_contents(POSTS_INDEX, json_encode($posts));

		echo 'success';

	}

}