export interface IMember {
  memberId: number;
  firstName: string;
  lastName: string;
  zipCode: number;
  city: string;
  gender: string;
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