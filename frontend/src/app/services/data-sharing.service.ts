import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBasicFee } from '../models/basicFee';
import { IMember } from '../models/member';
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

  filter: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private apiService: SportsClubApiService) {}

  applyFilter(filter: any, column: string, filterText: string): void {
    this.apiService.getMembers().subscribe({
      next: (members) => {
        this.memberData$.next(members);
      },
      complete: () => {
        let test = this.memberData$.value.filter(
          (member) => member[column] === filter
        );
        this.filter.next(filterText);
        this.memberData$.next(test);
      },
    });
  }

  removeFilter(): void {
    this.filter.next('');
    this.loadMembers();
  }

  getFilter(): Observable<string> {
    return this.filter.asObservable();
  }

  getMemberData(): Observable<IMember[]> {
    return this.memberData$.asObservable();
  }

  getSportsData(): Observable<ISport[]> {
    return this.sportsData$.asObservable();
  }

  getTeamsData(): Observable<ITeam[]> {
    return this.teamsData$.asObservable();
  }

  getBasicFeeData(): Observable<IBasicFee[]> {
    return this.basicFeeData$.asObservable();
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
}
