<?php

use Firebase\JWT\JWT;

require_once('./vendor/autoload.php');
require __DIR__ . "/bootstrap.php";

$headers = getallheaders();
if (!preg_match('/Bearer\s(\S+)/', $headers["Authorization"], $matches)) {
    header('HTTP/1.0 400 Bad Request');
    echo 'Token not found in request';
    exit;
}

$jwt = $matches[1];
if (!$jwt) {
    // No token was able to be extracted from the authorization header
    header('HTTP/1.0 400 Bad Request');
    exit;
}

$token = JWT::decode($jwt, JWT_SECRET_KEY, ['HS512']);
$now = new DateTimeImmutable();
$serverName = "your.domain.name";

if (
    $token->iss !== $serverName ||
    $token->nbf > $now->getTimestamp() ||
    $token->exp < $now->getTimestamp()
) {
    header('HTTP/1.1 401 Unauthorized');
    exit;
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

require_once PROJECT_ROOT_PATH . "/Controllers/loginController.php";
$loginController = new LoginController();
$loginController->listAction();
