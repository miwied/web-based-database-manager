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
