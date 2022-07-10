<?php
class SportController
{
    protected $repo;

    public function __construct()
    {
        $this->repo = new DBRepository();
    }

    // create Sport
    public function createAction()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (strtoupper($requestMethod) == 'POST') {
            try {
                $this->repo->createSport(json_decode(file_get_contents('php://input'), true));
                HttpExtensionMethods::sendOutput(200);
            } catch (Error $e) {
                HttpExtensionMethods::sendOutput(500, 'Something went wrong: ' . $e->getMessage());
            }
        } else {
            HttpExtensionMethods::sendOutput(422, 'Method not supported');
        }
    }

    // get sport
    public function getAction()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (strtoupper($requestMethod) == 'GET') {
            try {
                HttpExtensionMethods::sendOutput(200, json_encode($this->repo->getSport()));
            } catch (Error $e) {
                HttpExtensionMethods::sendOutput(500, 'Something went wrong: ' . $e->getMessage());
            }
        } else {
            HttpExtensionMethods::sendOutput(422, 'Method not supported');
        }
    }

    // edit sport
    public function putAction()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (strtoupper($requestMethod) == 'PUT') {
            try {
                $this->repo->putSport(json_decode(file_get_contents('php://input'), true));
                HttpExtensionMethods::sendOutput(200);
            } catch (Error $e) {
                HttpExtensionMethods::sendOutput(500, 'Something went wrong: ' . $e->getMessage());
            }
        } else {
            HttpExtensionMethods::sendOutput(422, 'Method not supported');
        }
    }

    // delete Sport
    public function deleteAction($id)
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (strtoupper($requestMethod) == 'DELETE') {
            try {
                $this->repo->deleteSport($id);
                HttpExtensionMethods::sendOutput(200);
            } catch (Error $e) {
                HttpExtensionMethods::sendOutput(500, 'Something went wrong: ' . $e->getMessage());
            }
        } else {
            HttpExtensionMethods::sendOutput(422, 'Method not supported');
        }
    }
}
