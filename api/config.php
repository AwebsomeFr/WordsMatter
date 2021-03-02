<?php // Need more ? Visit : https://awebsome.fr/blog-awebsome/creer-un-blog-ecoresponsable-avec-wordsmatter/ (fr)

// Must be equal to the id specified in 'app/js/config.js'. 
// For safety reasons, create your own ID.
define('EDITOR_ID', 'editor-tjJshBE63cSDDYkEeSZ8NNrNkdHDm5vUuCktkzS24f3uXesgeC'); 

// Relative path, starting from the API location.
define('BLOG_PATH', '../blog'); 

// Absolute path from where the images will be readed.
// The example below is the local url I use to work on this project.
// The most common url for local development with Apache looks like to http://localhost/path/to/images.
// For production, it should look like to https://your-website.com/blog/images.
define('R_GALLERY_DIR', 'http://dev.wordsmatter/blog/images');

// DO NOT CHANGE THE FOLLOWING VALUES WITHOUT KNOWING EXACTLY WHAT YOU ARE DOING.
// (Developer? That's cool, me too)

// DIRECTORIES
define('INPUT_DIR', BLOG_PATH . '/drafts'); // Where will be copied the drafts (public or not).
define('OUTPUT_DIR', BLOG_PATH . '/posts'); // Where the generated files will be copied.
define('GALLERY_DIR', BLOG_PATH . '/images'); // Where the images will be copied / Must point to R_GALLERY_DIR.

// FILES
define('JSON_INDEX', BLOG_PATH . '/index.json'); // Where all posts, public or not, will be indexed for the app.
define('HTML_INDEX', BLOG_PATH . '/index.html'); // Where published posts will be listed for the users. 
define('INPUT_FILENAME', 'draft.txt'); // Default name for the drafts.
define('OUTPUT_FILENAME', 'index.html'); // Default name for the posts.

// GALLERY PRESETS
define('IMG_MAX_SIZE', 1000000); // 1Mb by default.
define('IMG_S_SIZE', 540); 
define('IMG_M_SIZE', 768); 
define('IMG_L_SIZE', 1024); 