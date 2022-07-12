export interface IMember {
  memberId: number;
  [key: string]: any;
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

export interface IMemberCreate {
  firstName: string;
  lastName: string;
  zipCode: number;
  city: string;
  gender: string;
  feeId: number;
  sportIds: any;
  isPlayer: boolean;
  playerTeamId: number;
  isTrainer: boolean;
  trainerTeamId: number;
}
