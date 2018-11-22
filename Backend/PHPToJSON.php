<?php
require "config.php";
session_start();

function SendUserData(){
    echo json_encode(array(
        'email' => $_SESSION['email'],
        'surname' => $_SESSION['surname'],
        'firstname' => $_SESSION['firstname'],
        'userId' => $_SESSION['userId'],
        'lastLogin' => $_SESSION['date']
    ));
}

function sendError($errorText){
    echo json_encode(array(
        'status' => '50x',
        'infotext' => $errorText
    ));
}

function sendSuccess($successText){
    echo json_encode(array(
        'status' => '201',
        'infotext' => $successText
    ));
}


