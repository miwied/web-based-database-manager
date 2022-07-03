<?php
require_once PROJECT_ROOT_PATH . "/Models/Database.php";

class LoginController extends BaseController
{
    protected $repo;
    private $password = '';
    private $username = '';
    public function __construct()
    {
        $this->repo = new DBRepository();
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
            echo json_encode($key);
            echo json_encode($value);
        }
    }


    public function listAction()
    {
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {
            $db = new Database();
            $strErrorDesc = '';

            $this->setFromQueryParams();

            $existingHashFromDb = $this->repo->getLoginData($this->username);
            $isPasswordCorrect = password_verify($this->password, $existingHashFromDb);

            try {
                $responseData = $db->select("SELECT * FROM login_data"); //TODO!!!!
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
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    public function createAction()
    {
        $this->setFromQueryParams();
        $hashToStoreInDb = password_hash($this->password, PASSWORD_BCRYPT);
        $this->repo->postLoginData($this->username, $hashToStoreInDb);
    }
}
