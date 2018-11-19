<?php
require "config.php";
session_start();

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

if(isset($obj['email'])) {
    $_SESSION['email'] = $obj['email'];
}