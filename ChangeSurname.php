<?php
    //session_start();
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
                         SET surname = '" . $surname . "'
                         WHERE email = '" . $email . "'" );
                echo($sql);
                // Prepare statement
                $stmt = $pdo->prepare($sql);

                // execute the query
                $stmt->execute();
                echo("Hallo");
                $row = $stmt->fetch();
                $_SESSION['surname'] = $row['surname'];

                // echo a message to say the UPDATE succeeded
                echo $stmt->rowCount() . " records UPDATED successfully";
                header("location:../HTML - Tests/TestUserProfile.php");
            }
        }
    }
catch(PDOException $e) {
    echo $e->getMessage();
}

