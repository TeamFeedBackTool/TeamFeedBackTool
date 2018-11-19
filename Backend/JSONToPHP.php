<?php
require "config.php";
session_start();

function registerJSONToPHP()
{
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $userdata = array("email" => $obj['email'],
                      "firstname" => $obj['firstname'],
                      "surname" => $obj['surname'],
                      "password" => $obj['password']);
    return $userdata;
}