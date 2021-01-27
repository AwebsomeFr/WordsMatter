<?php 

require './config.php';

if(
	isset($_POST['EditorId']) && 
	$_POST['EditorId'] === EDITOR_ID
) { 
	echo file_get_contents(POSTS_INDEX);
}