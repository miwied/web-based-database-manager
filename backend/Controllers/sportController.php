<?php
class SportController extends BaseController
{
    protected $repo;

    public function __construct()
    {
        $this->repo = new DBRepository();
    }

   // create Sport
   public function createAction()
   {
       $strErrorDesc = '';
       $requestMethod = $_SERVER["REQUEST_METHOD"];

       if (strtoupper($requestMethod) == 'PUT') {
           try {
               $this->repo->createSport(json_decode(file_get_contents('php://input'), true));
               $responseData = 'Sport erfolgreich angelegt';
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
           $this->sendOutput(
               $responseData,
               array('Content-Type: application/json', 'HTTP/1.1 204 No Content')
           );
       } else {
           $this->sendOutput(
               json_encode(array('error' => $strErrorDesc)),
               array('Content-Type: application/json', $strErrorHeader)
           );
       }
   }

   // edit sport
    public function putAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'PUT') {
            try {
                $this->repo->putSport(json_decode(file_get_contents('php://input'), true));
                $responseData = 'Sportart erfolgreich bearbeitet';
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
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 204 No Content')
            );
        } else {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    // delete Sport
    public function deleteAction($id)
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'DELETE') {
            try {
                $this->repo->deleteSport($id);
                $responseData = 'Mannschaft erfolgreich gelöscht';
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
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 204 No Content')
            );
        } else {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
}
