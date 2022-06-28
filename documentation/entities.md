basicFee:
    basicFeeId: number,
    group: string,
    basicFee: number

member:
    memberId: number,
    firstName: string,
    lastName: string,
    zipCode: number,
    city: string,
    gender: string,
    feeId: number,
    sportIds: number[],
    playsInTeam: boolean,
    memberTeamIds: number[],
    isTrainer: boolean,
    trainerTeamIds: number[],

sport:
    sportId: number,
    name: string,
    fee: number,
    leaderId: number

team:
    teamId: number,
    sportsId: number,
    name: string