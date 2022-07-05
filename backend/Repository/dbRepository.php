<?php
require_once PROJECT_ROOT_PATH . "/dbContext/Database.php";

class DBRepository
{
    protected $db = null;

    public function __construct()
    {
        $this->db = new Database();
    }

    // #members
    public function getMembers()
    {
        $sql = "SELECT * FROM mitglied";
        return $this->db->query($sql);
    }

    public function putMember($member)
    {
        $sql = "UPDATE mitglied SET vorname = :vorname, nachname = :nachname, plz = :plz, ort = :ort, geschlecht = :geschlecht";
        return $this->db->query($sql);
    }

    // #sports / member
    public function getSportsByMemberId($mi_id)
    {
        $sql = "SELECT sa_id FROM mitglied_sportart";
        return $this->db->queryWithParams($sql, [["mi_id" => $mi_id]]);
    }

    // #player / team
    public function getPlayerTeamInfo($mi_id)
    {
        $sql = "SELECT ma_id FROM spieler";
        return $this->db->queryWithParams($sql, [["mi_id" => $mi_id]]);
    }

    public function putTeamname($teamname)
    {
    }

    // #trainer
    public function getTrainerInfo($mi_id)
    {
        $sql = "SELECT ma_id FROM trainer";
        return $this->db->queryWithParams($sql, [["mi_id" => $mi_id]]);
    }

    // #login
    public function getLoginData($username)
    {
        $sql = "SELECT password FROM login_data";
        return $this->db->queryWithParams($sql, [["username" => $username]]);
    }

    public function getUsernameCount($username)
    {
        $sql = "SELECT COUNT(1) FROM login_data";
        return $this->db->queryWithParams($sql, [["username" => $username]]);
    }

    public function postLoginData($username, $password)
    {
        $sql = "INSERT into login_data(username, password) VALUES (?,?)";
        $this->db->insertWithParams($sql, [$username, $password]);
    }
}
