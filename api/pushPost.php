<?php header('Access-Control-Allow-Origin: *');

/* 
	Job : push a post to the server.
	Return : 'update' or 'release' the first time, 'success' if done the second.
	To : /app/js/functions.js | pushPost
*/

if(isset($_POST['editorId']) && isset($_POST['post']) && isset($_POST['validation'])) {

	require './config.php';

	if($_POST['editorId'] === EDITOR_ID) {

		$post = json_decode($_POST['post']);
		
		$n = strtolower($post->title); // To lowercase.
		$n = str_replace([' ','à','á','â','ã','ä','ç','é','è','ê','ë','ì','í','î','ï','ò','ó','ô','õ','ö','š','ú','ù','û','ü','ý','ÿ','ž'], ['-','a','a','a','a','a','c','e','e','e','e','i','i','i','i','o','o','o','o','o','s','u','u','u','u','y','y','z'], $n); // No accents.
		$n = str_replace([' ', '\''], ['-','-'], $n); // No spaces, no hyphens.
		$n = preg_replace('/[^a-zA-Z0-9\-]/', '', $n); // No special characters except dashes.
		$n = preg_replace('/\-{2,}/', '-', $n); // Remove any extra dashes.
		$n = preg_replace('/^\-/', '', $n); // Remove dash from start.
		$n = preg_replace('/\-$/', '', $n); // Remove dash from end.
				
		define('POST_DIR_NAME', $n); // name-of-the-post/index.html
		define('POST_OUTPUT_DIR', OUTPUT_DIR . '/' . POST_DIR_NAME); // path/to/outputs/name-of-the-post/index.html
		define('POST_INPUT_DIR', INPUT_DIR . '/' . POST_DIR_NAME); // path/to/inputs/name-of-the-post/draft.txt 

		// Validation is false ? Ask user confirmation first !
		if($_POST['validation'] === 'false') {		
			echo is_dir(POST_INPUT_DIR) ? 
				'update' : // Update a existing post. 
				'release'; // Publish a new post. 
			exit;
		}

		// Validation is true ? Proceed !
		else if($_POST['validation'] === 'true') {

			// Update the JSON index.
			
				$posts = json_decode(file_get_contents(JSON_INDEX));

				for($i = 0, $l = count($posts); $i < $l; $i++) {
					// Current post already exists ? Pop it.
					if($posts[$i]->dir === POST_DIR_NAME) {
						array_splice($posts, $i, 1);
						break;
					}
				}
				
				// Add the current post to the array.
				array_unshift($posts, 
				(object) array(
					'date' => $post->date,
					'title' => $post->title,
					'dir' => POST_DIR_NAME,
					'isDraft' => $post->isDraft,
					)
				);

				file_put_contents(JSON_INDEX, json_encode($posts));

			// Update the HTML index.

				require './tpl-index.php';
				file_put_contents(HTML_INDEX, buildHtmlIndex($posts));

			// Store raw content for future edition (input).

				if(!is_dir(POST_INPUT_DIR)) {
					mkdir(POST_INPUT_DIR);
				}
				file_put_contents(POST_INPUT_DIR . '/' . INPUT_FILENAME, $_POST['post']);
				
			// Build or remove post (output).

				if($post->isDraft) {
					if(is_dir(POST_OUTPUT_DIR)) {
						if(is_file(POST_OUTPUT_DIR . '/' . OUTPUT_FILENAME)) {
							unlink(POST_OUTPUT_DIR . '/' . OUTPUT_FILENAME);
						}
						rmdir(POST_OUTPUT_DIR);
					}
				}

				else {

					require './tpl-post.php';
					require './regex.php';

					function runEditor ($input, $regex) {

						$output = $input;
					
						// Striping source tags to prevent unexpected HTML.	
						$output = preg_replace('/(<([^>]+)>)/i', '', $output);
			
						for($i = 0, $l = count($regex); $i < $l; $i++) {
							$output = preg_replace_callback($regex[$i]['desc'], $regex[$i]['output'], $output);
						}
						
						return $output;
							
					}

					$output = (object) array(
						'date' => $post->date,
						'title' => $post->title,
						'introduction' => runEditor($post->introduction, $regex),
						'sections' => []
					);
					if($post->sections != null) {
						foreach ($post->sections as $section) {
							array_push($output->sections, 
								(object) array(
									'title' => $section->title,
									'content' => runEditor($section->content, $regex)
								)
							);
						}
					}

					if(!is_dir(POST_OUTPUT_DIR)) {
						mkdir(POST_OUTPUT_DIR);
					}

					file_put_contents(POST_OUTPUT_DIR . '/' . OUTPUT_FILENAME, buildHtmlPost($output));

				}

			echo 'success';

		}
	
	}

}