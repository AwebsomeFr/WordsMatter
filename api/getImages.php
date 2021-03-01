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
				scandir(GALLERY_DIR . '/thumbs'), 
				array('..', '.')
			) 
		as $item) {
	
			array_push(
				$images, array(
					'normalPath' => R_GALLERY_DIR . '/normals/' . $item,
					'thumbPath' => R_GALLERY_DIR . '/thumbs/' . $item,
					'name' => $item
				) 
			);
		
		}
		
		echo json_encode($images);
		
	}

}