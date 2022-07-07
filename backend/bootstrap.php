<?php
define("PROJECT_ROOT_PATH", __DIR__ . "");

// include main configuration file
require_once PROJECT_ROOT_PATH . "/config.php";

// include the base controller file
require_once PROJECT_ROOT_PATH . "/httpExtensionMethods.php";

// include the repository file
require_once PROJECT_ROOT_PATH . "/Database/repository.php";

// include the dbContext file
require_once PROJECT_ROOT_PATH . "/Database/dbContext.php";
