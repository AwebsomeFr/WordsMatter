<?php 

require './config.php';

if(
	isset($_POST['editorId']) && 
	$_POST['editorId'] === EDITOR_ID
) { 
	echo file_get_contents(POSTS_INDEX);
}