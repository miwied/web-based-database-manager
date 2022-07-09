import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { SportsClubApiService } from 'src/app/services/sportsClub-api.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { IBasicFee } from 'src/app/models/basicFee';
import { ISport } from 'src/app/models/sport';
import { ITeam } from 'src/app/models/team';
import { IMember, IMemberCreate } from 'src/app/models/member';

@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent implements OnInit, OnDestroy {
  roleArray: string[] = ['Trainer', 'Spieler'];
  gendersArray: string[] = ['Männlich', 'Weiblich', 'Divers'];
  sports: ISport[];
  teams: ITeam[];
  basicFees: IBasicFee[];
  members: IMember[];
  filteredValues: Observable<IMember[]>;
  addMemberForm: FormGroup;
  addSportForm: FormGroup;
  addTeamForm: FormGroup;

  memberDataSubscription: Subscription;
  sportsDataSubscription: Subscription;
  basicFeeDataSubscription: Subscription;
  teamsDataSubscription: Subscription;

  constructor(
    private snackBarService: SnackBarService,
    private dataSharingService: DataSharingService,
    private apiService: SportsClubApiService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDialogComponent>
  ) {
    this.addMemberForm = this.fb.group({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(2),
        Validators.maxLength(28),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(2),
        Validators.maxLength(28),
      ]),
      gender: new FormControl(null, [Validators.required]),
      zipCode: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(4),
        Validators.maxLength(6),
      ]),
      city: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      feeGroup: new FormControl(null, [Validators.required]),
      sports: new FormControl(null),
      role: new FormControl(null),
      team: new FormControl(null),
    });
    this.addSportForm = this.fb.group({
      sport: new FormControl(null, [Validators.required]),
      fee: new FormControl(null, [Validators.required]),
      leader: new FormControl(null, [Validators.required]),
    });
    this.addTeamForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      sport: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.memberDataSubscription = this.dataSharingService
      .getMemberData()
      .subscribe({
        next: (members) => {
          this.members = members;
        },
      });
    this.sportsDataSubscription = this.dataSharingService
      .getSportsData()
      .subscribe({
        next: (teamData) => {
          this.sports = teamData;
        },
      });
    this.basicFeeDataSubscription = this.dataSharingService
      .getBasicFeeData()
      .subscribe({
        next: (basicFeeData) => {
          this.basicFees = basicFeeData;
        },
      });
    this.teamsDataSubscription = this.dataSharingService
      .getTeamsData()
      .subscribe({
        next: (teamsData) => {
          this.teams = teamsData;
        },
      });
    this.filteredValues = this.addSportForm.get('leader')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  ngOnDestroy(): void {
    this.memberDataSubscription.unsubscribe();
    this.sportsDataSubscription.unsubscribe();
    this.basicFeeDataSubscription.unsubscribe();
    this.teamsDataSubscription.unsubscribe();
  }

  display(member: IMember) {
    return member && member.firstName && member.lastName
      ? member.firstName + ' ' + member.lastName
      : '';
  }

  private _filter(value: string): IMember[] {
    const filterValue = value.toLowerCase();

    return this.members.filter((member) =>
      (member.firstName + ' ' + member.lastName)
        .toLowerCase()
        .includes(filterValue)
    );
  }

  private _closeDialog() {
    this.dialogRef.close();
  }

  submit(f: FormGroup, type: string) {
    switch (type) {
      case 'member':
        if (this.addMemberForm.valid) {
          let memberCreate = this.mapFormValuesToMemberCreate(f);
          this.apiService.createMember(memberCreate).subscribe({
            complete: () => {
              this.dataSharingService.loadMembers();
              this.snackBarService.showSnackBar(
                'Element hinzugefügt',
                'left',
                'bottom',
                'snackbar-success'
              );
              this._closeDialog();
            },
          });
        }
        break;
      case 'sport':
        if (this.addSportForm.valid) {
          let member = this.members.find(
            (member) =>
              member.firstName + ' ' + member.lastName === f.value['leader']
          );
          if (member) {
            let tmp = {
              abteilung: f.value['sport'],
              fee: f.value['fee'],
              leaderId: member.memberId,
            } as ISport;
            this.apiService.createSport(tmp).subscribe({
              complete: () => {
                this.dataSharingService.loadSportsData();
                this.snackBarService.showSnackBar(
                  'Element hinzugefügt',
                  'left',
                  'bottom',
                  'snackbar-success'
                );
                this._closeDialog();
              },
            });
          }
        }

        break;
      case 'team':
        if (this.addTeamForm.valid) {
          let sport = this.sports.find(
            (sp) => sp.abteilung === f.value['sport']
          );
          if (sport) {
            let tmp = {
              teamname: f.value['name'],
              sportsId: sport.sa_id,
            } as ITeam;
            this.apiService.createTeam(tmp).subscribe({
              complete: () => {
                this.dataSharingService.loadTeamsData();
                this.snackBarService.showSnackBar(
                  'Element hinzugefügt',
                  'left',
                  'bottom',
                  'snackbar-success'
                );
                this._closeDialog();
              },
            });
          }
        }
        break;
    }
  }

  mapFormValuesToMemberCreate(f: FormGroup): IMemberCreate {
    let memberCreate = {} as IMemberCreate;
    memberCreate.firstName = f.value['firstName'];
    memberCreate.lastName = f.value['lastName'];
    memberCreate.zipCode = f.value['zipCode'];
    memberCreate.city = f.value['city'];
    memberCreate.gender =
      f.value['gender'] === 'Weiblich'
        ? 'w'
        : f.value['gender'] === 'Männlich'
        ? 'm'
        : 'd';
    memberCreate.feeId = f.value['feeGroup'].gb_id;
    switch (f.value['role']) {
      case 'Trainer':
        memberCreate.isPlayer = false;
        memberCreate.isTrainer = true;
        memberCreate.trainerTeamId = f.value['team'].ma_id;
        break;
      case 'Spieler':
        memberCreate.isTrainer = false;
        memberCreate.isPlayer = true;
        memberCreate.playerTeamId = f.value['team'].ma_id;
        break;
    }
    memberCreate.sportIds = [];
    if (f.value['sports'])
      f.value['sports'].forEach((sport: any) => {
        memberCreate.sportIds.push({ sa_id: sport.sa_id });
      });
    return memberCreate;
  }
}
