import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMember } from '../models/member';
import { SportsClubApiService } from './sportsClub-api.service';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  tableData$: BehaviorSubject<IMember[]> = new BehaviorSubject<IMember[]>(
    new Array()
  );

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
}
