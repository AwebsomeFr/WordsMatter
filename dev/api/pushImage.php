<?php 

/* 
	Job : upload an image in the gallery.
	Return : 'success' if done.
	To : /app/js/functions.js | pushImage
*/

if(isset($_FILES) && isset($_POST['editorId'])) {

	require './config.php';

	if($_POST['editorId'] === EDITOR_ID) { 

		// Is the file size less than 1Mb ?
		if($_FILES['file']['size'] <= 1000000) {
	
			define('IMG_TYPE', $_FILES['file']['type']);
	
			if( // Is the mime type accepted ?
				IMG_TYPE === 'image/png' ||
				IMG_TYPE === 'image/jpeg' ||
				IMG_TYPE === 'image/webp'
			) {
				
				// Delete all forbidden characters by dashes.
				$filename = str_replace(['<', '>', ':', '/', '\\', '|', '?', '*', '\"', '(', ')'], '-', $_FILES['file']['name']);
				// Convert multiple dashes to simple dash.
				$filename = preg_replace('/\-{2,}/', '-', $filename);
				// Remove dash before extension.
				$filename = str_replace('-.', '.', $filename); 
				
				define('IMG_THUMB_PATH', GALLERY_DIR . '/thumbs/' . $filename);
				define('IMG_THUMB_SIZE', 220);
	
				define('IMG_NORMAL_PATH', GALLERY_DIR . '/normals/' . $filename);
		
				move_uploaded_file($_FILES['file']['tmp_name'], IMG_NORMAL_PATH);
		
				switch(IMG_TYPE) {
							
					case 'image/png':
						$thumb = imagecreatefrompng(IMG_NORMAL_PATH);
						$thumb = imagescale($thumb, IMG_THUMB_SIZE);
						imagepng($thumb, IMG_THUMB_PATH);
						break;
		
					case 'image/jpeg':
						$thumb = imagecreatefromjpeg(IMG_NORMAL_PATH);
						$thumb = imagescale($thumb, IMG_THUMB_SIZE);
						imagejpeg($thumb, IMG_THUMB_PATH);
						break;
		
					case 'image/webp': 
						$thumb = imagecreatefromwebp(IMG_NORMAL_PATH);
						$thumb = imagescale($thumb, IMG_THUMB_SIZE);
						imagewebp($thumb, IMG_THUMB_PATH);
						break;
		
				};
	
				echo 'success';
	
			}
	
		}
	
	}

}