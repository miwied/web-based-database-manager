import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { SportsClubApiService } from 'src/app/services/sportsClub-api.service';
import { IBasicFee } from 'src/app/models/basicFee';
import { ISport } from 'src/app/models/sport';
import { ITeam } from 'src/app/models/team';
import { IMemberCreate } from 'src/app/models/member';

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
  addMemberForm: FormGroup;
  addSportForm: FormGroup;

  sportsDataSubscription: Subscription;
  basicFeeDataSubscription: Subscription;
  teamsDataSubscription: Subscription;

  constructor(
    private dataSharingService: DataSharingService,
    private apiService: SportsClubApiService,
    private fb: FormBuilder
  ) {
    this.addMemberForm = this.fb.group({
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
      gender: new FormControl(null),
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
      feeGroup: new FormControl(null),
      sports: new FormControl(null),
      role: new FormControl(null),
      team: new FormControl(null),
    });
    this.addSportForm = this.fb.group({
      sport: new FormControl(null),
      fee: new FormControl(null),
      leaderId: new FormControl(null),
    });
  }

  ngOnInit(): void {
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
  }

  ngOnDestroy(): void {
    this.sportsDataSubscription.unsubscribe();
    this.basicFeeDataSubscription.unsubscribe();
    this.teamsDataSubscription.unsubscribe();
  }

  submit(f: FormGroup, type: string) {
    switch (type) {
      case 'member':
        let memberCreate = this.mapFormValuesToMemberCreate(f);
        this.apiService.createMember(memberCreate).subscribe({
          next: () => {},
          complete: () => {
            this.dataSharingService.loadMembers();
          },
        });
        break;
      case 'sport':
        break;
      case 'team':
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
    f.value['sports'].forEach((sport: any) => {
      memberCreate.sportIds.push({ sa_id: sport.sa_id });
    });
    return memberCreate;
  }
}
