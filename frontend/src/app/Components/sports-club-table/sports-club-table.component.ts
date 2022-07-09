import {
  AfterViewInit,
  AfterContentInit,
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MemberDeleteDialogComponent } from '../member-delete-dialog/member-delete-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SportsClubApiService } from 'src/app/services/sportsClub-api.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { IMember } from 'src/app/models/member';
import { IFilter } from 'src/app/models/filter';
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-sports-club-table',
  templateUrl: './sports-club-table.component.html',
  styleUrls: ['./sports-club-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('300ms ease')),
    ]),
  ],
})
export class SportsClubTableComponent
  implements AfterViewInit, AfterContentInit, OnInit, OnDestroy
{
  filterHovered: boolean = false;
  filterValue = {} as IFilter;
  test: boolean = false;
  expandedElement: IMember | null;
  displayedColumns: string[] = [
    'memberId',
    'firstName',
    'lastName',
    'gender',
    'feeGroup',
    'zipCode',
    'city',
    'isPlayer',
    'playerTeamName',
    'isTrainer',
    'trainerTeamName',
    'sports',
    'fee',
  ];
  dataSource: MatTableDataSource<IMember> = new MatTableDataSource();
  tokenUserName: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  memberSubscription: Subscription;
  filterSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private apiService: SportsClubApiService,
    private dataSharingService: DataSharingService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.apiService.setHttpOptions();
    this.dataSharingService.loadMembers();
    this.dataSharingService.loadSportsData();
    this.dataSharingService.loadBasicFeeData();
    this.dataSharingService.loadTeamsData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.memberSubscription = this.dataSharingService
      .getMemberData()
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
      });
    this.filterSubscription = this.dataSharingService.getFilter().subscribe({
      next: (filter) => {
        if (filter.filterName === '') this.filterHovered = false;
        this.filterValue = filter;
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

  ngOnDestroy(): void {
    this.memberSubscription.unsubscribe();
  }

  mapColumnName(input: string) {
    let res = '';

    switch (input) {
      case 'memberId':
        res = 'Id';
        break;
      case 'firstName':
        res = 'Vorname';
        break;
      case 'lastName':
        res = 'Nachname';
        break;
      case 'gender':
        res = 'Geschlecht';
        break;
      case 'feeGroup':
        res = 'Beitragsgruppe';
        break;
      case 'zipCode':
        res = 'Plz';
        break;
      case 'city':
        res = 'Ort';
        break;
      case 'isPlayer':
        res = 'Spieler';
        break;
      case 'playerTeamName':
        res = 'Spielt in';
        break;
      case 'isTrainer':
        res = 'Trainer';
        break;
      case 'trainerTeamName':
        res = 'Trainiert';
        break;
      case 'sports':
        res = 'Sportarten';
        break;
      case 'fee':
        res = 'Beitrag';
        break;
      case 'actions':
        res = '';
        break;
      default:
        res = '';
        break;
    }

    return res;
  }

  mapInformation(input: any) {
    let res = '';
    let counter = 0;
    if (Array.isArray(input)) {
      input.forEach((element) => {
        if (element.teamname) {
          res += element.teamname;
        } else if (Array.isArray(element)) {
          element.forEach((ele) => {
            if (counter == input.length - 1) res += ele.abteilung;
            else res += ele.abteilung + ', ';
            counter++;
          });
        }
      });
    } else if (input === 'w' || input === 'm' || input === 'd') {
      switch (input) {
        case 'w':
          res += 'Weiblich';
          break;
        case 'm':
          res += 'Männlich';
          break;
        case 'd':
          res += 'Divers';
          break;
        default:
          break;
      }
    } else if (input == null) {
      res += 'keine';
    } else if (input === false || input === true) {
      res += input ? 'Ja' : 'Nein';
    } else {
      res += input;
    }
    return res;
  }

  applyFilter(value: any, column: string) {
    this.dataSharingService.applyFilter(
      value,
      column,
      this.mapColumnName(column)
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setExpandedElement(element: any) {
    if (!this.filterHovered)
      this.expandedElement = this.expandedElement === element ? null : element;
    else this.filterHovered = false;
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
    this.dialog.open(MemberDeleteDialogComponent, {
      data: {
        member: row,
      },
      autoFocus: false,
    });
  }

  openAddDialog() {
    this.dialog.open(AddDialogComponent, {
      autoFocus: false,
    });
  }
}
