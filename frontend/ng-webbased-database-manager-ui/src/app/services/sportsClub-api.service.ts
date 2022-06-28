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
    this.baseUrl = "HiernochURLeinfügen";

  }

  getAuth() {}

  async setHttpOptions() { }
  

  getMembers(): Observable<IMember[]>{
    let url = `${this.baseUrl}/member`;
    return this.http.get<IMember[]>(url, this.httpOptions);
  }
  getMember(memberId: string): Observable<IMember>{
    let url = `${this.baseUrl}/member/${memberId}`;
    return this.http.get<IMember>(url, this.httpOptions);
  }

  updateMember(memberId: string, member: IMember): void {
    let url = `${this.baseUrl}/member/${memberId}`;
     this.http.put<any>(url, member, this.httpOptions);
  }

  deleteMember(memberId: string) {
    let url = `${this.baseUrl}/member/${memberId}`;
    this.http.delete(url, this.httpOptions);
  }





}
