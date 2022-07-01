export interface IMember {
  memberId: number;
  firstName: string;
  lastName: string;
  zipCode: number;
  city: string;
  gender: string;
  feeId: number;
  sportIds: any;
  playsInTeam: boolean;
  playerTeamId: number;
  isTrainer: boolean;
  trainerTeamId: number;
}
