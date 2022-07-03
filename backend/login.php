<?php

require __DIR__ . "/bootstrap.php";
require_once PROJECT_ROOT_PATH . "/Controllers/loginController.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

if ((isset($uri[2]) && ($uri[2] != 'login'))) {
    header("HTTP/1.1 404 Not Found");
    exit();
}

$loginController = new LoginController();

if (isset($uri[3]) && $uri[3] == 'addUser') {
    $loginController->createAction();
}
if (isset($uri[3]) && $uri[3] == 'getToken') {
    $loginController->listAction();
}
