<?php 

require './config.php';

if(
	isset($_POST['editorId']) && 
	isset($_POST['dirName']) &&
	$_POST['editorId'] === EDITOR_ID
) { 
	define('DRAFT', INPUT_DIR . '/' . $_POST['dirName'] . '/draft.txt');
	echo file_get_contents(DRAFT);
}