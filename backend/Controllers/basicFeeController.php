<?php
class BasicFeeController
{
    private $repo;
    private $httpHelper;

    public function __construct()
    {
        $this->repo = new DBRepository();
        $this->httpHelper = new HttpExtensionMethods();
    }

    // get list of basicFees
    public function getAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'GET') {
            try {
                $responseData = json_encode($this->repo->getBasicFees());
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . 'Something went wrong!';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // send output
        if (!$strErrorDesc) {
            $this->httpHelper->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->httpHelper->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
}
