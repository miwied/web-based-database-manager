<?php
require_once PROJECT_ROOT_PATH . "./backend/src/Models/database.php";

class BasicFeeController extends Database
{
    public function getBasicFees()
    {
        return $this->select("SELECT * FROM grundbeitrag");
    }
}
