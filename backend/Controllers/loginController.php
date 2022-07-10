<?php

use Firebase\JWT\JWT;

require_once PROJECT_ROOT_PATH . "/vendor/autoload.php";
class LoginController
{
    private $repo;
    private $password = '';
    private $username = '';
    private $requestMethod = '';

    public function __construct()
    {
        $queryStringParams = $this->getQueryStringParams();
        $this->username = $queryStringParams["username"];
        $this->password = $queryStringParams["password"];
        $this->repo = new DBRepository();
        $this->requestMethod = $_SERVER["REQUEST_METHOD"];
    }

    private function getQueryStringParams()
    {
        parse_str($_SERVER['QUERY_STRING'], $query);
        return $query;
    }

    // check if inserted password matches the password in database and response with token if so
    public function listAction()
    {
        if (strtoupper($this->requestMethod) == 'POST') {
            $strErrorDesc = '';
            try {
                $existingHashFromDb = $this->repo->getPwdByUsername($this->username);
                $pwdPeppered = hash_hmac("sha256", $this->password, PEPPER);
                $isPasswordCorrect = password_verify($pwdPeppered, $existingHashFromDb[0]["password"]);

                if ($isPasswordCorrect) {
                    $date = new DateTimeImmutable(); // get current dateTime
                    $expire_at = $date->modify(JWT_MODIFIER)->getTimestamp();
                    $request_data = [
                        'iat'  => $date->getTimestamp(),         // Issued at: time when the token was generated
                        'iss'  => JWT_DOMAIN_NAME,               // Issuer
                        'nbf'  => $date->getTimestamp(),         // Not before: time before which the token is invalid
                        'exp'  => $expire_at,                    // Expiration: time after which the token is invalid
                        'userName' => $this->username,           // Username
                    ];
                    $token = JWT::encode(
                        $request_data,
                        JWT_SECRET_KEY,
                        'HS512'
                    );
                    $responsedata = json_encode($token);
                } else {
                    $strErrorDesc = 'Invalid credentials';
                    $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // send output
        if (!$strErrorDesc) {
            HttpExtensionMethods::sendOutput(
                $responsedata,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            HttpExtensionMethods::sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    // create users in database
    public function createAction()
    {
        if (strtoupper($this->requestMethod) == 'POST') {
            $strErrorDesc = '';
            try {
                // check if user already exists
                $usernameCount = $this->repo->getUsernameCount($this->username);
                $userAlreadyExists = false;

                if ($usernameCount[0]["COUNT(1)"] > 0) {
                    $userAlreadyExists = true;
                }

                if (!$userAlreadyExists) {
                    $pwdPeppered = hash_hmac("sha256", $this->password, PEPPER);
                    $hashToStoreInDb = password_hash($pwdPeppered, PASSWORD_BCRYPT);
                    $this->repo->putLoginData($this->username, $hashToStoreInDb);
                } else {
                    $strErrorDesc = 'User already exists :)';
                    $strErrorHeader = 'HTTP/1.1 409 Conflict';
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // send output
        if ($strErrorDesc) {
            HttpExtensionMethods::sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
}
