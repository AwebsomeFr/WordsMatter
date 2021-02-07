<?php  require './config.php'; if( isset($_POST['editorId']) && isset($_POST['post']) && isset($_POST['validation']) && $_POST['editorId'] === EDITOR_ID ){ require './functions.php'; $rawTitle = json_decode($_POST['post'])->title; define('DIR_NAME', buildName($rawTitle)); define('OUTPUT_DIR_PATH', OUTPUT_DIR . '/' . DIR_NAME); define('OUTPUT_FILE_NAME', 'index' . $extension); define('INPUT_DIR_PATH', INPUT_DIR . '/' . DIR_NAME); define('INPUT_FILE_NAME', 'draft.txt'); if($_POST['validation'] === 'false') { echo is_dir(INPUT_DIR_PATH) ? 'update' : 'release'; exit; } else if($_POST['validation'] === 'true') { if(!is_dir(INPUT_DIR_PATH)) { mkdir(INPUT_DIR_PATH); } file_put_contents(INPUT_DIR_PATH . '/' . INPUT_FILE_NAME, $_POST['post']); $isDraft = json_decode($_POST['post'])->isDraft; if($isDraft) { if(is_dir(OUTPUT_DIR_PATH)) { if(is_file(OUTPUT_DIR_PATH . '/' . OUTPUT_FILE_NAME)) { unlink(OUTPUT_DIR_PATH . '/' . OUTPUT_FILE_NAME); } rmdir(OUTPUT_DIR_PATH); } } else { require './template.php'; require './regex.php'; $input = (object) array( 'class' => buildName(json_decode($_POST['post'])->class), 'title' => json_decode($_POST['post'])->title, 'introduction' => json_decode($_POST['post'])->introduction, 'sections' => json_decode($_POST['post'])->sections ); $output = (object) array( 'class' => $input->class, 'title' => $input->title, 'introduction' => runEditor($input->introduction, $regex), 'sections' => [] ); if($input->sections != null) { foreach ($input->sections as $section) { array_push($output->sections, (object) array( 'title' => $section->title, 'content' => runEditor($section->content, $regex) ) ); } } if(!is_dir(OUTPUT_DIR_PATH)) { mkdir(OUTPUT_DIR_PATH); } file_put_contents(OUTPUT_DIR_PATH . '/' . OUTPUT_FILE_NAME, buildPost($output)); } $posts = json_decode(file_get_contents(POSTS_INDEX)); for($i = 0, $l = count($posts); $i < $l; $i++) { if($posts[$i]->dir === DIR_NAME) { array_splice($posts, $i, 1); break; } } array_unshift($posts, (object) array( "date" => json_decode($_POST['post'])->date, "title" => json_decode($_POST['post'])->title, "dir" => DIR_NAME, "isDraft" => $isDraft ) ); file_put_contents(POSTS_INDEX, json_encode($posts)); echo 'success'; } }