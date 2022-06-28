basicFee:
    id: number,
    group: string,
    basicFee: number

member:
    id: number,
    firstName: string,
    lastName: string,
    plz: number,
    city: string,
    gender: string,
    feeId: number,
    sport_ids: number[],
    playsInTeam: boolean,
    memberTeamIds: number[],
    isTrainer: boolean,
    trainerTeamIds: number[],

sport:
    id: number,
    name: string,
    fee: number,
    leaderId: number

team:
    id: number,
    sportsId: number,
    name: string