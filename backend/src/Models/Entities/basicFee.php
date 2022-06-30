<?php
require_once PROJECT_ROOT_PATH . "/Models/database.php";

class BasicFee
{
    // Variables
    private $basicFeeId;
    private $group;
    private $basicFee;

    // Constructor
    function __construct($_basicFeeId, $_group, $_basicFee)
    {
        $this->basicFeeId = $_basicFeeId;
        $this->group = $_group;
        $this->basicFee = $_basicFee;
    }

    // Methods
    function getBasicFeeId()
    {
        return $this->basicFeeId;
    }
    function getGroup()
    {
        return $this->group;
    }
    function getBasicFee()
    {
        return $this->basicFee;
    }

    public function getBasicFees()
    {
        $db = new Database();
        return $db->select("SELECT * FROM grundbeitrag");
    }
}
