<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require_once 'config.php';
require_once 'JSONToPHP.php';
require_once 'PHPToJSON.php';

/**
 * A simple script to write the current date into db as lastLogin
 * @param $pdo
 */
function setLatestDate(PDO $pdo)
{
    $sql = "UPDATE users 
              SET lastLogin = now()
              WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':email', $_SESSION['email']);
    $stmt->execute();
    $_SESSION['date'] = getdate();
}

/**
 * sets $_SESSION array with current relevant userdata
 * @param $row
 */
function saveIntoSession($row)
{
    $_SESSION['email'] = $row['email'];
    $_SESSION['firstname'] = $row['firstname'];
    $_SESSION['surname'] = $row['surname'];
    $_SESSION['userId'] = $row['pk_userId'];
}

/**
 * Inserts into "worksat" table, so we can know which user works on which project
 * @param PDO $pdo
 * @param $userdata
 */
function writeIntoWorksAt(PDO $pdo)
{
    $param_projectId = projectnameToIds($pdo);
    $param_userId = $_SESSION['userId'];
    // Prepare an insert statement

    $sql = "INSERT INTO worksat(pk_fk_userId, pk_fk_projectId) VALUES (:userId, :projectId)";

    if ($stmt = $pdo->prepare($sql)) {
        // Bind variables to the prepared statement as parameters
        $stmt->bindParam(':projectId', $param_projectId, PDO::PARAM_STR);
        $stmt->bindParam(':userId', $param_userId, PDO::PARAM_STR);
        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            sendSuccess("ging");
        } else {
            sendError("Something went wrong. Please try again later.");
        }
    }
    // Close statement
    unset($stmt);
}

/**
 * reads all projects which a user is involved in
 * @param PDO $pdo
 * @return string
 */
function readProjectsForUser(PDO $pdo)
{
    $toProjectNames = "";
    $sql = "SELECT pk_fk_projectId FROM worksat WHERE pk_fk_userId = :userId";
    if ($stmt = $pdo->prepare($sql)) {
        // Bind variables to the prepared statement as parameters
        $param_userId = $_SESSION['userId'];
        $stmt->bindParam(':userId', $param_userId, PDO::PARAM_STR);
        if ($stmt->execute()) {
            foreach ($stmt as $row) {
                $toProjectNames .= $row['pk_fk_projectId'] .= ";";
            }
            $toProjectNames = substr($toProjectNames, 0, -1);

            return $toProjectNames;
        } else {
            sendError("Oops! Something went wrong. Please try again later.");

        }
    }
    sendError("You shouldnt be here");
    return $toProjectNames;
}

/**
 * converts a string with ProjectsIds ,";" inbetween names
 * @param PDO $pdo
 * @return array
 */

function projectIdsToNames(PDO $pdo)
{
    //deletes last char since its an ";"
    $projectIds = readProjectsForUser($pdo);
    $idsInArray = explode(';', $projectIds);
    $projectNames = array();

    for ($x = 0; $x <= count($idsInArray); $x++) {
        $sql = "SELECT projectname FROM project WHERE pk_projectId = :projectId";
        if ($stmt = $pdo->prepare($sql)) {
            // Bind variables to the prepared statement as parameters
            $param_projectId = $idsInArray[$x];
            $stmt->bindParam(':projectId', $param_projectId, PDO::PARAM_STR);
            if ($stmt->execute()) {
                if ($stmt->rowCount() == 1) {
                    if ($row = $stmt->fetch()) {
                        array_push($projectsNames, $row['projectname']);
                    }
                    sendSuccess("Erfolgreich von projektid zu namen");
                    return $projectNames;
                } else {
                    sendError("wait what");
                    return $projectNames;
                }
            }
        }
    }

}

/**
 * converts a string with ProjectsIds ,";" inbetween names
 * @param PDO $pdo
 * @return int
 */

function projectnameToIds(PDO $pdo)
{
    $projectId = "";
    $userdata = createProjectInput();
    $sql = "SELECT pk_projectId FROM project WHERE projectname = :projectName";
    if ($stmt = $pdo->prepare($sql)) {
        // Bind variables to the prepared statement as parameters
        $param_projectName = $userdata['projectName'];
        $stmt->bindParam(':projectName', $param_projectName, PDO::PARAM_STR);
        if ($stmt->execute()) {
            $count = $stmt->rowCount();
            if ($count == 1) {
                if ($row = $stmt->fetch()) {
                    $projectId = $row['pk_projectId'];
                }
                sendSuccess("Erfolgreich von namen zu ids");
                return $projectId;
            } else {
                sendError($count);
            }
        }
    }
    return $projectId;
}