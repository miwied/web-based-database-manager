import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MemberEditDialogComponent } from '../member-edit-dialog/member-edit-dialog.component';
import { MemberDeleteDialogComponent } from '../member-delete-dialog/member-delete-dialog.component';
import { MemberAddDialogComponent } from '../member-add-dialog/member-add-dialog.component';
import { SportsClubApiService } from 'src/app/services/sportsClub-api.service';
import { IMember } from 'src/app/models/member';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-sportsclubtable',
  templateUrl: './sportsclubtable.component.html',
  styleUrls: ['./sportsclubtable.component.css'],
})
export class SportsclubtableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'memberId',
    'firstName',
    'lastName',
    'action_btn',
  ];
  dataSource: MatTableDataSource<IMember> = new MatTableDataSource();

  value = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private sportClubService: SportsClubApiService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sportClubService.getMembers().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Logout() {
    this.router.navigate([`login`]);
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(MemberEditDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(MemberDeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(MemberAddDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
