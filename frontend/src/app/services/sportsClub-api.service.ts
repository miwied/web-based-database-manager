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

  setHttpOptions() {
    let token = this.getToken();
    if (token) {
      this.httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    }
  }

  //addMember noch hinzufügen

  //CRUD
  getMembers(): Observable<IMember[]> {
    let url = `${this.indexUrl}/member/get`;
    return this.httpClient.get<IMember[]>(url, this.httpOptions);
  }

  createMember(member: IMember): void {
    let url = `${this.indexUrl}/member/create/`;
    this.httpClient.post<any>(url, member, this.httpOptions);
  }

  putMember(member: IMember): Observable<any> {
    let url = `${this.indexUrl}/member/edit/`;
    return this.httpClient.put<any>(url, member, this.httpOptions);
  }

  deleteMember(memberId: number): Observable<any> {
    let url = `${this.indexUrl}/member/delete/${memberId}`;
    return this.httpClient.delete(url, this.httpOptions);
  }

  getSports(): Observable<ISport[]> {
    let url = `${this.indexUrl}/sport/get`;
    return this.httpClient.get<ISport[]>(url, this.httpOptions);
  }

  createSport(sport: ISport): void {
    let url = `${this.indexUrl}/sport/create`;
    this.httpClient.post<ISport[]>(url, sport, this.httpOptions);
  }

  updateSport(sport: ISport): void {
    let url = `${this.indexUrl}/sport/edit`;
    this.httpClient.put<any>(url, sport, this.httpOptions);
  }
  deleteSport(sportId: number) {
    let url = `${this.indexUrl}/sport/delete/${sportId}`;
    this.httpClient.delete(url, this.httpOptions);
  }

  getTeams(): Observable<ITeam[]> {
    let url = `${this.indexUrl}/team/get`;
    return this.httpClient.get<ITeam[]>(url, this.httpOptions);
  }
  createTeams(team: ITeam): void {
    let url = `${this.indexUrl}/team/create`;
    this.httpClient.post(url, team, this.httpOptions);
  }

  getBasicFee(): Observable<IBasicFee[]> {
    let url = `${this.indexUrl}/basicFee/get`;
    return this.httpClient.get<IBasicFee[]>(url, this.httpOptions);
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
    let url = `${this.loginUrl}/createUser?username=${username}&password=${password}`;
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
