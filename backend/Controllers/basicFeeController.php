<?php
class BasicFeeController
{
    private $repo;

    public function __construct()
    {
        $this->repo = new DBRepository();
    }

    // get list of basicFees
    public function getAction()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (strtoupper($requestMethod) == 'GET') {
            try {
                HttpExtensionMethods::sendOutput(200, json_encode($this->repo->getBasicFees()));
            } catch (Error $e) {
                HttpExtensionMethods::sendOutput(500, 'Something went wrong: ' . $e->getMessage());
            }
        } else {
            HttpExtensionMethods::sendOutput(422, 'Method not supported');
        }
    }
}
