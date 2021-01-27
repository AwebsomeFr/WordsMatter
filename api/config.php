<?php 

/* The configuration below must be defined BEFORE the first launch of the Application. 
If you have already opened WordsMatter, simply delete the "blog" folder before to start here. */

/* Must be equal to the id specified in the file : 'app/js/config.js'. 
!!! CREATE YOUR OWN AND COMPLEX ID !!! */
define('EDITOR_ID', 'editor-tjJshBE63cSDDYkEeSZ8NNrNkdHDm5vUuCktkzS24f3uXesgeC');

/* If they do not exist, the following folders and files 
will be created by WordsMatter when connecting 
to the server for the first time. */

// Where the original files and drafts (input) will be placed (.txt).
define('INPUT_FOLDER', '../blog/drafts/'); 
// Where the generated files (output) will be placed (.html by default).
define('OUTPUT_FOLDER', '../blog/posts/'); 
// Where the list of the posts will be placed (.json).
define('POSTS_INDEX', '../blog/index.json'); 
 
/* The following extensions can be changed. */
define('OUTPUT_EXTENSION', '.html');
define('INPUT_EXTENSION', '.txt');