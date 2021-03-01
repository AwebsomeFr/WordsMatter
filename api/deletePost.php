<?php

/* 
	Job : delete a post from the server.
	Return : 'success' if done.
	To : /app/js/functions.js | deletePost
*/

if(isset($_POST['editorId']) && isset($_POST['post'])) {

	require './config.php';

	if($_POST['editorId'] === EDITOR_ID) {

		define('POST_DIR_NAME', $_POST['post']); // name-of-the-post/index.html
		define('POST_OUTPUT_DIR', OUTPUT_DIR . '/' . POST_DIR_NAME); // path/to/outputs/name-of-the-post/index.html
		define('POST_INPUT_DIR', INPUT_DIR . '/' . POST_DIR_NAME); // path/to/inputs/name-of-the-post/draft.txt

		// Delete input content.
		
			if(is_dir(POST_INPUT_DIR)) {
				if(is_file(POST_INPUT_DIR . '/' . INPUT_FILENAME)) {
					unlink(POST_INPUT_DIR . '/' . INPUT_FILENAME);
				}
				rmdir(POST_INPUT_DIR);
			}

		// Delete output content.
	
			if(is_dir(POST_OUTPUT_DIR)) {
				if(is_file(POST_OUTPUT_DIR . '/' . OUTPUT_FILENAME)) {
					unlink(POST_OUTPUT_DIR . '/' . OUTPUT_FILENAME);
				}
				rmdir(POST_OUTPUT_DIR);
			}
	
		// Update the JSON index.
		
			$posts = json_decode(file_get_contents(JSON_INDEX));
			
			for($i = 0, $l = count($posts); $i < $l; $i++) {
				if($posts[$i]->dir === $_POST['post']) {
					array_splice($posts, $i, 1);
					break;
				}
			}
			
			file_put_contents(JSON_INDEX, json_encode($posts));

		// Update the HTML index.
		
			require './tpl-index.php';
			file_put_contents(HTML_INDEX, buildHtmlIndex($posts));

		echo 'success';

	}

}