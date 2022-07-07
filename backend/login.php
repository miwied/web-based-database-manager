<?php

require __DIR__ . "/bootstrap.php";
require_once PROJECT_ROOT_PATH . "/Controllers/loginController.php";

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// function for throwing a http 404 error  
function throw404Error()
{
    header("HTTP/1.1 404 Not Found");
    exit();
}

if ($uri[1] == 'login' && isset($uri[2]))
{
    $loginController = new LoginController();
    switch ($uri[2]) {
        case 'createUser':
            $loginController->createAction();
            break;
        case 'getToken':
            $loginController->listAction();
            break;
        default:
            throw404Error()
            break;
    }
}

throw404Error();