<?php
require_once "config.php";
/**
 * With this class we can read the input from the client-side in general, JSON->PHP
 */


/**
 * reads necessary user data if the user wants to register themselves
 * returns an array with useful user-data (email, firstname, surname, password)
 */

function registerJSONToPHP(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $userdata = array("email" => $obj['email'],
                      "firstname" => $obj['firstname'],
                      "surname" => $obj['surname'],
                      "password" => $obj['password']);
    return $userdata;
}

/**
 * reads necessary user data if the user wants to login
 * returns email and password in array
 */
function loginJSONToPHP(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $userdata = array("email" => $obj['email'],
                        "password" => $obj['password']);
    return $userdata;
}

/**
 * reads necessary user data if the user wants to change their surname
 * returns (new) surname in array
 */
function changeSurnameInput(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $userdata = array("surname" => $obj['surname']);
    return $userdata;
}

/**
 * reads necessary user data if the user wants to change their firstname
 * returns (new) firstname in array
 */
function changeFirstnameInput(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $userdata = array("firstname" => $obj['firstname']);
    return $userdata;
}

/**
 * reads project name if the user wants to create a project
 * returns project name in array
 */
function createProjectInput(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $userdata = array("projectName" => $obj['projectName']);
    return $userdata;
}