<?php
require_once "config.php";

function registerJSONToPHP(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $userdata = array("email" => $obj['email'],
                      "firstname" => $obj['firstname'],
                      "surname" => $obj['surname'],
                      "password" => $obj['password']);

    return $userdata;
}

function loginJSONToPHP(){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $userdata = array("email" => $obj['email'],
                        "password" => $obj['password']);
    return $userdata;

}