<?php
require_once 'config.php';
require_once 'PHPToJSON.php';
require_once 'UsefulFunctions.php';

if (session_status() == PHP_SESSION_NONE) {
    isLoggedIn(true);
}
else{
    isLoggedIn(false);
}