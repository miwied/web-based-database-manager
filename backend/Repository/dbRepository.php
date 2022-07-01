<?php
require_once PROJECT_ROOT_PATH . "/Models/Database.php";

class DBRepository
{
    protected $db = null;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getBasicFees()
    {
        $sql = "SELECT * FROM grundbeitrag";
        return $this->db->query($sql);
    }


    public function getMembers()
    {
        $sql = "SELECT * FROM mitglied";
        return $this->db->query($sql);
    }

    public function getSportsByMemberId($mi_id)
    {
        $sql = "SELECT sa_id FROM mitglied_sportart";
        return $this->db->queryWithParams($sql, [["mi_id" => $mi_id]]);
    }

    public function getPlayerTeamInfo($mi_id)
    {
        $sql = "SELECT ma_id FROM spieler";
        return $this->db->queryWithParams($sql, [["mi_id" => $mi_id]]);
    }

    public function getTrainerInfo($mi_id)
    {
        $sql = "SELECT ma_id FROM trainer";
        return $this->db->queryWithParams($sql, [["mi_id" => $mi_id]]);
    }
}
