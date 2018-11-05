<?php
session_start();

// Include config file
require 'config.php';

// Define variables and initialize with empty values
$date = $firstname = $surname = $email = $password = $confirm_password = "";
$firstname_err = $surname_err = $email_err = $password_err = $confirm_password_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Validate email
    if(empty(trim($_POST["email"]))){
        $email_err = "Please enter a email.";
    } else{
        // Prepare a select statement
        $sql = "SELECT pk_userId FROM users WHERE email = :email";

        if($stmt = $pdo->prepare($sql)){
            // Bind variables to the prepared statement as parameters
            $stmt->bindParam(':email', $param_email, PDO::PARAM_STR);

            // Set parameters
            $param_email = trim($_POST["email"]);

            // Attempt to execute the prepared statement
            if($stmt->execute()){
                if($stmt->rowCount() == 1){
                    $email_err = "This email is already taken.";
                } else{
                    $email = trim($_POST["email"]);
                    //assigning SESSION Variables for later use, if is valid
                    $_SESSION["email"] = trim($_POST["email"]);
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
        }

        // Close statement
        unset($stmt);
    }

    // Validate firstname
    if(empty(trim($_POST["firstname"]))){
        $firstname_err = "Please enter your firstname.";
    } else{
        // Prepare a select statement
        $sql = "SELECT pk_userId FROM users WHERE firstname = :firstname";

        if($stmt = $pdo->prepare($sql)){
            // Bind variables to the prepared statement as parameters
            $stmt->bindParam(':firstname', $param_firstname, PDO::PARAM_STR);

            // Set parameters
            $param_firstname = trim($_POST["firstname"]);

            // Attempt to execute the prepared statement
            if($stmt->execute()){
                    $firstname = trim($_POST["firstname"]);
                    //assigning SESSION Variables for later use, if is valid
                    $_SESSION["firstname"] = trim($_POST["firstname"]);
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
        // Close statement
        unset($stmt);
    }

    // Validate surname
    if(empty(trim($_POST["surname"]))){
        $surname_err = "Please enter your surname.";
    } else{
        // Prepare a select statement
        $sql = "SELECT pk_userId FROM users WHERE surname = :surname";

        if($stmt = $pdo->prepare($sql)){
            // Bind variables to the prepared statement as parameters
            $stmt->bindParam(':surname', $param_surname, PDO::PARAM_STR);

            // Set parameters
            $param_surname = trim($_POST["surname"]);

            // Attempt to execute the prepared statement
            if($stmt->execute()){
                $surname = trim($_POST["surname"]);
                //assigning SESSION Variables for later use, if is valid
                $_SESSION["surname"] = trim($_POST["surname"]);
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
        // Close statement
        unset($stmt);
    }

    // Validate password
    if(empty(trim($_POST['password']))){
        $password_err = "Please enter a password.";
    } elseif(strlen(trim($_POST['password'])) < 6){
        $password_err = "Password must have atleast 6 characters.";
    } else{
        $password = trim($_POST['password']);
    }

    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = 'Please confirm password.';
    } else{
        $confirm_password = trim($_POST['confirm_password']);
        if($password != $confirm_password){
            $confirm_password_err = 'Password did not match.';
        }
    }

    // Check input errors before inserting in database
    if(empty($email_err) && empty($password_err) && empty($confirm_password_err)){

        // Prepare an insert statement
        $sql = "INSERT INTO users (email, password, firstname, surname) VALUES (:email, :password, :firstname, :surname)";

        if($stmt = $pdo->prepare($sql)){

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
            if($stmt->execute()){
                // instantly logged in if everything was fine
                header("location: ../HTML - Tests/index.php");
            } else{
                echo "Something went wrong. Please try again later.";
            }
        }
        unset($stmt);
    }
    unset($pdo);
}
