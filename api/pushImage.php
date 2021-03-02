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
		if($_FILES['file']['size'] <= IMG_MAX_SIZE) {

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
				
				define('IMG_S_PATH', GALLERY_DIR . '/s/' . $filename);
				define('IMG_M_PATH', GALLERY_DIR . '/m/' . $filename);
				define('IMG_L_PATH', GALLERY_DIR . '/l/' . $filename);

				move_uploaded_file($_FILES['file']['tmp_name'], IMG_M_PATH);

				switch(IMG_TYPE) {
							
					case 'image/png':
						$s = imagecreatefrompng(IMG_M_PATH);
						$m = imagecreatefrompng(IMG_M_PATH);
						$l = imagecreatefrompng(IMG_M_PATH);
						break;

					case 'image/jpeg':
						$s = imagecreatefromjpeg(IMG_M_PATH);
						$m = imagecreatefromjpeg(IMG_M_PATH);
						$l = imagecreatefromjpeg(IMG_M_PATH);
						break;

					case 'image/webp':
						$s = imagecreatefromwebp(IMG_M_PATH);
						$m = imagecreatefromwebp(IMG_M_PATH);
						$l = imagecreatefromwebp(IMG_M_PATH);
						break;

				}

				// Scale if more than...
				if(imagesx($s) > IMG_S_SIZE) {
					$s = imagescale($s, IMG_S_SIZE);
				}
				if(imagesx($m) > IMG_M_SIZE) {
					$m = imagescale($m, IMG_M_SIZE);
				}
				if(imagesx($l) > IMG_L_SIZE) {
					$l = imagescale($l, IMG_L_SIZE);
				}

				// Export with compression (or not).
				switch(IMG_TYPE) {
							
					case 'image/png':
						imagetruecolortopalette($s, false, 255);
						imagepng($s, IMG_S_PATH, 9);
						imagetruecolortopalette($m, false, 255);
						imagepng($m, IMG_M_PATH, 9);
						imagetruecolortopalette($l, false, 255);
						imagepng($l, IMG_L_PATH, 9);
						break;

					case 'image/jpeg':
						imagejpeg($s, IMG_S_PATH, 60);
						imagejpeg($m, IMG_M_PATH, 70);
						imagejpeg($l, IMG_L_PATH, 70);
						break;

					case 'image/webp':
						imagewebp($s, IMG_S_PATH, 60);
						imagewebp($m, IMG_M_PATH, 70);
						imagewebp($l, IMG_L_PATH, 70);
						break;

				}

				echo 'success';
	
			}
	
		}
	
	}

}