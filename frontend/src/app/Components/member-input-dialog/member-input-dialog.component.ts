import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import {
  Component,
  OnInit,
  AfterContentInit,
  OnChanges,
  SimpleChanges,
  Inject,
  OnDestroy,
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IBasicFee } from 'src/app/models/basicFees';
import { IMember } from 'src/app/models/member';
import { ISport } from 'src/app/models/sport';
import { ITeam } from 'src/app/models/team';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-member-input-dialog',
  templateUrl: './member-input-dialog.component.html',
  styleUrls: ['./member-input-dialog.component.css'],
})
export class MemberInputDialogComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  gendersArray: string[] = ['Männlich', 'Weiblich', 'Divers'];
  sports: ISport[];
  teams: ITeam[];
  basicFees: IBasicFee[];
  checked = false;
  playerChecked: boolean = false;
  trainerChecked: boolean = false;
  sliderValue: string = 'Nichts';
  disableTeamSelect: boolean = true;
  member: IMember = {} as IMember;
  submitType: string;

  firstNameFormControl = new FormControl(null, [
    Validators.pattern('^[a-zA-Z]+$'),
    Validators.minLength(2),
    Validators.maxLength(28), // Google sagt max 28
  ]);
  lastNameFormControl = new FormControl(null, [
    Validators.pattern('^[a-zA-Z]+$'),
    Validators.minLength(2),
    Validators.maxLength(28),
  ]);
  zipCodeFormControl = new FormControl(null, [
    Validators.pattern('^[0-9]*$'),
    Validators.minLength(4),
    Validators.maxLength(6),
  ]);

  cityFormControl = new FormControl(null, [
    Validators.pattern('^[a-zA-Z]+$'),
    Validators.minLength(2),
    Validators.maxLength(30),
  ]);
  genderFormControl = new FormControl(null);
  basicFeeFormControl = new FormControl(null);
  teamFormControl = new FormControl();

  sportFormControl = new FormControl();

  matcherFormControl = new MyErrorStateMatcher();

  sportsDataSubscription: Subscription;

  constructor(
    private dataSharingService: DataSharingService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.dataSharingService.loadSportsData();
    this.dataSharingService.loadBasicFeeData();
    this.dataSharingService.loadTeamsData();
    this.member = this.data.member;
    console.log(this.member);
  }

  ngAfterContentInit(): void {
    this.sportsDataSubscription = this.dataSharingService
      .getSportsData()
      .subscribe({
        next: (teamData) => {
          this.sports = teamData;
        },
      });
    this.dataSharingService.getBasicFeeData().subscribe({
      next: (basicFeeData) => {
        this.basicFees = basicFeeData;
      },
    });
    this.dataSharingService.getTeamsData().subscribe({
      next: (teamsData) => {
        this.teams = teamsData;
      },
    });
  }

  ngOnDestroy(): void {
    this.sportsDataSubscription.unsubscribe();
  }

  toggleSlider(event: any) {
    if (event.value == 1) {
      this.disableTeamSelect = true;
      this.sliderValue = 'Nichts';
    }
    if (event.value == 2) {
      this.disableTeamSelect = false;
      this.sliderValue = 'Spieler';
    }
    if (event.value == 3) {
      this.disableTeamSelect = false;
      this.sliderValue = 'Trainer';
    }
  }

  submit(f: NgForm) {
    console.log(f.value);
    if (true) {
      console.log('Bitte fülle alle Felder aus.');
    }
  }
}
