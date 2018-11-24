<?php
session_start();
// Include config file
require 'config.php';
require 'JSONToPHP.php';

// Define variables and initialize with empty values
$email = $password = "";

//JSON to $userdata for later use
$userdata = registerJSONToPHP();

function setLatestDate($pdo)
{
    $sql = "UPDATE users 
              SET lastLogin = now()
              WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':email', $_SESSION['email']);
    $stmt->execute();
    $_SESSION['date'] = getdate();
}

$email = trim($userdata["email"]);
$password = trim($userdata['password']);

// Prepare a select statement
$sql = "SELECT pk_userId, email, password, firstname, surname FROM users WHERE email = :email";

if ($stmt = $pdo->prepare($sql)) {
    // Bind variables to the prepared statement as parameters
    $stmt->bindParam(':email', $param_email, PDO::PARAM_STR);

    // Set parameters
    $param_email = trim($userdata["email"]);

    // Attempt to execute the prepared statement
    if ($stmt->execute()) {
        // Check if email exists, if yes then verify password
        if ($stmt->rowCount() == 1) {
            if ($row = $stmt->fetch()) {
                $hashed_password = $row['password'];
                if (password_verify($password, $hashed_password)) {
                    /* Password is correct, so start a new session and
                    save the email, firstname, surname to the session for later use*/
                    $_SESSION['email'] = $row['email'];
                    $_SESSION['firstname'] = $row['firstname'];
                    $_SESSION['surname'] = $row['surname'];
                    $_SESSION['userId'] = $row['pk_userId'];
                    setLatestDate($pdo);
                    //header("location: index.php");

                } else {
                    // Display an error message if password is not valid
                    $password_err = 'The password you entered was not valid.';
                }
            }
        } else {
            sendError('No account found with that email.');
        }
    } else {
        sendError("Oops! Something went wrong. Please try again later.");
    }
}

// Close connection
unset($pdo);


