<?php
require_once PROJECT_ROOT_PATH . "/dbContext/Database.php";

class DBRepository
{
    protected $db = null;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getBasicFeeInfo($gb_id)
    {
        $sql = "SELECT personengruppe, beitrag FROM grundbeitrag WHERE gb_id = ?";
        return $this->db->queryWithParams($sql, [$gb_id]);
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
        // TODO: OLD CODE, CAN BE DELETED IF HAPPY WITH CURRENT FUNCTIONALITY
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
    public function getSportsInfoById($sa_id)
    {
        $sql = "SELECT abteilung, beitrag FROM sportart WHERE sa_id = ?";
        return $this->db->queryWithParams($sql, [$sa_id]);
    }

    public function getSportsByMemberId($mi_id)
    {
        $sql = "SELECT sa_id FROM mitglied_sportart WHERE mi_id = ?";
        return $this->db->queryWithParams($sql, [$mi_id]);
    }

    // #team
    public function getTeamName($ma_id)
    {
        $sql = "SELECT teamname FROM mannschaft WHERE ma_id = ?";
        return $this->db->queryWithParams($sql, [$ma_id]);
    }

    public function putTeamname($team)
    {
        $sql = "UPDATE mannschaft SET teamname = ? WHERE ma_id = ? AND sa_id = ?";
        $this->db->executeWithParams($sql, [$team["name"], $team["teamId"], $team["sportsId"]]);
    }

    // #player
    public function getPlayerTeamInfo($mi_id)
    {
        $sql = "SELECT ma_id FROM spieler WHERE mi_id = ?";
        return $this->db->queryWithParams($sql, [$mi_id]);
    }

    // #trainer
    public function getTrainerInfo($mi_id)
    {
        $sql = "SELECT ma_id FROM trainer WHERE mi_id = ?";
        return $this->db->queryWithParams($sql, [$mi_id]);
    }

    // #login
    public function getLoginData($username)
    {
        $sql = "SELECT password FROM login_data WHERE username = ?";
        return $this->db->queryWithParams($sql, [$username]);
    }

    public function putLoginData($username, $password)
    {
        $sql = "INSERT into login_data(username, password) VALUES (?,?)";
        $this->db->executeWithParams($sql, [$username, $password]);
    }

    public function getUsernameCount($username)
    {
        $sql = "SELECT COUNT(1) FROM login_data WHERE username = ?";
        return $this->db->queryWithParams($sql, [$username]);
    }
}
