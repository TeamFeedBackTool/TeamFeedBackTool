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

/**
 * Inserts into "worksat" table, so we can know which user works on which project
 * @param PDO $pdo
 * @param $userdata
 */
function writeIntoWorksAt(PDO $pdo, $userdata){
    $param_projectName = trim($userdata["projectName"]);
    $param_userId = $_SESSION['userId'];
    // Prepare an insert statement
    $sql = "INSERT INTO worksat (pk_fk_userId, pk_fk_projectId) VALUES (:userId, :projectName)";

    if ($stmt = $pdo->prepare($sql)) {
        // Bind variables to the prepared statement as parameters
        $stmt->bindParam(':projectName', $param_projectName, PDO::PARAM_STR);
        $stmt->bindParam(':userId', $param_userId, PDO::PARAM_STR);

        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            // instantly logged in if everything was fine
        } else {
            sendError("Something went wrong. Please try again later.");
        }
    }
    // Close statement
    unset($stmt);
}