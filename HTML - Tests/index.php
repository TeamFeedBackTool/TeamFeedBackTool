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

    </body>

</html>
