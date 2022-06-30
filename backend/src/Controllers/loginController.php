<?php
require_once PROJECT_ROOT_PATH . "/Models/database.php";

class LoginController extends BaseController
{
    /**
     * "/login?username=INPUT&password=INPUT" Endpoint - Get list of 
     */
    public function listAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        $password = '';
        foreach ($arrQueryStringParams as $key => $value) {
            if ($key == "password") {
                $password = $value;
            }
            echo json_encode($key);
            echo json_encode($value);
        }
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        var_dump($hashed_password);


        if (strtoupper($requestMethod) == 'POST') {
            try {
                $db = new Database();
                $db->select("SELECT * FROM grundbeitrag");
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
}