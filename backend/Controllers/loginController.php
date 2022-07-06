<?php

use Firebase\JWT\JWT;

// require_once PROJECT_ROOT_PATH . "/vendor/autoload.php";
class LoginController extends BaseController
{
    protected $repo;
    private $password = '';
    private $username = '';
    private $requestMethod = '';

    public function __construct()
    {
        $this->repo = new DBRepository();
        $this->requestMethod = $_SERVER["REQUEST_METHOD"];
    }

    private function setFromQueryParams()
    {
        $arrQueryStringParams = $this->getQueryStringParams();
        foreach ($arrQueryStringParams as $key => $value) {
            if ($key == "password") {
                $this->password = $value;
            }
            if ($key == "username") {
                $this->username = $value;
            }
        }
    }

    // check if inserted password matches the password in database and response with token if so
    public function listAction()
    {
        if (strtoupper($this->requestMethod) == 'POST') {
            $strErrorDesc = '';
            $pepper = pepper;
            try {
                $this->setFromQueryParams();
                $existingHashFromDb = $this->repo->getPwdByUsername($this->username);
                $pwdPeppered = hash_hmac("sha256", $this->password, $pepper);
                $isPasswordCorrect = password_verify($pwdPeppered, $existingHashFromDb[0]["password"]);
                if ($isPasswordCorrect) {
                    $secret_Key  = JWT_SECRET_KEY;
                    $date   = new DateTimeImmutable();
                    $expire_at     = $date->modify(JWT_MODIFIER)->getTimestamp();
                    $domainName = JWT_DOMAIN_NAME;
                    $username   = $this->username;
                    $request_data = [
                        'iat'  => $date->getTimestamp(),         // Issued at: time when the token was generated
                        'iss'  => $domainName,                   // Issuer
                        'nbf'  => $date->getTimestamp(),         // Not before
                        'exp'  => $expire_at,                    // Expire
                        'userName' => $username,                 // User name
                    ];
                    $token = JWT::encode(
                        $request_data,
                        $secret_Key,
                        'HS512'
                    );
                    apache_setenv('TOKEN', $token);
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
            $this->sendOutput(
                $responsedata,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    //#TODO PASSWORD PEPPER: https://www.php.net/manual/de/function.password-hash.php#usernotes
    // create users in database
    public function createAction()
    {
        if (strtoupper($this->requestMethod) == 'POST') {
            $strErrorDesc = '';
            $pepper = pepper;
            try {
                $this->setFromQueryParams();
                $pwdPeppered = hash_hmac("sha256", $this->password, $pepper);
                $hashToStoreInDb = password_hash($pwdPeppered, PASSWORD_BCRYPT);
                $usernameCount = $this->repo->getUsernameCount($this->username);
                $userAlreadyExists = false;

                if ($usernameCount[0]["COUNT(1)"] > 0) {
                    $userAlreadyExists = true;
                }

                if (!$userAlreadyExists) {
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
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
}
