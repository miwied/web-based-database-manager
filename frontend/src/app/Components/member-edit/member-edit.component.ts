import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
export class MemberEditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() member: IMember | null = {
    memberId: 0,
    firstName: '',
    lastName: '',
    zipCode: 0,
    city: '',
    gender: '',
    feeId: 0,
    feeGroup: '',
    fee: 0,
    sportIds: {},
    sports: {},
    isPlayer: false,
    playerTeamId: 0,
    playerTeamName: {},
    isTrainer: false,
    trainerTeamId: 0,
    trainerTeamName: {},
  };
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
        Validators.minLength(3),
        Validators.maxLength(28),
      ]),
      lastName: new FormControl(null, [
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(3),
        Validators.maxLength(28),
      ]),
      zipCode: new FormControl(null, [
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      city: new FormControl(null, [
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      gender: new FormControl(null),
      feeGroup: new FormControl(null),
      sports: new FormControl(null),
      role: new FormControl(null),
      team: new FormControl(null),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.member) {
      this.sportsDataSubscription =
        this.dataSharingService.sportsData$.subscribe({
          next: (sports) => {
            if (sports.length > 0) {
              this.sports = sports;
            }
          },
        });
      this.basicFeeDataSubscription =
        this.dataSharingService.basicFeeData$.subscribe({
          next: (basicFees) => {
            if (basicFees.length > 0) {
              this.basicFees = basicFees;
            }
          },
        });
      this.teamsDataSubscription = this.dataSharingService.teamsData$.subscribe(
        {
          next: (teams) => {
            if (teams.length > 0) {
              this.teams = teams;
            }
          },
        }
      );
      this.member['sports'].forEach((element: any) => {
        let sel = this.sports.find(
          (sport) => sport.abteilung === element[0].abteilung
        );
        if (sel) this.memberSports.push(sel);
      });
      this.editForm.get('sports')?.setValue(this.memberSports);
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sportsDataSubscription.unsubscribe();
    this.basicFeeDataSubscription.unsubscribe();
    this.teamsDataSubscription.unsubscribe();
    this.member = {} as IMember;
  }

  formatSports(): string {
    let res = '';
    if (this.member) {
      let sportsArray = this.member['sports'];
      let counter = 0;
      sportsArray.forEach((sportArray: any) => {
        sportArray.forEach((sport: any) => {
          if (counter == sportsArray.length - 1) res += sport.abteilung;
          else res += sport.abteilung + ', ';
          counter++;
        });
      });
    }
    return res;
  }

  delete() {
    const dialogRef = this.dialog.open(MemberDeleteDialogComponent, {
      data: {
        member: this.member,
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  submit(f: FormGroup) {
    if (this.member && this.editForm.valid) {
      let oldPlayerTeamId = this.member['playerTeamId'];
      let oldTrainerTeamId = this.member['trainerTeamId'];
      let oldSportIds = this.member['sportIds'];
      this.mapFormValuesToMember(f, this.member);
      let memberEdit = this.mapToMemberEdit(
        this.member,
        oldSportIds,
        oldPlayerTeamId,
        oldTrainerTeamId
      );
      this.apiService.putMember(memberEdit).subscribe({
        next: () => {},
      });
    }
    // this.editForm.controls['firstName'].setErrors(['test']);
  }

  mapFormValuesToMember(f: FormGroup, member: IMember): void {
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

    member['firstName'] = f.value['firstName']
      ? f.value['firstName']
      : member['firstName'];
    member['lastName'] = f.value['lastName']
      ? f.value['lastName']
      : member['lastName'];
    member['zipCode'] = f.value['zipCode']
      ? f.value['zipCode']
      : member['zipCode'];
    member['city'] = f.value['city'] ? f.value['city'] : member['city'];
    member['gender'] = f.value['gender']
      ? f.value['gender'] === 'Weiblich'
        ? 'w'
        : f.value['gender'] === 'Männlich'
        ? 'm'
        : 'd'
      : member['gender'];
    member['feeId'] = f.value['feeGroup']
      ? f.value['feeGroup']['gb_id']
      : member['feeId'];
    member['feeGroup'] = f.value['feeGroup']
      ? f.value['feeGroup']['personengruppe']
      : member['feeGroup'];
    member['sportIds'] = sportIds;
    member['sports'] = sports;

    if (f.value['role'] == 'Trainer') {
      member['isPlayer'] = false;
      member['isTrainer'] = true;
      member['trainerTeamId'] = f.value['team']['ma_id'];
      member['trainerTeamName'] = [
        {
          teamname: f.value['team']['teamname'],
        },
      ];
      member['playerTeamId'] = 0;
      member['playerTeamName'] = null;
    } else if (f.value['role'] == 'Spieler') {
      member['isTrainer'] = false;
      member['isPlayer'] = true;
      member['playerTeamId'] = f.value['team']['ma_id'];
      member['playerTeamName'] = [
        {
          teamname: f.value['team']['teamname'],
        },
      ];
      member['trainerTeamId'] = 0;
      member['trainerTeamName'] = null;
    } else if (f.value['role'] == 'Keine Rolle') {
      member['isPlayer'] = false;
      member['isTrainer'] = false;
      member['playerTeamId'] = 0;
      member['playerTeamName'] = null;
      member['trainerTeamId'] = 0;
      member['trainerTeamName'] = null;
    } else {
      if (member['isPlayer']) {
        if (f.value['team']) {
          member['playerTeamId'] = f.value['team']['ma_id'];
          member['playerTeamName'] = [
            {
              teamname: f.value['team']['teamname'],
            },
          ];
        }
      } else if (member['isTrainer'])
        if (f.value['team']) {
          member['trainerTeamId'] = f.value['team']['ma_id'];
          member['trainerTeamName'] = [
            {
              teamname: f.value['team']['teamname'],
            },
          ];
        }
    }
  }

  mapToMemberEdit(
    input: IMember,
    oldSportIds: any,
    oldPlayerTeamId: number,
    oldTrainerTeamId: number
  ): IMemberEdit {
    let member = {} as IMemberEdit;

    member['memberId'] = input['memberId'];
    member['firstName'] = input['firstName'];
    member['lastName'] = input['lastName'];
    member['zipCode'] = input['zipCode'];
    member['city'] = input['city'];
    member['gender'] = input['gender'];
    member['feeId'] = input['feeId'];
    member['oldSportIds'] = oldSportIds;
    member['sportIds'] = input['sportIds'];
    member['isPlayer'] = input['isPlayer'];
    member['oldPlayerTeamId'] = oldPlayerTeamId;
    member['newPlayerTeamId'] = input['playerTeamId'];
    member['isTrainer'] = input['isTrainer'];
    member['oldTrainerTeamId'] = oldTrainerTeamId;
    member['newTrainerTeamId'] = input['trainerTeamId'];

    return member;
  }
}
