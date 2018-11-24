<?php
LogoutUser();
/**
 * a simple script to log the user out
 */
function LogoutUser()
{
    session_start();
    unset($_SESSION);
    session_destroy();
    session_write_close();
    sendSuccess("You have been logged out");
    exit();
}




