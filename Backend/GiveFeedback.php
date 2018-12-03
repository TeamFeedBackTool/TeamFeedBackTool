<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require_once 'config.php';
require_once 'JSONToPHP.php';
require_once 'PHPToJSON.php';
require_once "UsefulFunctions.php";

giveFeedback($pdo);
/**
 * @param PDO $pdo
 * for better overview
 */
function giveFeedback(PDO $pdo)
{
    if (checkIfOneWeekOver($pdo) == true) {
        insertIntoFeedback($pdo);
        sendSuccess("Feedback has been submitted");
    } else {
        sendError("You gotta wait a week buddy");
    }

}

/**
 * @param PDO $pdo
 * checks if user hasnt submitted a feedback in the last seven days
 * @return bool
 */
function checkIfOneWeekOver(PDO $pdo)
{
    $sql = "SELECT MAX(date) FROM feedback WHERE fk_userId = :userId";
    if ($stmt = $pdo->prepare($sql)) {
        // Bind variables to the prepared statement as parameters
        $param_userId = $_SESSION['userId'];
        $stmt->bindParam(':userId', $param_userId, PDO::PARAM_STR);
        if ($stmt->execute()) {
            // Check if they have alreaday submitted a feedback
            if ($stmt->rowCount() == 1) {
                if ($row = $stmt->fetch()) {
                    $dateLogin = strtotime($_SESSION['date']);
                    $dateDB = strtotime($row['date']);
                    //604800 = secs to days * 7 for 7 days apart
                    if ($dateLogin - $dateDB >= 604800) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return true;
            }
        }
    }
    return false;
}

/**
 * @param PDO $pdo
 * takes input and writes it into the db
 */
function insertIntoFeedback(PDO $pdo)
{
    $userdata = giveFeedbackInput();

    $sql = "INSERT INTO feedback (fk_userId, fk_projectId, sliderValue_stress, sliderValue_motivation, work_performance_satisfied, technicalSkills) VALUES (:userId,:projectId,:stress,:motivation,:satisfied,:technicalSkills)";

    if ($stmt = $pdo->prepare($sql)) {
        $param_userId = $_SESSION['userId'];
        $param_projectId = $userdata['projectId'];
        $param_stress = $userdata['sliderValue_stress'];
        $param_satisfied = $userdata['work_performance_satisfied'];
        $param_technicalSkills = $userdata['technicalSkills'];

        // Bind variables to the prepared statement as parameters
        $stmt->bindParam(':userId', $param_userId, PDO::PARAM_STR);
        $stmt->bindParam(':projectId', $param_projectId, PDO::PARAM_STR);
        $stmt->bindParam(':stress', $param_stress, PDO::PARAM_STR);
        $stmt->bindParam(':motivation', $param_motivation, PDO::PARAM_STR);
        $stmt->bindParam(':satisfied', $param_satisfied, PDO::PARAM_STR);
        $stmt->bindParam(':technicalSkills', $param_technicalSkills, PDO::PARAM_STR);

        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            sendSuccess("Nice i guess wtf");
        } else {
            sendError("Something went wrong. Please try again later.");
        }
        unset($stmt);

    }


}