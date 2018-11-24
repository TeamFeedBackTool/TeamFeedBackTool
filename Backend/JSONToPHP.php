<?php
require_once "config.php";

//That is how we can read the input from the client-side in general, JSON->PHP

//reads necessary user data if the user wants to register themselves
function registerJSONToPHP(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $userdata = array("email" => $obj['email'],
                      "firstname" => $obj['firstname'],
                      "surname" => $obj['surname'],
                      "password" => $obj['password']);

    return $userdata;
}

//reads necessary user data if the user wants to login
function loginJSONToPHP(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $userdata = array("email" => $obj['email'],
                        "password" => $obj['password']);
    return $userdata;
}

//reads necessary user data if the user wants to change their surname
function changeSurnameInput(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $userdata = array("surname" => $obj['surname']);
    return $userdata;
}

//reads necessary user data if the user wants to change their firstname
function changeFirstnameInput(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $userdata = array("firstname" => $obj['firstname']);
    return $userdata;
}