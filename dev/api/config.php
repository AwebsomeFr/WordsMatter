<?php 

// ID
	 
	// Must be equal to the id specified in 'app/js/config.js'. 
	// For safety reasons, create your own and complex ID. 
	define('EDITOR_ID', 'editor-tjJshBE63cSDDYkEeSZ8NNrNkdHDm5vUuCktkzS24f3uXesgeC'); 

// PATHS

	// The following directories / files will be created by WordsMatter.

	// Relative paths only.

		define('INPUT_DIR', '../blog/drafts'); // Where will be copied the drafts (public or not). 
		define('OUTPUT_DIR', '../blog/posts'); // Where the generated files will be copied.
		define('GALLERY_DIR', '../blog/medias'); // Where the medias will be copied.	
		define('JSON_INDEX', '../blog/index.json'); // Where all posts will be indexed for the app (public or not).	
		define('HTML_INDEX', '../blog/index.html'); // Where published posts will be listed for the users. 

	// Absolute paths only.

		define('R_GALLERY_DIR', '/blog/medias'); // From where the medias will be readed.

// FILENAMES

	define('INPUT_FILENAME', 'draft.txt');
	define('OUTPUT_FILENAME', 'index.html'); // If your template needs it, you can choose to use PHP instead of HTML.

// GALLERY PRESETS

	define('IMG_MAX_SIZE', 1000000); // 1Mb by default. Please stay reasonable (and consider server limitations) !
	define('IMG_NORMAL_SIZE', 768); // Maximum width applied to images loaded in the gallery. 
	define('IMG_THUMB_SIZE', 200); // Should not change: the application limits the display to 200px.