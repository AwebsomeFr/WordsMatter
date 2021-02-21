<?php
 if(isset($_POST['editorId'])) { require './config.php'; if($_POST['editorId'] === EDITOR_ID) { echo file_get_contents(JSON_INDEX); } }