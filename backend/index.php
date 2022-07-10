<?php

require __DIR__ . "/bootstrap.php";

AccessControl::setCORS();

AccessControl::checkJWT();

// the token has passed our checks so we split the complete uri with which the index.php
// was accessed by the slash '/' symbols to handle routing of the request
$uri = HttpExtensionMethods::getUriSegments();


// if uri[3] is not set we can't do anything
if (!isset($uri[3])) {
    HttpExtensionMethods::sendOutput(404);
}

// basicFee endpoint handling
if ($uri[2] == 'basicFee') {
    require_once PROJECT_ROOT_PATH . "/Controllers/basicFeeController.php";
    $basicFeeController = new BasicFeeController();

    switch ($uri[3]) {
        case 'get':
            $basicFeeController->getAction();
            break;
        default:
            HttpExtensionMethods::sendOutput(404);
    }
}

// member endpoint handling
if ($uri[2] == 'member') {
    require_once PROJECT_ROOT_PATH . "/Controllers/memberController.php";
    $memberController = new MemberController();

    switch ($uri[3]) {
        case 'create':
            $memberController->createAction();
            break;
        case 'get':
            $memberController->getAction();
            break;
        case 'edit':
            $memberController->putAction();
            break;
        case 'delete':
            if (isset($uri[4])) $memberController->deleteAction($uri[4]);
            HttpExtensionMethods::sendOutput(404);
            break;
        default:
            HttpExtensionMethods::sendOutput(404);
    }
}

// team endpoint handling
if ($uri[2] == 'team') {
    require_once PROJECT_ROOT_PATH . "/Controllers/teamController.php";
    $teamController = new TeamController();

    switch ($uri[3]) {
        case 'create':
            $teamController->createAction();
            break;
        case 'get':
            $teamController->getAction();
            break;
        case 'edit':
            $teamController->putAction();
            break;
        case 'delete':
            if (isset($uri[4])) $teamController->deleteAction($uri[4]);
            HttpExtensionMethods::sendOutput(404);
            break;
        default:
            HttpExtensionMethods::sendOutput(404);
    }
}

// sport endpoint handling
if ($uri[2] == 'sport') {
    require_once PROJECT_ROOT_PATH . "/Controllers/sportController.php";
    $sportController = new SportController();

    switch ($uri[3]) {
        case 'create':
            $sportController->createAction();
            break;
        case 'get':
            $sportController->getAction();
            break;
        case 'edit':
            $sportController->putAction();
            break;
        case 'delete':
            if (isset($uri[4])) $sportController->deleteAction($uri[4]);
            HttpExtensionMethods::sendOutput(404);
            break;
        default:
            HttpExtensionMethods::sendOutput(404);
    }
}

// no uri was matching if you get here
HttpExtensionMethods::sendOutput(404);
