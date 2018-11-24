<?php
session_start();
require "config.php";
require "PHPToJSON.php";
require "JSONToPHP.php";

ChangeSurname($pdo);
//A simple Script that overwrites an entry in the database with the input of the user (Surname)
function ChangeSurname(PDO $pdo)
{
    //JSON to $userdata for later use
    $userdata = changeSurnameInput();

    try {

        $email = trim($_SESSION['email']);
        $surname = trim($userdata['surname']);
        $sql = ("UPDATE users
                         SET surname = :name
                         WHERE email = :email");
        // Prepare statement
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':name', $surname);
        $stmt->bindValue(':email', $email);

        // execute the query
        $stmt->execute();
        $_SESSION['surname'] = $surname;

        // echo a message to say the UPDATE succeeded
        sendSuccess( $stmt->rowCount() . " records UPDATED successfully");

    } catch (PDOException $e) {
        echo $e->getMessage();
    }

}