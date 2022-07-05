<?php
class MemberController extends BaseController
{
    protected $repo;

    public function __construct()
    {
        $this->repo = new DBRepository();
    }

    /**
     * "/member/list" Endpoint - Get list of members
     */
    public function listAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'GET') {
            try {
                $arrMembers = $this->repo->getMembers();
                $responseData = json_encode($this->mapMembers($arrMembers));
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
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    public function putAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'PUT') {
            try {
                $this->repo->putMember(json_decode(file_get_contents('php://input'), true));
                $responseData = 'Mitglied erfolgreich bearbeitet';
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

    public function deleteAction($id)
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'DELETE') {
            try {
                $this->repo->deleteMember($id);
                $responseData = 'Mitglied erfolgreich gelöscht';
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

    private function mapMembers($input)
    {
        $result = array();
        foreach ($input as $k => $value) {
            // get sports info
            $sportsIds = $this->repo->getSportsByMemberId($value["mi_id"]);
            $sports = array();
            foreach ($sportsIds as $key => $id) {
                array_push($sports, $this->repo->getSportsInfoById($id["sa_id"]));
            }

            // get info about which team the member plays for (if he is a player)
            $playerTeams = $this->repo->getPlayerTeamInfo($value["mi_id"]);
            $isPlayer = count($playerTeams) > 0;
            $playerTeamId = $isPlayer ? $playerTeams[0]["ma_id"] : null;
            $playerTeamName = $isPlayer ? $this->repo->getTeamName($playerTeamId) : null;

            // get info about which team the member is training (if he is a trainer)
            $trainerTeams = $this->repo->getTrainerInfo($value['mi_id']);
            $isTrainer = count($trainerTeams) > 0;
            $trainerTeamId = $isTrainer ? $trainerTeams[0]["ma_id"] : null;
            $trainerTeamName = $isTrainer ? $this->repo->getTeamName($trainerTeamId) : null;

            // get info about the name of the fee group
            $feeInfo = $this->repo->getBasicFeeInfo($value["gb_id"]);
            $feeGroup = $feeInfo[0]["personengruppe"];

            // get info about the fees the member pays
            $fee = $feeInfo[0]["beitrag"];
            foreach ($sports as $key => $sportsFee) {
                if ($key == "beitrag") {
                    $fee += $sportsFee;
                }
            }

            $tmp = (object) [
                'memberId' => $value["mi_id"],
                'firstName' => $value["vorname"],
                'lastName' => $value["nachname"],
                'zipCode' => $value["plz"],
                'city' => $value["ort"],
                'gender' => $value["geschlecht"],
                'feeGroup' => $feeGroup,
                'fee' => $fee,
                'sportIds' => $sportsIds,
                'sports' => $sports,
                'isPlayer' => $isPlayer,
                'playerTeamId' => $playerTeamId,
                'playerTeamName' => $playerTeamName,
                'isTrainer' => $isTrainer,
                'trainerTeamId' => $trainerTeamId,
                'trainerTeamName' => $trainerTeamName
            ];
            array_push($result, $tmp);
        }
        return $result;
    }
}
