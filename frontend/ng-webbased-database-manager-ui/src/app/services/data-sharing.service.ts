import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBasicFee } from '../models/basicFees';
import { IMember } from '../models/member';
import { ISport } from '../models/sport';
import { ITeam } from '../models/team';
import { SportsClubApiService } from './sportsClub-api.service';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  tableData$: BehaviorSubject<IMember[]> = new BehaviorSubject<IMember[]>(
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

  getTableData(): Observable<IMember[]> {
    const observable = new Observable<IMember[]>();
    (<any>observable).source = this.tableData$;
    return observable;
  }

  loadData() {
    this.apiService.getMembers().subscribe({
      next: (members: any) => {
        this.tableData$.next(members);
      },
    });
  }

  delete(memberId: number) {
    let filtered = this.tableData$.value.filter(
      (member) => member.memberId != memberId
    );
    this.tableData$.next(filtered);
  }

  getSportsData(): Observable<ISport[]> {
    const observable = new Observable<ISport[]>();
    (<any>observable).source = this.sportsData$;
    return observable;
  }

  loadSportsData() {
    this.apiService.getSports().subscribe({
      next: (sports: any) => {
        this.sportsData$.next(sports);
      },
    });
  }

  deleteSport(sportId: number) {
    let filtered = this.sportsData$.value.filter(
      (sport) => sport.id != sportId
    );
    this.sportsData$.next(filtered);
  }

  getTeamsData(): Observable<ITeam[]> {
    const observable = new Observable<ITeam[]>();
    (<any>observable).source = this.teamsData$;
    return observable;
  }

  loadTeamsData() {
    this.apiService.getTeams().subscribe({
      next: (teams: any) => {
        this.teamsData$.next(teams);
      },
    });
  }

  deleteTeam(teamId: number) {
    let filtered = this.teamsData$.value.filter((team) => team.id != teamId);
    this.teamsData$.next(filtered);
  }

  getBasicFeeData(): Observable<IBasicFee[]> {
    const observable = new Observable<IBasicFee[]>();
    (<any>observable).source = this.basicFeeData$;
    return observable;
  }

  loadBasicFeeData() {
    this.apiService.getBasicFee().subscribe({
      next: (basicFee: any) => {
        this.basicFeeData$.next(basicFee);
      },
    });
  }

  deleteBasicFee(basicFeeId: number) {
    let filtered = this.basicFeeData$.value.filter(
      (basicFee) => basicFee.id != basicFeeId
    );
    this.basicFeeData$.next(filtered);
  }
}
