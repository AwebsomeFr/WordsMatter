<?php 

require './config.php';

if(
	isset($_POST['EditorId']) && 
	isset($_POST['dirName']) &&
	$_POST['EditorId'] === EDITOR_ID
) { 
	define('DRAFT', INPUT_DIR . '/' . $_POST['dirName'] . '/draft.txt');
	echo file_get_contents(DRAFT);
}