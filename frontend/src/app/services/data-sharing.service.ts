import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SportsClubApiService } from './sportsClub-api.service';
import { IBasicFee } from '../models/basicFee';
import { IFilter } from '../models/filter';
import { IMember } from '../models/member';
import { ISport } from '../models/sport';
import { ITeam } from '../models/team';
import * as _ from 'lodash';

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

  filter: BehaviorSubject<IFilter> = new BehaviorSubject<IFilter>(
    {} as IFilter
  );

  constructor(private apiService: SportsClubApiService) {}

  applyFilter(filter: any, column: string, filterText: string): void {
    this.apiService.getMembers().subscribe({
      next: (members) => {
        this.memberData$.next(members);
      },
      complete: () => {
        let filterVal = '';
        if (!Array.isArray(filter)) {
          filterVal = filter;
        } else {
          let cnt = 0;
          filter.forEach((f) => {
            if (!Array.isArray(f)) {
              filterVal += f.teamname;
            } else {
              for (let index = 0; index < f.length; index++) {
                if (cnt === filter.length - 1) {
                  filterVal += f[index].abteilung;
                } else {
                  filterVal += f[index].abteilung + ', ';
                  cnt++;
                }
              }
            }
          });
        }
        if (column === 'fee') {
          filter = _.parseInt(filter);
        }
        let filtered = this.memberData$.value.filter((member) =>
          _.isEqual(filter, member[column])
        );
        let f = {
          filterName: filterText,
          filterValue: filterVal,
          column: column,
        } as IFilter;
        this.filter.next(f);
        this.memberData$.next(filtered);
      },
    });
  }

  removeFilter(): void {
    this.filter.next({} as IFilter);
    this.loadMembers();
  }

  getFilter(): Observable<IFilter> {
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
