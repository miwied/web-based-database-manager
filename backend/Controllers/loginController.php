<?php

use Firebase\JWT\JWT;

require_once PROJECT_ROOT_PATH . "/Models/Database.php";
require_once PROJECT_ROOT_PATH . "/vendor/autoload.php";
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
    /**
     * "/login?username=INPUT&password=INPUT" Endpoint - Get list of 
     */

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
            $this->setFromQueryParams();
            try {
                $existingHashFromDb = $this->repo->getLoginData($this->username);
                $isPasswordCorrect = password_verify($this->password, $existingHashFromDb[0]["password"]);
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
                    $responsedata = $token;
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

    // create users in database
    public function createAction()
    {
        if (strtoupper($this->requestMethod) == 'POST') {
            $strErrorDesc = '';
            try {
                $this->setFromQueryParams();
                $hashToStoreInDb = password_hash($this->password, PASSWORD_BCRYPT);
                $this->repo->postLoginData($this->username, $hashToStoreInDb);
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
