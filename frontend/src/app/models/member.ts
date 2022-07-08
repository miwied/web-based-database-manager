export interface IMember {
  memberId: number;
  firstName: string;
  lastName: string;
  zipCode: number;
  city: string;
  gender: string;
  feeId: number;
  feeGroup: string;
  fee: number;
  sportIds: any;
  sports: any;
  isPlayer: boolean;
  playerTeamId: number;
  playerTeamName: any;
  isTrainer: boolean;
  trainerTeamId: number;
  trainerTeamName: any;
}

export interface IMemberEdit {
  memberId: number;
  firstName: string;
  lastName: string;
  zipCode: number;
  city: string;
  gender: string;
  feeId: number;
  oldSportIds: any;
  sportIds: any;
  isPlayer: boolean;
  oldPlayerTeamId: number;
  newPlayerTeamId: number;
  isTrainer: boolean;
  oldTrainerTeamId: number;
  newTrainerTeamId: number;
}
