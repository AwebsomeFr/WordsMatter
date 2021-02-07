<?php 

require './config.php';

if(
	isset($_POST['editorId']) &&  
	isset($_POST['post']) && 
	isset($_POST['validation']) &&
	$_POST['editorId'] === EDITOR_ID
){ 

	require './functions.php';

	$rawTitle = json_decode($_POST['post'])->title;
		
	define('DIR_NAME', buildName($rawTitle)); // Name of the post, represented by its parent directory.
	define('OUTPUT_DIR_PATH', OUTPUT_DIR . '/' . DIR_NAME); 
	define('OUTPUT_FILE_NAME', 'index' . $extension);
	define('INPUT_DIR_PATH', INPUT_DIR . '/' . DIR_NAME); 
	define('INPUT_FILE_NAME', 'draft.txt');
	
	// Validation is false ? Ask user confirmation first !
	if($_POST['validation'] === 'false') {		
		echo is_dir(INPUT_DIR_PATH) ? 
			'update' : // Update a existing post. 
			'release'; // Publish a new post. 
		exit;
	}

	// Validation is true ? Proceed !
	else if($_POST['validation'] === 'true') {

		// Export / update raw content for future edition.
		if(!is_dir(INPUT_DIR_PATH)) {
			mkdir(INPUT_DIR_PATH);
		}
		file_put_contents(INPUT_DIR_PATH . '/' . INPUT_FILE_NAME, $_POST['post']);
		
		// If it is only a draft, remove any output content...
		$isDraft = json_decode($_POST['post'])->isDraft;
		if($isDraft) {
			if(is_dir(OUTPUT_DIR_PATH)) {
				if(is_file(OUTPUT_DIR_PATH . '/' . OUTPUT_FILE_NAME)) {
					unlink(OUTPUT_DIR_PATH . '/' . OUTPUT_FILE_NAME);
				}
				rmdir(OUTPUT_DIR_PATH);
			}
		}

		// ...Else, build it and export / update it too.
		else {

			require './template.php';
			require './regex.php';

			$input = (object) array(
				'class' => buildName(json_decode($_POST['post'])->class),
				'title' => json_decode($_POST['post'])->title,
				'introduction' => json_decode($_POST['post'])->introduction,
				'sections' => json_decode($_POST['post'])->sections
			);

			$output = (object) array(
				'class' => $input->class,
				'title' => $input->title,
				'introduction' => runEditor($input->introduction, $regex),
				'sections' => []
			);

			if($input->sections != null) {
				foreach ($input->sections as $section) {
					array_push($output->sections, 
						(object) array(
							'title' => $section->title,
							'content' => runEditor($section->content, $regex)
						)
					);
				}
			}

			if(!is_dir(OUTPUT_DIR_PATH)) {
				mkdir(OUTPUT_DIR_PATH);
			}
			file_put_contents(OUTPUT_DIR_PATH . '/' . OUTPUT_FILE_NAME, buildPost($output));

		}

		$posts = json_decode(file_get_contents(POSTS_INDEX));
		
		// If the post is already in, remove from the list first.
		for($i = 0, $l = count($posts); $i < $l; $i++) {
			if($posts[$i]->dir === DIR_NAME) {
				array_splice($posts, $i, 1);
				break;
			}
		}
		// Then list the post at the start of the array.
		array_unshift($posts, 
			(object) array(
				"date" => json_decode($_POST['post'])->date,
				"title" => json_decode($_POST['post'])->title,
				"dir" => DIR_NAME,
				"isDraft" => $isDraft
			)
		);
		file_put_contents(POSTS_INDEX, json_encode($posts));

		echo 'success';

	}

}