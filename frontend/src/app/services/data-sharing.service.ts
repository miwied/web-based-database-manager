import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBasicFee } from '../models/basicFee';
import { IMember, IMemberCreate } from '../models/member';
import { ISport } from '../models/sport';
import { ITeam } from '../models/team';
import { SportsClubApiService } from './sportsClub-api.service';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  memberData$: BehaviorSubject<IMember[]> = new BehaviorSubject<IMember[]>(
    new Array()
  );

  sportsData$: BehaviorSubject<ISport[]> = new BehaviorSubject<ISport[]>(
    new Array()
  );

  teamsData$: BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>(
    new Array()
  );

  basicFeeData$: BehaviorSubject<IBasicFee[]> = new BehaviorSubject<
    IBasicFee[]
  >(new Array());

  constructor(private apiService: SportsClubApiService) {}

  getMemberData(): Observable<IMember[]> {
    const observable = new Observable<IMember[]>();
    (<any>observable).source = this.memberData$;
    return observable;
  }

  getSportsData(): Observable<ISport[]> {
    const observable = new Observable<ISport[]>();
    (<any>observable).source = this.sportsData$;
    return observable;
  }

  getTeamsData(): Observable<ITeam[]> {
    const observable = new Observable<ITeam[]>();
    (<any>observable).source = this.teamsData$;
    return observable;
  }

  getBasicFeeData(): Observable<IBasicFee[]> {
    const observable = new Observable<IBasicFee[]>();
    (<any>observable).source = this.basicFeeData$;
    return observable;
  }

  loadMembers() {
    this.apiService.getMembers().subscribe({
      next: (members: any) => {
        this.memberData$.next(members);
      },
    });
  }

  loadSportsData() {
    this.apiService.getSports().subscribe({
      next: (sports: any) => {
        this.sportsData$.next(sports);
      },
    });
  }

  loadTeamsData() {
    this.apiService.getTeams().subscribe({
      next: (teams: any) => {
        this.teamsData$.next(teams);
      },
    });
  }

  loadBasicFeeData() {
    this.apiService.getBasicFee().subscribe({
      next: (basicFee: any) => {
        this.basicFeeData$.next(basicFee);
      },
    });
  }

  deleteMember(memberId: number) {
    let filtered = this.memberData$.value.filter(
      (member) => member.memberId != memberId
    );
    this.memberData$.next(filtered);
  }

  deleteSport(sportId: number) {
    let filtered = this.sportsData$.value.filter(
      (sport) => sport.id != sportId
    );
    this.sportsData$.next(filtered);
  }

  deleteTeam(teamId: number) {
    let filtered = this.teamsData$.value.filter((team) => team.id != teamId);
    this.teamsData$.next(filtered);
  }

  deleteBasicFee(basicFeeId: number) {
    let filtered = this.basicFeeData$.value.filter(
      (basicFee) => basicFee.id != basicFeeId
    );
    this.basicFeeData$.next(filtered);
  }
}
