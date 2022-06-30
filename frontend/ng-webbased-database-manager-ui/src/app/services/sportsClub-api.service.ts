import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, throwIfEmpty } from 'rxjs/operators';
import { IMember } from '../models/member';
import { ISport } from '../models/sport';
import { ITeam } from '../models/team';
import { IBasicFee } from '../models/basicFees';
import { map } from 'rxjs/operators';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class SportsClubApiService {
  redirectUrl: string;
  private baseUrl: string;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  private httpOptions = {
    headers: {},
    params: {},
  };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'HiernochURLeinfügen';
  }

  getAuth() {}

  async setHttpOptions() {}

  //CRUD
  getMembers(): Observable<IMember[]> {
    let url = `${this.baseUrl}/member`;
    return this.httpClient.get<IMember[]>(url, this.httpOptions);
  }
  getMember(memberId: number): Observable<IMember> {
    let url = `${this.baseUrl}/member/${memberId}`;
    return this.httpClient.get<IMember>(url, this.httpOptions);
  }

  updateMember(memberId: number, member: IMember): void {
    let url = `${this.baseUrl}/member/${memberId}`;
    this.httpClient.put<any>(url, member, this.httpOptions);
  }

  deleteMember(memberId: number) {
    let url = `${this.baseUrl}/member/${memberId}`;
    this.httpClient.delete(url, this.httpOptions);
  }

  getSports(): Observable<ISport[]> {
    let url = `${this.baseUrl}/sport`;
    return this.httpClient.get<ISport[]>(url, this.httpOptions);
  }

  getSport(sportId: number): Observable<ISport> {
    let url = `${this.baseUrl}/sport/${sportId}`;
    return this.httpClient.get<ISport>(url, this.httpOptions);
  }
  updateSport(sportId: number, sport: ISport) {
    let url = `${this.baseUrl}/sport/${sportId}`;
    this.httpClient.put<any>(url, sport, this.httpOptions);
  }
  deleteSport(sportId: number) {
    let url = `${this.baseUrl}/sport/${sportId}`;
    this.httpClient.delete(url, this.httpOptions);
  }

  getTeams(): Observable<ITeam[]> {
    let url = `${this.baseUrl}/team`;
    return this.httpClient.get<ITeam[]>(url, this.httpOptions);
  }

  getTeam(teamId: number): Observable<ITeam> {
    let url = `${this.baseUrl}/team/${teamId}`;
    return this.httpClient.get<ITeam>(url, this.httpOptions);
  }
  updateTeam(teamId: number, team: ITeam) {
    let url = `${this.baseUrl}/team/${teamId}`;
    this.httpClient.put<any>(url, team, this.httpOptions);
  }
  deleteTeam(teamId: number) {
    let url = `${this.baseUrl}/sport/${teamId}`;
    this.httpClient.delete(url, this.httpOptions);
  }

  getBasicFees(): Observable<IBasicFee[]> {
    let url = `${this.baseUrl}/basicfee`;
    return this.httpClient.get<IBasicFee[]>(url, this.httpOptions);
  }

  getBasicFee(basicfeeId: number): Observable<IBasicFee> {
    let url = `${this.baseUrl}/basicfee/${basicfeeId}`;
    return this.httpClient.get<IBasicFee>(url, this.httpOptions);
  }
  updateBasicFee(basicfeeId: number, basicfee: IBasicFee) {
    let url = `${this.baseUrl}/basicfee/${basicfeeId}`;
    this.httpClient.put<any>(url, basicfee, this.httpOptions);
  }
  deleteBasicFee(basicfeeId: number) {
    let url = `${this.baseUrl}/basicfee/${basicfeeId}`;
    this.httpClient.delete(url, this.httpOptions);
  }

  //userlogin
  public userlogin(username: string, password: string) {
    alert(username);
    alert (password)
    return this.httpClient
      .post<any>(this.baseUrl + '/login.php', { username, password })
      .pipe(
        map((Users) => {
          this.setToken(Users[0].name);
          this.getLoggedInName.emit(true);
          return Users;
        })
      );
  }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
    return false;
  }
}
