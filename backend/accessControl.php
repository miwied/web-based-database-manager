<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AccessControl
{
    public static function setCORS()
    {
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
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            exit(0);
        }
    }

    public static function checkJWT()
    {
        require_once PROJECT_ROOT_PATH . "/vendor/autoload.php";

        // JWT checking
        // is 'Authorization' header present?
        if (!array_key_exists('Authorization', getallheaders())) {
            header('HTTP/1.1 400 Bad Request');
            echo 'No Authorization header found';
            exit;
        }

        // does the 'Authorization' header content match the expected format `Bearer ...`?
        // if it does contain `Bearer ...` it will fill the $matches array split by the whitespace
        if (!preg_match('/Bearer\s(\S+)/', getallheaders()["Authorization"], $matches)) {
            header('HTTP/1.1 400 Bad Request');
            echo 'Token not found in request';
            exit;
        }

        // $matches[0] == 'Bearer' and $matches[1] == JWT which we need to continue
        $jwt = $matches[1];

        // we decode the JWT by providing the hashed JWT, the secret key and the hashing algorithm
        // the function also checks the iat, nbf and exp dates with the current date
        try {
            $token = JWT::decode($jwt, new key(JWT_SECRET_KEY, 'HS512'));
        } catch (Exception $e) {
            header('HTTP/1.1 400 Bad Request');
            echo ('Token decoding failed - see exception for details: ' . $e->getMessage());
            exit;
        }

        // check if the token issuer matches the domain name we set before
        // if any checks match the user is unauthorized and can't continue
        if ($token->iss !== JWT_DOMAIN_NAME) {
            header('HTTP/1.1 401 Unauthorized');
            exit;
        }
    }
}
