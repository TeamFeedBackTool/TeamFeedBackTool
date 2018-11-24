<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
// Include config file
require 'config.php';
require 'JSONToPHP.php';
require 'PHPToJSON.php';


//reads JSON and writes it into $userdata
$userdata = registerJSONToPHP();

// Define variables and initialize with empty values
$date = $firstname = $surname = $email = $password = $confirm_password = "";

// Prepare a select statement
$sql = "SELECT pk_userId FROM users WHERE email = :email";

if ($stmt = $pdo->prepare($sql)) {
    // Bind variables to the prepared statement as parameters
    $stmt->bindParam(':email', $param_email, PDO::PARAM_STR);
    // Set parameters
    $param_email = trim($userdata["email"]);
    // Attempt to execute the prepared statement
    if ($stmt->execute()) {
        if ($stmt->rowCount() == 1) {
            sendError("This email is already taken.");
        } else {
            $email = trim($userdata["email"]);
            //assigning SESSION Variables for later use, if is valid
            $_SESSION["email"] = trim($userdata["email"]);
        }
    } else {
        sendError("Oops! Something went wrong. Please try again later.");
    }
// Close statement
    unset($stmt);
}

// Prepare a select statement
$sql = "SELECT pk_userId FROM users WHERE firstname = :firstname";

if ($stmt = $pdo->prepare($sql)) {
    // Bind variables to the prepared statement as parameters
    $stmt->bindParam(':firstname', $param_firstname, PDO::PARAM_STR);

    // Set parameters
    $param_firstname = trim($userdata["firstname"]);

    // Attempt to execute the prepared statement
    if ($stmt->execute()) {
        $firstname = trim($userdata["firstname"]);
        //assigning SESSION Variables for later use, if is valid
        $_SESSION["firstname"] = trim($userdata["firstname"]);
    } else {
        sendError("Oops! Something went wrong. Please try again later.");
    }
    // Close statement
    unset($stmt);
}

// Prepare a select statement
$sql = "SELECT pk_userId FROM users WHERE surname = :surname";

if ($stmt = $pdo->prepare($sql)) {
    // Bind variables to the prepared statement as parameters
    $stmt->bindParam(':surname', $param_surname, PDO::PARAM_STR);

    // Set parameters
    $param_surname = trim($userdata["surname"]);

    // Attempt to execute the prepared statement
    if ($stmt->execute()) {
        $surname = trim($userdata["surname"]);
        //assigning SESSION Variables for later use, if is valid
        $_SESSION["surname"] = trim($userdata["surname"]);
    } else {
        sendError("Oops! Something went wrong. Please try again later.");
    }
    // Close statement
    unset($stmt);
}

// save pw
$password = trim($userdata['password']);

// Prepare an insert statement
$sql = "INSERT INTO users (email, password, firstname, surname) VALUES (:email, :password, :firstname, :surname)";

if ($stmt = $pdo->prepare($sql)) {

    // Bind variables to the prepared statement as parameters
    $stmt->bindParam(':email', $param_email, PDO::PARAM_STR);
    $stmt->bindParam(':password', $param_password, PDO::PARAM_STR);
    $stmt->bindParam(':firstname', $param_firstname, PDO::PARAM_STR);
    $stmt->bindParam(':surname', $param_surname, PDO::PARAM_STR);

    // Set parameters
    $param_email = $email;
    $param_firstname = $firstname;
    $param_surname = $surname;
    $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash

    // Attempt to execute the prepared statement
    if ($stmt->execute()) {
        sendSuccess("You were successfully registered");
        // instantly logged in if everything was fine
    } else {
        sendError("Something went wrong. Please try again later.");
    }

    unset($stmt);
}

