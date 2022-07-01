export interface IMember {
  id: number;
  firstName: string;
  lastName: string;
  zipCode: number;
  city: string;
  gender: string;
  feeId: number;
  sportIds: number[];
  playsInTeam: boolean;
  memberTeamIds: number[];
  isTrainer: boolean;
  trainerTeamIds: number[];
}

export interface IMemberTest {
  mi_id: number;
  vorname: string;
  nachname: string;
  plz: string;
  ort: string;
  geschlecht: string;
  or_id: number;
  gb_id: number;
}
