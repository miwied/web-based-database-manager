<?php
require __DIR__ . "/bootstrap.php";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

if ((isset($uri[5]) && $uri[5] != 'basicFee') || !isset($uri[6])) {
    header("HTTP/1.1 404 Not Found");
    exit();
}

require PROJECT_ROOT_PATH . "/Controllers/basicFeeController.php";

$basicFeeController = new BasicFeeController();
$basicFeeController->listAction();
