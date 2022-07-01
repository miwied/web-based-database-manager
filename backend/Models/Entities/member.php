<?php
require_once PROJECT_ROOT_PATH . "/Models/Database.php";
class Member
{
    // Variables
    public $memberId;
    public $firstName;
    public $lastName;
    public $zipCode;
    public $city;
    public $gender;
    public $feeId;
    public $sportIds;
    public $playsInTeam;
    public $playerTeamId;
    public $isTrainer;
    public $trainerTeamId;

    // Constructor
    public function __construct(
        $_memberId,
        $_firstName,
        $_lastName,
        $_zipCode,
        $_city,
        $_gender,
        $_feeId,
        $_sportIds,
        $_playsInTeam,
        $_playerTeamId,
        $_isTrainer,
        $_trainerTeamId
    ) {
        $this->memberId = $_memberId;
        $this->firstName = $_firstName;
        $this->lastName = $_lastName;
        $this->zipCode = $_zipCode;
        $this->city = $_city;
        $this->gender = $_gender;
        $this->feeId = $_feeId;
        $this->sportIds = $_sportIds;
        $this->playsInTeam = $_playsInTeam;
        $this->playerTeamId = $_playerTeamId;
        $this->isTrainer = $_isTrainer;
        $this->trainerTeamId = $_trainerTeamId;
    }
}
