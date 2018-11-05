<?php
session_start();
?>
<html>
    <body>
        <form action="TestUserProfile.php" method="get">
            <input type="submit" value="Your Individual Profile!">
        </form>
        <form action="../Backend/LogoutUser.php" method="get">
            <input type="submit" value="Log Out Now!">
        </form>
        <form action="../Backend/CreateProject.php" method="POST"
        <label>
            <input type="text" name="projectName">
        </label>
        <input type="submit" value="Create a new Project!">
        </form>
    </body>
</html>
