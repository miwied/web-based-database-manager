<?php
define("PROJECT_ROOT_PATH", __DIR__ . "");

// include main configuration file
require_once PROJECT_ROOT_PATH . "/config.php";

// include the base controller file
require_once PROJECT_ROOT_PATH . "/Controllers/baseController.php";

// include the repository file
require_once PROJECT_ROOT_PATH . "/Repository/dbRepository.php";
