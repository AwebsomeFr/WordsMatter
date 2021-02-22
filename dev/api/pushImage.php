<?php 

/* 
	Job : upload an image in the gallery.
	Return : 'success' if done.
	To : /app/js/functions.js | pushImage
*/

if(isset($_FILES) && isset($_POST['editorId']) && isset($_POST['compress'])) {

	require './config.php';

	if($_POST['editorId'] === EDITOR_ID) { 

		// Is the file size less than 1Mb ?
		if($_FILES['file']['size'] <= 1000000) {

			$compress = $_POST['compress'];

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
				define('IMG_THUMB_SIZE', 200);
	
				define('IMG_NORMAL_PATH', GALLERY_DIR . '/normals/' . $filename);
				define('IMG_NORMAL_SIZE', 768);
				
				move_uploaded_file($_FILES['file']['tmp_name'], IMG_NORMAL_PATH);

				switch(IMG_TYPE) {
							
					case 'image/png':
						$thumb = imagecreatefrompng(IMG_NORMAL_PATH);
						$orig = imagecreatefrompng(IMG_NORMAL_PATH);
						break;

					case 'image/jpeg':
						$thumb = imagecreatefromjpeg(IMG_NORMAL_PATH);
						$orig = imagecreatefromjpeg(IMG_NORMAL_PATH);
						break;

					case 'image/webp':
						$thumb = imagecreatefromwebp(IMG_NORMAL_PATH);
						$orig = imagecreatefromwebp(IMG_NORMAL_PATH);
						break;

				}

				// Scale if more than...
				if(imagesx($thumb) > IMG_THUMB_SIZE) {
					$thumb = imagescale($thumb, IMG_THUMB_SIZE);
				}
				if(imagesx($orig) > IMG_NORMAL_SIZE) {
					$orig = imagescale($orig, IMG_NORMAL_SIZE);
				}

				// Export with compression (or not).
				switch(IMG_TYPE) {
							
					case 'image/png':
						imagepng($thumb, IMG_THUMB_PATH, 9);
						$compress === "true" ?		
							imagepng($orig, IMG_NORMAL_PATH,9):
							imagepng($orig, IMG_NORMAL_PATH);
							break;

					case 'image/jpeg':
						imagejpeg($thumb, IMG_THUMB_PATH, 75);
						$compress === "true" ?		
							imagejpeg($orig, IMG_NORMAL_PATH,85):
							imagejpeg($orig, IMG_NORMAL_PATH);
							break;

					case 'image/webp':
						imagewebp($thumb, IMG_THUMB_PATH, 75);
						$compress === "true" ?		
							imagewebp($orig, IMG_NORMAL_PATH,85):
							imagewebp($orig, IMG_NORMAL_PATH);
							break;

				}

				echo 'success';
	
			}
	
		}
	
	}

}