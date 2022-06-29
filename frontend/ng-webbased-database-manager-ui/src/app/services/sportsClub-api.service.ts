import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, throwIfEmpty } from 'rxjs/operators';
import { IMember } from '../models/member';
import { ISport } from '../models/sport';
import { ITeam } from '../models/team';
import { IBasicFee } from '../models/basicFee';

@Injectable({
  providedIn: 'root',
})
export class SportsClubApiService {
  private baseUrl: string;
  private httpOptions = {
    headers: {},
    params: {},
  };

  constructor(private http: HttpClient) {
    this.baseUrl = 'HiernochURLeinfügen';
  }

  getAuth() {}

  async setHttpOptions() {}

  getMembers(): Observable<IMember[]> {
    let url = `${this.baseUrl}/member`;
    return this.http.get<IMember[]>(url, this.httpOptions);
  }
  getMember(memberId: number): Observable<IMember> {
    let url = `${this.baseUrl}/member/${memberId}`;
    return this.http.get<IMember>(url, this.httpOptions);
  }

  updateMember(memberId: number, member: IMember): void {
    let url = `${this.baseUrl}/member/${memberId}`;
    this.http.put<any>(url, member, this.httpOptions);
  }

  deleteMember(memberId: number) {
    let url = `${this.baseUrl}/member/${memberId}`;
    this.http.delete(url, this.httpOptions);
  }

  getSports(): Observable<ISport[]> {
    let url = `${this.baseUrl}/sport`;
    return this.http.get<ISport[]>(url, this.httpOptions);
  }

  getSport(sportId: number): Observable<ISport> {
    let url = `${this.baseUrl}/sport/${sportId}`;
    return this.http.get<ISport>(url, this.httpOptions);
  }
  updateSport(sportId: number, sport: ISport) {
    let url = `${this.baseUrl}/sport/${sportId}`;
    this.http.put<any>(url, sport, this.httpOptions);
  }
  deleteSport(sportId: number) {
    let url = `${this.baseUrl}/sport/${sportId}`;
    this.http.delete(url, this.httpOptions);
  }

  getTeams(): Observable<ITeam[]> {
    let url = `${this.baseUrl}/team`;
    return this.http.get<ITeam[]>(url, this.httpOptions);
  }

  getTeam(teamId: number): Observable<ITeam> {
    let url = `${this.baseUrl}/team/${teamId}`;
    return this.http.get<ITeam>(url, this.httpOptions);
  }
  updateTeam(teamId: number, team: ITeam) {
    let url = `${this.baseUrl}/team/${teamId}`;
    this.http.put<any>(url, team, this.httpOptions);
  }
  deleteTeam(teamId: number) {
    let url = `${this.baseUrl}/sport/${teamId}`;
    this.http.delete(url, this.httpOptions);
  }

  getBasicFees(): Observable<IBasicFee[]> {
    let url = `${this.baseUrl}/basicfee`;
    return this.http.get<IBasicFee[]>(url, this.httpOptions);
  }

  getBasicFee(basicfeeId: number): Observable<IBasicFee> {
    let url = `${this.baseUrl}/basicfee/${basicfeeId}`;
    return this.http.get<IBasicFee>(url, this.httpOptions);
  }
  updateBasicFee(basicfeeId: number, basicfee: IBasicFee) {
    let url = `${this.baseUrl}/basicfee/${basicfeeId}`;
    this.http.put<any>(url, basicfee, this.httpOptions);
  }
  deleteBasicFee(basicfeeId: number) {
    let url = `${this.baseUrl}/basicfee/${basicfeeId}`;
    this.http.delete(url, this.httpOptions);
  }
}
