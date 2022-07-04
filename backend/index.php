<?php

use Firebase\JWT\JWT;

require_once('./vendor/autoload.php');
require __DIR__ . "/bootstrap.php";

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

if ((isset($uri[2]) && ($uri[2] != 'member' && $uri[2] != 'basicFee'))) {
    header("HTTP/1.1 404 Not Found");
    exit();
}

if ($uri[2] == 'member') {
    require_once PROJECT_ROOT_PATH . "/Controllers/memberController.php";
    $memberController = new MemberController();
    $memberController->listAction();
}

if ($uri[2] == 'basicFee') {
    require_once PROJECT_ROOT_PATH . "/Controllers/basicFeeController.php";
    $basicFeeController = new BasicFeeController();
    $basicFeeController->listAction();
}

// $headers = getallheaders();
// if (!preg_match('/Bearer\s(\S+)/', $headers["Authorization"], $matches)) {
//     header('HTTP/1.0 400 Bad Request');
//     echo 'Token not found in request';
//     exit;
// }

// $jwt = $matches[1];
// if (!$jwt) {
//     // No token was able to be extracted from the authorization header
//     header('HTTP/1.0 400 Bad Request');
//     exit;
// }

// $token = JWT::decode($jwt, JWT_SECRET_KEY, ['HS512']);
// $now = new DateTimeImmutable();
// $serverName = "your.domain.name";

// if (
//     $token->iss !== $serverName ||
//     $token->nbf > $now->getTimestamp() ||
//     $token->exp < $now->getTimestamp()
// ) {
//     header('HTTP/1.1 401 Unauthorized');
//     exit;
// }
