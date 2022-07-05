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
        $sqlUpdateMember = "UPDATE mitglied SET vorname = ?, nachname = ?, plz = ?, ort = ?, geschlecht = ? WHERE mi_id = ?";
        $this->db->executeWithParams($sqlUpdateMember, [$member["firstName"], $member["lastName"], $member["zipCode"], $member["city"], $member["gender"], $member["memberId"]]);
        foreach ($member["sportIds"] as $key => $value) {
            $sqlUpdateMemberSportsAssociation = "UPDATE mitglied_sportart SET mi_id = ?, sa_id = ? WHERE mi_id = ? AND sa_id = ?";
            $this->db->executeWithParams($sqlUpdateMemberSportsAssociation, [$member["memberId"], $value["sa_id"], $member["memberId"], $value["sa_id"]]);
        }
        $sqlUpdateMemberPlayerAssociation = "UPDATE spieler SET ma_id = ?, mi_id = ? WHERE ma_id = ? AND mi_id = ?";
        $this->db->executeWithParams($sqlUpdateMemberPlayerAssociation, [$member["playerTeamId"], $member["memberId"], $member["playerTeamId"], $member["memberId"]]);
    }

    public function deleteMember($id)
    {
        // $sqlDelete = "DELETE FROM mitglied as m join sportart as sp on m.mi_id = sp.mi_id join mitglied_sportart as ms on m.mi_id = ms.mi_id join spieler as spi on m.mi_id = spi.mi_id join trainer as t on m.mi_id = t.mi_id where mi_id = ?";
        // $this->db->executeWithParams($sqlDelete, [$id]);

        // // update unnötige mi_id spalte in der sportart tabelle weil sonst constraint fehlschlägt
        // $sqlUpdateSportMember = "DELETE FROM sportart WHERE mi_id = ?";
        // $this->db->executeWithParams($sqlUpdateSportMember, [$id]);

        // // lösche assoziation mit der sportart
        // $sqlDeleteMemberSportAssociation = "DELETE FROM mitglied_sportart WHERE mi_id = ?";
        // $this->db->executeWithParams($sqlDeleteMemberSportAssociation, [$id]);

        // // lösche assoziation mit der mannschaft als spieler
        // $sqlDeleteMemberPlayerAssociation = "DELETE FROM spieler WHERE mi_id = ?";
        // $this->db->executeWithParams($sqlDeleteMemberPlayerAssociation, [$id]);

        // // lösche assoziation mit der mannschaft als trainer
        // $sqlDeleteMemberTrainerAssociation = "DELETE FROM trainer WHERE mi_id = ?";
        // $this->db->executeWithParams($sqlDeleteMemberTrainerAssociation, [$id]);

        // lösche das eigentliche Mitglied
        $sqlDeleteMember = "DELETE FROM mitglied WHERE mi_id = ?";
        $this->db->executeWithParams($sqlDeleteMember, [$id]);
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
