<?php 

if(!isset($_SESSION)) { session_start(); } 
include("/var/www/html/htdocs/page_part/info_by_ip_address.php"); 
date_default_timezone_set($countrytimezone); 
//csrf token for security 
if (empty($_SESSION['token'])) { 
    if(function_exists('mcrypt_create_iv')) { 
        $_SESSION['token'] = bin2hex(mcrypt_create_iv(32, MCRYPT_DEV_URANDOM)); 
    } else { 
        $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 
    } 
} 
//include('/var/www/html/htdocs/page_part/page_minifier.php');
?>