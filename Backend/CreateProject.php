<?php
require "config.php";
session_start();

// Define variables and initialize with empty values
$projectName = $projectName_err ="";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST") {

    // Validate projectName
    if (empty(trim($_POST["projectName"]))) {
        $projectName_err = "Please enter a projectName.";
    } else {
        // Prepare a select statement
        $sql = "SELECT pk_projectId FROM project WHERE projectName = :projectName";

        if ($stmt = $pdo->prepare($sql)) {
            // Bind variables to the prepared statement as parameters
            $stmt->bindParam(':projectName', $param_projectName, PDO::PARAM_STR);

            // Set parameters
            $param_projectName = trim($_POST["projectName"]);

            // Attempt to execute the prepared statement
            if ($stmt->execute()) {
                if ($stmt->rowCount() == 1) {
                    $projectName_err = "This projectName is already taken.";
                    echo($projectName_err);
                } else {
                    $projectName = trim($_POST["projectName"]);
                    echo($projectName);
                    // assigning SESSION Variables for later use, if is valid
                    // $_SESSION["projectName"] = trim($_POST["projectName"]);
                }
            } else {
                echo "Oops! Something went wrong. Please try again later.";
            }
        }

        // Check input errors before inserting in database
        if(empty($projectName_err)){

            // Prepare an insert statement
            $sql = "INSERT INTO project (projectname) VALUES (:projectName)";

            if($stmt = $pdo->prepare($sql)){

                // Bind variables to the prepared statement as parameters
                $stmt->bindParam(':projectName', $param_projectName, PDO::PARAM_STR);
                // Set parameters
                $projectName_email = $projectName;

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
        // Close statement
        unset($stmt);
    }

}


















