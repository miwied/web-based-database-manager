import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMember } from '../models/member';
import { ISport } from '../models/sport';
import { ITeam } from '../models/team';
import { IBasicFee } from '../models/basicFees';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SportsClubApiService {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  redirectUrl: string;
  private indexUrl: string;
  private loginUrl: string;
  private httpOptions = {
    headers: {},
    params: {},
  };

  constructor(private httpClient: HttpClient) {
    this.indexUrl = 'http://localhost/index.php';
    this.loginUrl = 'http://localhost/login.php';
  }

  getAuth() {}

  async setHttpOptions() {}

  //addMember noch hinzufügen

  //CRUD
  getMembers(): Observable<IMember[]> {
    let url = `${this.indexUrl}/member/list`;
    return this.httpClient.get<IMember[]>(url, this.httpOptions);
  }
  getMember(memberId: number): Observable<IMember> {
    let url = `${this.indexUrl}/member/${memberId}`;
    return this.httpClient.get<IMember>(url, this.httpOptions);
  }

  updateMember(memberId: number, member: IMember): void {
    let url = `${this.indexUrl}/member/${memberId}`;
    this.httpClient.put<any>(url, member, this.httpOptions);
  }

  deleteMember(memberId: number) {
    let url = `${this.indexUrl}/member/${memberId}`;
    this.httpClient.delete(url, this.httpOptions);
  }

  getSports(): Observable<ISport[]> {
    let url = `${this.indexUrl}/sport`;
    return this.httpClient.get<ISport[]>(url, this.httpOptions);
  }

  getSport(sportId: number): Observable<ISport> {
    let url = `${this.indexUrl}/sport/${sportId}`;
    return this.httpClient.get<ISport>(url, this.httpOptions);
  }
  updateSport(sportId: number, sport: ISport) {
    let url = `${this.indexUrl}/sport/${sportId}`;
    this.httpClient.put<any>(url, sport, this.httpOptions);
  }
  deleteSport(sportId: number) {
    let url = `${this.indexUrl}/sport/${sportId}`;
    this.httpClient.delete(url, this.httpOptions);
  }

  getTeams(): Observable<ITeam[]> {
    let url = `${this.indexUrl}/team`;
    return this.httpClient.get<ITeam[]>(url, this.httpOptions);
  }

  getTeam(teamId: number): Observable<ITeam> {
    let url = `${this.indexUrl}/team/${teamId}`;
    return this.httpClient.get<ITeam>(url, this.httpOptions);
  }
  updateTeam(teamId: number, team: ITeam) {
    let url = `${this.indexUrl}/team/${teamId}`;
    this.httpClient.put<any>(url, team, this.httpOptions);
  }
  deleteTeam(teamId: number) {
    let url = `${this.indexUrl}/sport/${teamId}`;
    this.httpClient.delete(url, this.httpOptions);
  }

  getBasicFees(): Observable<IBasicFee[]> {
    let url = `${this.indexUrl}/basicfee`;
    return this.httpClient.get<IBasicFee[]>(url, this.httpOptions);
  }

  getBasicFee(basicfeeId: number): Observable<IBasicFee> {
    let url = `${this.indexUrl}/basicfee/${basicfeeId}`;
    return this.httpClient.get<IBasicFee>(url, this.httpOptions);
  }
  updateBasicFee(basicfeeId: number, basicfee: IBasicFee) {
    let url = `${this.indexUrl}/basicfee/${basicfeeId}`;
    this.httpClient.put<any>(url, basicfee, this.httpOptions);
  }
  deleteBasicFee(basicfeeId: number) {
    let url = `${this.indexUrl}/basicfee/${basicfeeId}`;
    this.httpClient.delete(url, this.httpOptions);
  }

  //userLogin
  userLogin(username: string, password: string) {
    this.httpOptions.headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    });
    let url = `${this.loginUrl}/getToken?username=${username}&password=${password}`;
    return this.httpClient.post<any>(url, {}, this.httpOptions).pipe(
      map((token) => {
        this.setToken(token);
        this.getLoggedInName.emit(true);
        return token;
      })
    );
  }

  userRegistration(username: string, password: string) {
    this.httpOptions.headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    });
    let url = `${this.loginUrl}/addUser?username=${username}&password=${password}`;
    return this.httpClient.post(url, {}, this.httpOptions);
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
