<?php

require __DIR__ . "/bootstrap.php";
require_once PROJECT_ROOT_PATH . "/Controllers/loginController.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

if ((isset($uri[1]) && ($uri[2] != 'addUser' && $uri[2] != 'getToken')) && isset($uri[2])) {
    header("HTTP/1.1 404 Not Found");
    exit();
}

$loginController = new LoginController();

if ($uri[2] == 'addUser') {
    $loginController->createAction();
}
if ($uri[2] == 'getToken') {
    $loginController->listAction();
}
