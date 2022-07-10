<?php
class DBRepository
{
    protected $db = null;

    public function __construct()
    {
        $this->db = new Database();
    }

    // #basicFee
    public function getBasicFees()
    {
        $sql = "SELECT * FROM grundbeitrag";
        return $this->db->query($sql);
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
        if (isset($member["isTrainer"]) && isset($member["trainerTeamId"]) && $member["isTrainer"]) {
            $sqlCreateTrainer = "INSERT INTO trainer(ma_id, mi_id) VALUES (?,?)";
            $this->db->executeWithParams($sqlCreateTrainer, [$member["trainerTeamId"], $memberId]);
        }

        // create the member-player association inside table spieler if isPlayer == true
        if (isset($member["isPlayer"]) && isset($member["playerTeamId"]) && $member["isPlayer"]) {
            $sqlCreatePlayer = "INSERT INTO spieler(ma_id, mi_id) VALUES (?,?)";
            $this->db->executeWithParams($sqlCreatePlayer, [$member["playerTeamId"], $memberId]);
        }

        // create the member-sports association inside table mitglied_sportart if array is not empty
        if (isset($member["sportIds"]) && count($member["sportIds"]) > 0) {
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
        // update the member
        $sqlUpdateMember = "UPDATE mitglied SET vorname = ?, nachname = ?, plz = ?, ort = ?, geschlecht = ?, gb_id = ? WHERE mi_id = ?";
        $this->db->executeWithParams($sqlUpdateMember, [$member["firstName"], $member["lastName"], $member["zipCode"], $member["city"], $member["gender"], $member["feeId"], $member["memberId"]]);

        // delete old member-sports associations and create new ones
        foreach ($member["oldSportIds"] as $key => $oldSport)
            $this->deleteMemberSportById($member["memberId"], $oldSport["sa_id"]);

        foreach ($member["sportIds"] as $key => $newSport)
            $this->createSportForMember($member["memberId"], $newSport["sa_id"]);

        // check if the member is a player, a trainer, or neither
        if ($member["isPlayer"]) {
            // if he used to be a trainer we delete the trainer association
            if ($member["oldTrainerTeamId"])
                $this->deleteTrainer($member["memberId"], $member["oldTrainerTeamId"]);
            // if he used to be a player before we update the player association
            if ($member["oldPlayerTeamId"]) {
                $sqlUpdateMemberPlayerAssociation = "UPDATE spieler SET ma_id = ? WHERE ma_id = ? AND mi_id = ?";
                $this->db->executeWithParams($sqlUpdateMemberPlayerAssociation, [$member["newPlayerTeamId"], $member["oldPlayerTeamId"], $member["memberId"]]);
            }
            // if he was neither we create a new player association
            else $this->createPlayer($member["memberId"], $member["newPlayerTeamId"]);
        } else if ($member["isTrainer"]) {
            // if he used to be a player we delete the player association
            if ($member["oldPlayerTeamId"])
                $this->deletePlayer($member["memberId"], $member["oldPlayerTeamId"]);
            // if he used to be a trainer before we update the trainer association
            if ($member["oldTrainerTeamId"]) {
                $sqlUpdateMemberTrainerAssociation = "UPDATE trainer SET ma_id = ? WHERE ma_id = ? AND mi_id = ?";
                $this->db->executeWithParams($sqlUpdateMemberTrainerAssociation, [$member["newTrainerTeamId"], $member["oldTrainerTeamId"], $member["memberId"]]);
            }
            // if he was neither we create a new trainer association
            else $this->createTrainer($member["memberId"], $member["newTrainerTeamId"]);
        } else if (!($member['isPlayer'] && $member['isTrainer'])) {
            // if he used to be a player we delete that association because the updated value tells us he is neither now
            if ($member["oldPlayerTeamId"])
                $this->deletePlayer($member["memberId"], $member["oldPlayerTeamId"]);
            // if he used to be a trainer we delete that association because the updated value tells us he is neither now 
            else if ($member["oldTrainerTeamId"])
                $this->deleteTrainer($member["memberId"], $member["oldTrainerTeamId"]);
        }
    }

    public function deleteMember($id)
    {
        // lösche das eigentliche Mitglied
        $sqlDeleteMember = "DELETE FROM mitglied WHERE mi_id = ?";
        $this->db->executeWithParams($sqlDeleteMember, [$id]);
    }

    // #sports / member
    private function createSportForMember($mi_id, $sa_id)
    {
        $sql = "INSERT INTO mitglied_sportart(mi_id, sa_id) VALUES (?,?)";
        $this->db->executeWithParams($sql, [$mi_id, $sa_id]);
    }

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

    private function deleteMemberSportById($mi_id, $sa_id)
    {
        $sql = "DELETE FROM mitglied_sportart WHERE mi_id = ? AND sa_id = ?";
        $this->db->executeWithParams($sql, [$mi_id, $sa_id]);
    }

    // #team
    public function createTeam($team)
    {
        $sql = "INSERT INTO mannschaft(sa_id, teamname) VALUES (?,?)";
        $this->db->executeWithParams($sql, [$team["sportsId"], $team["teamname"]]);
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
        $this->db->executeWithParams($sql, [$sport["abteilung"], $sport["fee"], $sport["leaderId"]]);
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
    private function createPlayer($mi_id, $ma_id)
    {
        $sql = "INSERT INTO spieler(mi_id, ma_id) VALUES (?, ?)";
        $this->db->executeWithParams($sql, [$mi_id, $ma_id]);
    }

    public function getPlayerTeamInfo($mi_id)
    {
        $sql = "SELECT ma_id FROM spieler WHERE mi_id = ?";
        return $this->db->queryWithParams($sql, [$mi_id]);
    }

    private function deletePlayer($mi_id, $ma_id)
    {
        $sql = "DELETE FROM spieler WHERE mi_id = ? AND ma_id = ?";
        $this->db->executeWithParams($sql, [$mi_id, $ma_id]);
    }

    // #trainer
    private function createTrainer($mi_id, $ma_id)
    {
        $sql = "INSERT INTO trainer(mi_id, ma_id) VALUES (?, ?)";
        $this->db->executeWithParams($sql, [$mi_id, $ma_id]);
    }

    public function getTrainerInfo($mi_id)
    {
        $sql = "SELECT ma_id FROM trainer WHERE mi_id = ?";
        return $this->db->queryWithParams($sql, [$mi_id]);
    }

    private function deleteTrainer($mi_id, $ma_id)
    {
        $sql = "DELETE FROM trainer WHERE mi_id = ? AND ma_id = ?";
        $this->db->executeWithParams($sql, [$mi_id, $ma_id]);
    }

    // #login
    public function getPwdByUsername($username)
    {
        $sql = "SELECT password FROM login_data WHERE username = ?";
        return $this->db->queryWithParams($sql, [$username]);
    }

    public function getUsernameCount($username)
    {
        $sql = "SELECT COUNT(1) FROM login_data WHERE username = ?";
        return $this->db->queryWithParams($sql, [$username]);
    }

    public function putLoginData($username, $password)
    {
        $sql = "INSERT INTO login_data(username, password) VALUES (?,?)";
        $this->db->executeWithParams($sql, [$username, $password]);
    }
}
