<?php  ini_set('display_errors', true); ini_set('html_errors', false); error_reporting(E_ALL); if(isset($_POST['editorId'])) { require './config.php'; if($_POST['editorId'] === EDITOR_ID) { $files = []; foreach( array_diff( scandir(GALLERY_DIR . '/thumbs'), array('..', '.') ) as $item) { array_push( $files, array( 'normalPath' => GALLERY_DIR . '/normals/' . $item, 'thumbPath' => GALLERY_DIR . '/thumbs/' . $item, 'name' => $item ) ); } echo json_encode($files); } }