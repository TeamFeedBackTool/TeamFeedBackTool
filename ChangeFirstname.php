<?php
session_start();
require "config.php";

try {
    //A simple Script that overwrites an entry in the database with the input of the user (firstname)
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (empty(trim($_POST["firstnameChange"]))) {
            echo("Please enter a firstname");
        } else {
            echo("Hallo");

            $email = trim($_SESSION['email']);
            $firstname = trim($_POST['firstnameChange']);
            $sql = ("UPDATE users
                         SET firstname = :name
                         WHERE email = :email");
            echo($sql);
            // Prepare statement
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(':name', $firstname);
            $stmt->bindValue(':email', $email);

            // execute the query
            $stmt->execute();
            $_SESSION['firstname'] = $firstname;

            // echo a message to say the UPDATE succeeded
            echo $stmt->rowCount() . " records UPDATED successfully";
            header("location:../HTML - Tests/TestUserProfile.php");
        }
    }
}
catch(PDOException $e) {
    echo $e->getMessage();
}

