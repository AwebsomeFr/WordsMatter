<?php 

/* The configuration below must be defined BEFORE the first launch of the Application. 
If you have already opened WordsMatter, delete the "blog" folder before to start here. */

/* Must be equal to the id specified in the file : 'app/js/config.js'. Please create your own and complex ID. */
define('EDITOR_ID', 'editor-tjJshBE63cSDDYkEeSZ8NNrNkdHDm5vUuCktkzS24f3uXesgeC');

/* If they do not exist, the following folders and files 
will be created by WordsMatter when connecting 
to the server for the first time. */

// Directory where will be placed the drafts, published or not.
define('INPUT_FOLDER', '../blog/drafts/'); 
// Directory where the generated files will be placed.
define('OUTPUT_FOLDER', '../blog/posts/'); 
// File where the list of published articles will be saved.
define('POSTS_INDEX', '../blog/index.json'); 
 
/* The following extensions can be changed. */
define('OUTPUT_EXTENSION', '.html');