<?php
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

    private function getBasicFeeId($feeGroup)
    {
        $sql = "SELECT gb_id FROM grundbeitrag WHERE personengruppe = ?";
        return $this->db->queryWithParams($sql, [$feeGroup]);
    }

    public function getBasicFeeInfo($gb_id)
    {
        $sql = "SELECT personengruppe, beitrag FROM grundbeitrag WHERE gb_id = ?";
        return $this->db->queryWithParams($sql, [$gb_id]);
    }

    // #members
    public function createMember($member)
    {
        // create the member inside table mitglied and get the last inserted id for creating trainer info
        $sqlCreateMember = "INSERT INTO mitglied(vorname, nachname, plz, ort, geschlecht, or_id, gb_id) VALUES (?,?,?,?,?,?,?)";
        $memberId = $this->db->executeWithParamsAndGetLastInsertedId($sqlCreateMember, [$member["firstName"], $member["lastName"], $member["zipCode"], $member["city"], $member["gender"], 2, $member["feeId"]]);

        // create the member-trainer association inside table trainer if isTrainer == true
        if ($member["isTrainer"]) {
            $sqlCreateTrainer = "INSERT INTO trainer(ma_id, mi_id) VALUES (?,?)";
            $this->db->executeWithParams($sqlCreateTrainer, [$member["trainerTeamId"], $memberId]);
        }

        // create the member-player association inside table spieler if isPlayer == true
        if ($member["isPlayer"]) {
            $sqlCreatePlayer = "INSERT INTO spieler(ma_id, mi_id) VALUES (?,?)";
            $this->db->executeWithParams($sqlCreatePlayer, [$member["playerTeamId"], $memberId]);
        }

        // create the member-sports association inside table mitglied_sportart if array is not empty
        if (count($member["sportIds"]) > 0) {
            foreach ($member["sportIds"] as $key => $sportId) {
                $sqlCreateMemberSport = "INSERT INTO mitglied_sportart(mi_id, sa_id) VALUES(?,?)";
                $this->db->executeWithParams($sqlCreateMemberSport, [$memberId, $sportId["sa_id"]]);
            }
        }
    }

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
    public function createTeam($team)
    {
        $sql = "INSERT INTO mannschaft(sa_id, teamname) VALUES (?,?)";
        $this->db->executeWithParams($sql, [$team["sportsId"], $team["name"]]);
    }

    public function getTeam()
    {
        $sql = "SELECT * FROM mannschaft";
        return $this->db->query($sql);
    }

    public function getTeamname($ma_id)
    {
        $sql = "SELECT teamname FROM mannschaft WHERE ma_id = ?";
        return $this->db->queryWithParams($sql, [$ma_id]);
    }

    public function putTeamname($team)
    {
        $sql = "UPDATE mannschaft SET teamname = ? WHERE ma_id = ? AND sa_id = ?";
        $this->db->executeWithParams($sql, [$team["name"], $team["teamId"], $team["sportsId"]]);
    }

    public function deleteTeam($id)
    {
        $sql = "DELETE FROM mannschaft WHERE ma_id = ?";
        $this->db->executeWithParams($sql, [$id]);
    }

    // #sport
    public function createSport($sport)
    {
        $sql = "INSERT INTO sportart(abteilung, beitrag, mi_id) VALUES (?,?,?)";
        $this->db->executeWithParams($sql, [$sport["name"], $sport["fee"], $sport["leaderId"]]);
    }

    public function getSport()
    {
        $sql = "SELECT * FROM sportart";
        return $this->db->query($sql);
    }

    public function putSport($sport)
    {
        $sql = "UPDATE sportart SET abteilung = ?, beitrag = ?, mi_id = ?  WHERE sa_id = ?";
        $this->db->executeWithParams($sql, [$sport["name"], $sport["fee"], $sport["leaderId"], $sport["sportId"]]);
    }

    public function deleteSport($id)
    {
        $sql = "DELETE FROM sportart WHERE sa_id = ?";
        $this->db->executeWithParams($sql, [$id]);
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
    public function getPwdByUsername($username)
    {
        $sql = "SELECT password FROM login_data WHERE username = ?";
        return $this->db->queryWithParams($sql, [$username]);
    }

    public function putLoginData($username, $password)
    {
        $sql = "INSERT INTO login_data(username, password) VALUES (?,?)";
        $this->db->executeWithParams($sql, [$username, $password]);
    }

    public function getUsernameCount($username)
    {
        $sql = "SELECT COUNT(1) FROM login_data WHERE username = ?";
        return $this->db->queryWithParams($sql, [$username]);
    }
}
