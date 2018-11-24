<?php
require_once 'config.php';
require_once 'JSONToPHP.php';
require_once 'PHPToJSON.php';
session_start();


writeIntoProject($pdo, createProjectInput());

/**
 * checks if projectName is unique, if it is, create project -> write into project table
 * @param PDO $pdo
 * @param $userdata
 */
function writeIntoProject(PDO $pdo,$userdata){
    if (empty(trim($userdata["projectName"]))) {
        sendError("Please enter a projectName.");
    } else {
        // Prepare a select statement
        $sql = "SELECT pk_projectId FROM project WHERE projectName = :projectName";

        if ($stmt = $pdo->prepare($sql)) {
            // Bind variables to the prepared statement as parameters
            $stmt->bindParam(':projectName', $param_projectName, PDO::PARAM_STR);

            // Set parameters
            $projectName = $param_projectName = trim($userdata["projectName"]);
            $param_userId = $_SESSION['userId'];
            // Attempt to execute the prepared statement
            if ($stmt->execute()) {
                if ($stmt->rowCount() == 1) {
                    sendError("This projectName is already taken.");
                } else {

                    $_SESSION["projectName"] = $projectName;

                    // Prepare an insert statement
                    $sql = "INSERT INTO project (projectname,fk_leaderId) VALUES (:projectName, :userId)";

                    if ($stmt = $pdo->prepare($sql)) {
                        // Bind variables to the prepared statement as parameters
                        $stmt->bindParam(':projectName', $param_projectName, PDO::PARAM_STR);
                        $stmt->bindParam(':userId', $param_userId, PDO::PARAM_STR);

                        // Set parameters
                        $projectName_email = $projectName;

                        // Attempt to execute the prepared statement
                        if ($stmt->execute()) {
                            // instantly logged in if everything was fine
                            writeIntoWorksAt($pdo,$userdata);

                        } else {
                            sendError("Something went wrong. Please try again later.");
                        }
                    }
                    unset($stmt);
                }
            } else {
                sendError("Oops! Something went wrong. Please try again later.");
            }
        }

    }
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

        // Set parameters
        $projectName_email = $userdata['projectName'];

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



















