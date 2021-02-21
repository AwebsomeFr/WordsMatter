<?php

/* 
	SECURITY
	Must be equal to the id specified in 'app/js/config.js'. 
	Please create your own and complex ID. 
*/

	define('EDITOR_ID', 'editor-tjJshBE63cSDDYkEeSZ8NNrNkdHDm5vUuCktkzS24f3uXesgeC');

/* 
	DIRECTORIES / FILES
	If they do not exist, the following folders and files 
	will be created by WordsMatter when connecting 
	to the server. 
*/

	// Relative paths only.

		define('INPUT_DIR', '../blog/drafts'); // Where will be copied the drafts, published or not. 
		define('OUTPUT_DIR', '../blog/posts'); // Where the generated files will be copied.
		define('GALLERY_DIR', '../blog/medias'); // Where the medias will be copied.
		
		// Where all posts (public or not) will be indexed.
		// Used by the app to list available content.
		define('JSON_INDEX', '../blog/index.json');
		
		// Where published posts only will be listed.
		// Used by the users to access content.
		define('HTML_INDEX', '../blog/index.html'); 
	

	// Absolute paths only.

		define('R_GALLERY_DIR', '/blog/medias'); // From where the medias will be readed.

/* 
	FILENAMES
	By default, WordsMatter acts like a static site generator.
	If your template needs it, you can choose to use PHP instead of HTML.
*/

	define('OUTPUT_FILENAME', 'index.html');
	define('INPUT_FILENAME', 'draft.txt');