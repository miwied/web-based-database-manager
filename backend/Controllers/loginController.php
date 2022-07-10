<?php

use Firebase\JWT\JWT;

require_once PROJECT_ROOT_PATH . '/vendor/autoload.php';
class LoginController
{
    private $repo;
    private $requestMethod = '';
    private $username = '';
    private $password = '';

    public function __construct()
    {
        $this->repo = new DBRepository();
        $this->requestMethod = $_SERVER['REQUEST_METHOD'];
        $queryStringParams = $this->getQueryStringParams();
        $this->username = $queryStringParams['username'];
        $this->password = $queryStringParams['password'];
    }

    private function getQueryStringParams()
    {
        parse_str($_SERVER['QUERY_STRING'], $query);
        return $query;
    }

    // create users in database
    public function createAction()
    {
        if (strtoupper($this->requestMethod) == 'POST') {
            try {
                // check if user already exists
                $usernameCount = $this->repo->getUsernameCount($this->username);
                $userAlreadyExists = false;

                if ($usernameCount[0]['COUNT(1)'] > 0) {
                    $userAlreadyExists = true;
                }

                if (!$userAlreadyExists) {
                    $pwdPeppered = hash_hmac('sha256', $this->password, PEPPER);
                    $hashToStoreInDb = password_hash($pwdPeppered, PASSWORD_BCRYPT);
                    $this->repo->putLoginData($this->username, $hashToStoreInDb);
                    HttpExtensionMethods::sendOutput(200);
                } else {
                    HttpExtensionMethods::sendOutput(409, 'User already exists :)');
                }
            } catch (Error $e) {
                HttpExtensionMethods::sendOutput(500, 'Something went wrong: ' . $e->getMessage());
            }
        } else {
            HttpExtensionMethods::sendOutput(422, 'Method not supported');
        }
    }

    // check if inserted password matches the password in database and response with token if so
    public function listAction()
    {
        if (strtoupper($this->requestMethod) == 'POST') {
            try {
                $existingHashFromDb = $this->repo->getPwdByUsername($this->username);
                $pwdPeppered = hash_hmac('sha256', $this->password, PEPPER);
                $isPasswordCorrect = password_verify($pwdPeppered, $existingHashFromDb[0]['password']);

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
                    HttpExtensionMethods::sendOutput(200, json_encode($token));
                } else {
                    HttpExtensionMethods::sendOutput(400, 'Invalid credentials');
                }
            } catch (Error $e) {
                HttpExtensionMethods::sendOutput(500, 'Something went wrong: ' . $e->getMessage());
            }
        } else {
            HttpExtensionMethods::sendOutput(422, 'Method not supported');
        }
    }
}
