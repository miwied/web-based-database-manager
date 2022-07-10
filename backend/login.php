<?php
require __DIR__ . "/bootstrap.php";

AccessControl::setCORS();

$uri = HttpExtensionMethods::getUriSegments();

if (isset($uri[2])) {
    if ($uri[2] == 'createUser' || $uri[2] == 'getToken') {
        require_once PROJECT_ROOT_PATH . "/Controllers/loginController.php";
        $loginController = new LoginController();
    }
    switch ($uri[2]) {
        case 'createUser':
            $loginController->createAction();
            break;
        case 'getToken':
            $loginController->listAction();
            break;
        default:
            HttpExtensionMethods::throw404Error();
    }
} else {
    // the uri doesn't match
    HttpExtensionMethods::throw404Error();
}
