<?php
require_once PROJECT_ROOT_PATH . "/Models/Entities/member.php";
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

    private function mapMembers($input)
    {
        $result = array();
        foreach ($input as $key => $value) {
            // get sports ids
            $sportsIds = $this->repo->getSportsByMemberId($value['mi_id']);

            // get info about which team the member plays for (if he is a player)
            $playerTeamInfo = $this->repo->getPlayerTeamInfo($value['mi_id']);
            $playsInTeam = count($playerTeamInfo) > 0;
            $playerTeamId = $playsInTeam ? $playerTeamInfo[0]["ma_id"] : "0";

            // get info about which team the member is training (if he is a trainer)
            $trainerTeamInfo = $this->repo->getTrainerInfo($value['mi_id']);
            $isTrainer = count($trainerTeamInfo) > 0;
            $trainerTeamId = $isTrainer ? $trainerTeamInfo[0]["ma_id"] : "0";

            // set the member 
            // $_memberId, $_firstName, $_lastName, $_zipCode, $_city, 
            // $_gender, $_feeId, $_sportIds, $_playsInTeam, 
            // $_playerTeamId, $_isTrainer, $_trainerTeamId
            $tmpMember = new Member(
                $value['mi_id'],
                $value['vorname'],
                $value['nachname'],
                $value['plz'],
                $value['ort'],
                $value['geschlecht'],
                $value['gb_id'],
                $sportsIds,
                $playsInTeam,
                $playerTeamId,
                $isTrainer,
                $trainerTeamId
            );
            array_push($result, $tmpMember);
        }
        return $result;
    }
}
