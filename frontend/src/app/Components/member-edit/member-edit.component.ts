import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MemberDeleteDialogComponent } from '../member-delete-dialog/member-delete-dialog.component';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { SportsClubApiService } from 'src/app/services/sportsClub-api.service';
import { IBasicFee } from 'src/app/models/basicFee';
import { IMember, IMemberEdit } from 'src/app/models/member';
import { ISport } from 'src/app/models/sport';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit, OnDestroy {
  @Input() member: IMember = {} as IMember;
  roleArray: string[] = ['Trainer', 'Spieler'];
  gendersArray: string[] = ['Männlich', 'Weiblich', 'Divers'];
  memberSports: ISport[] = [];
  sports: ISport[];
  teams: any;
  basicFees: IBasicFee[];
  editForm: FormGroup;

  sportsDataSubscription: Subscription;
  basicFeeDataSubscription: Subscription;
  teamsDataSubscription: Subscription;

  constructor(
    private dataSharingService: DataSharingService,
    private apiService: SportsClubApiService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      firstName: new FormControl(null, [
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(2),
        Validators.maxLength(28),
      ]),
      lastName: new FormControl(null, [
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(2),
        Validators.maxLength(28),
      ]),
      zipCode: new FormControl(null, [
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(4),
        Validators.maxLength(6),
      ]),
      city: new FormControl(null, [
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      gender: new FormControl(null),
      feeGroup: new FormControl(null),
      sports: new FormControl(null),
      role: new FormControl(null),
      team: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.sportsDataSubscription = this.dataSharingService.sportsData$.subscribe(
      {
        next: (sports) => {
          if (sports.length > 0) {
            this.sports = sports;
          }
        },
      }
    );
    this.basicFeeDataSubscription =
      this.dataSharingService.basicFeeData$.subscribe({
        next: (basicFees) => {
          if (basicFees.length > 0) {
            this.basicFees = basicFees;
          }
        },
      });
    this.teamsDataSubscription = this.dataSharingService.teamsData$.subscribe({
      next: (teams) => {
        if (teams.length > 0) {
          this.teams = teams;
        }
      },
    });
    this.member.sports.forEach((element: any) => {
      let sel = this.sports.find(
        (sport) => sport.abteilung === element[0].abteilung
      );
      if (sel) this.memberSports.push(sel);
    });
    this.editForm.get('sports')?.setValue(this.memberSports);
  }

  ngOnDestroy(): void {
    this.sportsDataSubscription.unsubscribe();
    this.basicFeeDataSubscription.unsubscribe();
    this.teamsDataSubscription.unsubscribe();
    this.member = {} as IMember;
  }

  formatSports(): string {
    let res = '';
    let sportsArray = this.member.sports;
    let counter = 0;
    sportsArray.forEach((sportArray: any) => {
      sportArray.forEach((sport: any) => {
        if (counter == sportsArray.length - 1) res += sport.abteilung;
        else res += sport.abteilung + ', ';
        counter++;
      });
    });
    return res;
  }

  delete() {
    const dialogRef = this.dialog.open(MemberDeleteDialogComponent, {
      data: {
        member: this.member,
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  submit(f: FormGroup) {
    let oldPlayerTeamId = this.member.playerTeamId;
    let oldTrainerTeamId = this.member.trainerTeamId;
    let oldSportIds = this.member.sportIds;
    this.mapFormValuesToMember(f);
    let memberEdit = this.mapToMemberEdit(
      oldSportIds,
      oldPlayerTeamId,
      oldTrainerTeamId
    );
    this.apiService.putMember(memberEdit).subscribe({
      next: () => {},
    });
    //this.editForm.controls['firstName'].setErrors(['test']);
  }

  mapFormValuesToMember(f: FormGroup): void {
    let sportIds: {}[] = [];
    let sports: any = [];
    if (f.value['sports']) {
      f.value['sports'].forEach((sport: any) => {
        sportIds.push({ sa_id: sport['sa_id'] });
        let tmp: ISport[] = new Array();
        tmp.push(sport);
        sports.push(tmp);
      });
    }

    this.member.firstName = f.value['firstName']
      ? f.value['firstName']
      : this.member.firstName;
    this.member.lastName = f.value['lastName']
      ? f.value['lastName']
      : this.member.lastName;
    this.member.zipCode = f.value['zipCode']
      ? f.value['zipCode']
      : this.member.zipCode;
    this.member.city = f.value['city'] ? f.value['city'] : this.member.city;
    this.member.gender = f.value['gender']
      ? f.value['gender'] === 'Weiblich'
        ? 'w'
        : f.value['gender'] === 'Männlich'
        ? 'm'
        : 'd'
      : this.member.gender;
    this.member.feeId = f.value['feeGroup']
      ? f.value['feeGroup']['gb_id']
      : this.member.feeId;
    this.member.feeGroup = f.value['feeGroup']
      ? f.value['feeGroup']['personengruppe']
      : this.member.feeGroup;
    this.member.sportIds =
      sportIds.length > 0 ? sportIds : this.member.sportIds;
    this.member.sports = sports.length > 0 ? sports : this.member.sports;

    if (f.value['role'] == 'Trainer') {
      this.member.isPlayer = false;
      this.member.isTrainer = true;
      this.member.trainerTeamId = f.value['team']['ma_id'];
      this.member.trainerTeamName = [
        {
          teamname: f.value['team']['teamname'],
        },
      ];
      this.member.playerTeamId = 0;
      this.member.playerTeamName = null;
    } else if (f.value['role'] == 'Spieler') {
      this.member.isTrainer = false;
      this.member.isPlayer = true;
      this.member.playerTeamId = f.value['team']['ma_id'];
      this.member.playerTeamName = [
        {
          teamname: f.value['team']['teamname'],
        },
      ];
      this.member.trainerTeamId = 0;
      this.member.trainerTeamName = null;
    } else if (f.value['role'] == 'Keine Rolle') {
      this.member.isPlayer = false;
      this.member.isTrainer = false;
      this.member.playerTeamId = 0;
      this.member.playerTeamName = null;
      this.member.trainerTeamId = 0;
      this.member.trainerTeamName = null;
    }
  }

  mapToMemberEdit(
    oldSportIds: any,
    oldPlayerTeamId: number,
    oldTrainerTeamId: number
  ): IMemberEdit {
    let member = {} as IMemberEdit;

    member.memberId = this.member.memberId;
    member.firstName = this.member.firstName;
    member.lastName = this.member.lastName;
    member.zipCode = this.member.zipCode;
    member.city = this.member.city;
    member.gender = this.member.gender;
    member.feeId = this.member.feeId;
    member.oldSportIds = oldSportIds;
    member.sportIds = this.member.sportIds;
    member.isPlayer = this.member.isPlayer;
    member.oldPlayerTeamId = oldPlayerTeamId;
    member.newPlayerTeamId = this.member.playerTeamId;
    member.isTrainer = this.member.isTrainer;
    member.oldTrainerTeamId = oldTrainerTeamId;
    member.newTrainerTeamId = this.member.trainerTeamId;

    return member;
  }
}
