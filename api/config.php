<?php 

/* The configuration below must be defined BEFORE the first launch of the Application. 
If you have already opened WordsMatter, delete the "blog" folder before to start here. */

/* --- SECURITY --- */

/* Must be equal to the id specified in 'app/js/config.js'. Please create your own and complex ID. */
define('EDITOR_ID', 'editor-tjJshBE63cSDDYkEeSZ8NNrNkdHDm5vUuCktkzS24f3uXesgeC');

/* --- DIRECTORIES / FILES --- */

/* If they do not exist, the following folders and files 
will be created by WordsMatter when connecting 
to the server for the first time. */

// Directory where will be placed the drafts, published or not.
define('INPUT_DIR', '../blog/drafts'); 
// Directory where the generated files will be placed.
define('OUTPUT_DIR', '../blog/posts'); 
// File where the list of published articles will be saved.
define('POSTS_INDEX', '../blog/index.json');

/* --- SITE TYPE --- */

/* By default, WordsMatter acts like a static site generator.
If your template needs it, you can choose to use PHP instead of HTML.
All you have to do is to replace the 'static' keyword by 'dynamic'. */ 

define('SITE_TYPE', 'static'); 

$extension = '.html';

if(SITE_TYPE === 'dynamic') {
	$extension = '.php';
}