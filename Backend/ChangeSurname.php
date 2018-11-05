<?php
    session_start();
    require "config.php";

    try {
        //A simple Script that overwrites an entry in the database with the input of the user (Surname)
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (empty(trim($_POST["surnameChange"]))) {
                echo("Please enter a surname");
            } else {
                echo("Hallo");

                $email = trim($_SESSION['email']);
                $surname = trim($_POST['surnameChange']);
                $sql = ("UPDATE users
                         SET surname = :name
                         WHERE email = :email");
                echo($sql);
                // Prepare statement
                $stmt = $pdo->prepare($sql);
                $stmt->bindValue(':name', $surname);
                $stmt->bindValue(':email', $email);

                // execute the query
                $stmt->execute();
                $_SESSION['surname'] = $surname;

                // echo a message to say the UPDATE succeeded
                echo $stmt->rowCount() . " records UPDATED successfully";
                //ssleep(5);
                header("location:../HTML - Tests/TestUserProfile.php");
            }
        }
    }
catch(PDOException $e) {
    echo $e->getMessage();
}
