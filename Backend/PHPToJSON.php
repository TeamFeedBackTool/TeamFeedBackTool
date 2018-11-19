<?php
require "config.php";
session_start();

function SendUserData()
{
    echo json_encode(array(
        'email' => $_SESSION['email'],
        'surname' => $_SESSION['surname'],
        'firstname' => $_SESSION['firstname'],
        'userId' => $_SESSION['userId'],
        'lastLogin' => $_SESSION['date']
    ));
}

function PHPToJson()
{
    echo json_encode(array(
        'surname' => $_SESSION['surname'],
        'firstname' => $_SESSION['surname'],
        'count' => 3
    ));
}

function sendError($errorText){
    echo json_encode(array(
        'status' => '200',
        'infotext' => $errorText
    ));
}

function sendSuccess($successText){
    echo json_encode(array(
        'status' => '50x',
        'infotext' => $successText
    ));
}


