<?php
require_once PROJECT_ROOT_PATH . "/Models/Database.php";
class Member
{
    // Variables
    private $memberId;
    private $firstName;
    private $lastName;
    private $zipCode;
    private $city;
    private $gender;
    private $feeId;
    private $sportIds;
    private $playsInTeam;
    private $memberTeamIds;
    private $isTrainer;
    private $trainerTeamIds;

    // Constructor
    function __construct(
        // $_memberId,
        // $_firstName,
        // $_lastName,
        // $_zipCode,
        // $_city,
        // $_gender,
        // $_feeId,
        // $_sportIds,
        // $_playsInTeam,
        // $_memberTeamIds,
        // $_isTrainer,
        // $_trainerTeamIds
    )
    {
        // $this->memberId = $_memberId;
        // $this->firstName = $_firstName;
        // $this->lastName = $_lastName;
        // $this->zipCode = $_zipCode;
        // $this->city = $_city;
        // $this->gender = $_gender;
        // $this->feeId = $_feeId;
        // $this->sportIds = $_sportIds;
        // $this->playsInTeam = $_playsInTeam;
        // $this->memberTeamIds = $_memberTeamIds;
        // $this->isTrainer = $_isTrainer;
        // $this->trainerTeamIds = $_trainerTeamIds;
    }

    // Methods
    function getMemberId()
    {
        return $this->memberId;
    }
    function getFirstName()
    {
        return $this->firstName;
    }
    function getLastName()
    {
        return $this->lastName;
    }
    function getZipCode()
    {
        return $this->zipCode;
    }
    function getCity()
    {
        return $this->city;
    }
    function getGender()
    {
        return $this->gender;
    }
    function getFeeId()
    {
        return $this->feeId;
    }
    function getSportIds()
    {
        return $this->sportIds;
    }
    function getPlaysInTeam()
    {
        return $this->playsInTeam;
    }
    function getMemberTeamIds()
    {
        return $this->memberTeamIds;
    }
    function getIsTrainer()
    {
        return $this->isTrainer;
    }
    function getTrainerTeamIds()
    {
        return $this->trainerTeamIds;
    }
    public function getMembers()
    {
        $db = new Database();
        return $db->select("SELECT * FROM mitglied");
    }
}
