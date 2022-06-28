<?php
class Team
{
    // Variables
    private $teamId;
    private $sportsId;
    private $name;

    // Constructor
    function __construct($_teamId, $_sportsId, $_name)
    {
        $this->id = $_teamId;
        $this->sportsId = $_sportsId;
        $this->name = $_name;
    }

    // Methods
    function getTeamId()
    {
        return $this->teamId;
    }
    function getSportsId()
    {
        return $this->sportsId;
    }
    function getName()
    {
        return $this->name;
    }
}
