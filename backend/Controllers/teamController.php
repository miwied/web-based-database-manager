<?php
class TeamController
{
    protected $repo;

    public function __construct()
    {
        $this->repo = new DBRepository();
    }

    // create team
    public function createAction()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (strtoupper($requestMethod) == 'POST') {
            try {
                $this->repo->createTeam(json_decode(file_get_contents('php://input'), true));
                HttpExtensionMethods::sendOutput(200);
            } catch (Error $e) {
                HttpExtensionMethods::sendOutput(500, 'Something went wrong: ' . $e->getMessage());
            }
        } else {
            HttpExtensionMethods::sendOutput(422, 'Method not supported');
        }
    }

    // get teams
    public function getAction()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (strtoupper($requestMethod) == 'GET') {
            try {
                HttpExtensionMethods::sendOutput(200, json_encode($this->repo->getTeam()));
            } catch (Error $e) {
                HttpExtensionMethods::sendOutput(500, 'Something went wrong: ' . $e->getMessage());
            }
        } else {
            HttpExtensionMethods::sendOutput(422, 'Method not supported');
        }
    }

    // edit teamname
    public function putAction()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (strtoupper($requestMethod) == 'PUT') {
            try {
                $this->repo->putTeamname(json_decode(file_get_contents('php://input'), true));
                HttpExtensionMethods::sendOutput(200);
            } catch (Error $e) {
                HttpExtensionMethods::sendOutput(500, 'Something went wrong: ' . $e->getMessage());
            }
        } else {
            HttpExtensionMethods::sendOutput(422, 'Method not supported');
        }
    }

    // delete team
    public function deleteAction($id)
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (strtoupper($requestMethod) == 'DELETE') {
            try {
                $this->repo->deleteTeam($id);
                HttpExtensionMethods::sendOutput(200);
            } catch (Error $e) {
                HttpExtensionMethods::sendOutput(500, 'Something went wrong: ' . $e->getMessage());
            }
        } else {
            HttpExtensionMethods::sendOutput(422, 'Method not supported');
        }
    }
}
