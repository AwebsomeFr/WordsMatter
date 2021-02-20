<?php 

/* 
	The configuration below must be defined BEFORE the first launch of the Application. 
	If you have already opened WordsMatter, delete the "blog" folder before to start here.
*/

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
	define('POSTS_INDEX', '../blog/index.json'); // Where the list of published articles will be saved.

	// Absolute paths only.
	define('R_GALLERY_DIR', '/blog/medias'); // Where the medias will be readed.

/* 
	FILE EXTENSION
	By default, WordsMatter acts like a static site generator.
	If your template needs it, you can choose to use PHP instead of HTML.
*/

	define('EXTENSION', '.html');