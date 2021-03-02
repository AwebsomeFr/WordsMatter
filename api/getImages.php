<?php 

/* 
	Job : browse and return the content of the gallery.
	Return : a JSON containing the content of the gallery. 
	To : /app/js/functions.js | getImages
*/

if(isset($_POST['editorId'])) {
	
	require './config.php';
	
	 if($_POST['editorId'] === EDITOR_ID) {
	
		$images = [];
	
		foreach(
			array_diff(
				scandir(GALLERY_DIR . '/s'), 
				array('..', '.')
			) 
		as $item) {
	
			array_push(
				$images, array(
					'sImgPath' => R_GALLERY_DIR . '/s/' . $item,
					'lImgPath' => R_GALLERY_DIR . '/l/' . $item,
					'name' => $item
				) 
			);
		
		}
		
		echo json_encode($images);
		
	}

}