import {
  AfterViewInit,
  AfterContentInit,
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MemberEditDialogComponent } from '../member-edit-dialog/member-edit-dialog.component';
import { MemberDeleteDialogComponent } from '../member-delete-dialog/member-delete-dialog.component';
import { MemberInputDialogComponent } from '../member-input-dialog/member-input-dialog.component';
import { SportsClubApiService } from 'src/app/services/sportsClub-api.service';
import { IMember } from 'src/app/models/member';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-sports-club-table',
  templateUrl: './sports-club-table.component.html',
  styleUrls: ['./sports-club-table.component.css'],
})
export class SportsClubTableComponent
  implements AfterViewInit, AfterContentInit, OnInit
{
  displayedColumns: string[] = [
    'memberId',
    'firstName',
    'lastName',
    'zipCode',
    'city',
    'gender',
    'isPlayer',
    'playerTeamName',
    'isTrainer',
    'trainerTeamName',
    'sports',
    'fee',
    'actions',
  ];
  dataSource: MatTableDataSource<IMember> = new MatTableDataSource();
  tokenUserName: string;
  value = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private apiService: SportsClubApiService,
    private dataSharingService: DataSharingService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.apiService.setHttpOptions();
    this.dataSharingService.loadData();
    this.dataSharingService.loadSportsData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSharingService.getTableData().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  ngAfterContentInit() {
    const helper = new JwtHelperService();
    var decodedToken = helper.decodeToken<any>(
      this.apiService.getToken()?.toString()
    );
    this.tokenUserName = decodedToken.userName;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Logout() {
    this.apiService.deleteToken();
    this.router.navigate([`login`]);
    this.snackBarService.showSnackBar(
      'Du wurdest abgemeldet',
      'left',
      'bottom',
      'snackbar-neutral'
    );
  }

  openDeleteDialog(row: any) {
    const dialogRef = this.dialog.open(MemberDeleteDialogComponent, {
      data: {
        member: row,
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openInputDialog(type: string, row?: string) {
    const dialogRef = this.dialog.open(MemberInputDialogComponent, {
      data: {
        member: row,
        type: type,
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
