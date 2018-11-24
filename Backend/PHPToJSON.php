<?php
require "config.php";
session_start();

//Sends all common data that the client-side may needs for visualisation
function SendUserData(){
    echo json_encode(array(
        'email' => $_SESSION['email'],
        'surname' => $_SESSION['surname'],
        'firstname' => $_SESSION['firstname'],
        'userId' => $_SESSION['userId'],
        'lastLogin' => $_SESSION['date']
    ));
}

//Gives back regular JSON if an error occurs, has an "infotext", dies at the end (kind of bad, but good enough)
function sendError($errorText){
    echo json_encode(array(
        'status' => '50x',
        'infotext' => $errorText
    ));
    die();
}

//Gives back regular JSON if a success occurs, has an "infotext", dies at the end (kind of bad, but good enough)
function sendSuccess($successText){
    echo json_encode(array(
        'status' => '201',
        'infotext' => $successText
    ));
}


