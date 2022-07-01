<?php
require_once PROJECT_ROOT_PATH . "/Models/Database.php";

class BasicFee
{
    public function getBasicFees()
    {
        $db = new Database();
        return $db->select("SELECT * FROM grundbeitrag");
    }
}
