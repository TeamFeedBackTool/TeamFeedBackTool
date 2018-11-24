<?php
require "config.php";
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
/**
 * Sends all common data that the client-side may needs for visualisation
 */
function SendUserData(){
    echo json_encode(array(
        'email' => $_SESSION['email'],
        'surname' => $_SESSION['surname'],
        'firstname' => $_SESSION['firstname'],
        'userId' => $_SESSION['userId'],
        'lastLogin' => $_SESSION['date']
    ));
}

/**
 * Gives back JSON, has an "infotext", dies at the end (kind of bad, but good enough)
 * @param $errorText
 */
function sendError($errorText){
    echo json_encode(array(
        'status' => '50x',
        'infotext' => $errorText
    ));
    die();
}

/**
 * Gives back regular JSON if a success occurs, has an "infotext", dies at the end (kind of bad, but good enough)
 * @param $successText
 */
function sendSuccess($successText){
    echo json_encode(array(
        'status' => '201',
        'infotext' => $successText
    ));
}


