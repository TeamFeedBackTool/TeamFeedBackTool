<?php
session_start();
require "config.php";
require "PHPToJSON.php";
require "JSONToPHP.php";

ChangeFirstname($pdo);

//A simple Script that overwrites an entry in the database with the input of the user (Firstname)
function ChangeFirstname(PDO $pdo)
{
    //JSON to $userdata for later use
    $userdata = changeFirstnameInput();

    try {
        //A simple Script that overwrites an entry in the database with the input of the user (Surname)

        $email = trim($_SESSION['email']);
        $firstname = trim($userdata['firstname']);
        $sql = ("UPDATE users
                         SET firstname = :name
                         WHERE email = :email");
        // Prepare statement
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':name', $firstname);
        $stmt->bindValue(':email', $email);

        // execute the query
        $stmt->execute();
        $_SESSION['surname'] = $firstname;

        // echo a message to say the UPDATE succeeded
        sendSuccess( $stmt->rowCount() . " records UPDATED successfully");

    } catch (PDOException $e) {
        echo $e->getMessage();
    }

}