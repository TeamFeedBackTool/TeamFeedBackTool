<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require_once 'config.php';
require_once 'JSONToPHP.php';
require_once 'PHPToJSON.php';

/**
 * A simple script to write the current date into db as lastLogin
 * @param $pdo
 */
function setLatestDate(PDO $pdo){
    $sql = "UPDATE users 
              SET lastLogin = now()
              WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':email', $_SESSION['email']);
    $stmt->execute();
    $_SESSION['date'] = getdate();
}

/**
 * sets $_SESSION array with current relevant userdata
 * @param $row
 */
function saveIntoSession($row){
    $_SESSION['email'] = $row['email'];
    $_SESSION['firstname'] = $row['firstname'];
    $_SESSION['surname'] = $row['surname'];
    $_SESSION['userId'] = $row['pk_userId'];
}