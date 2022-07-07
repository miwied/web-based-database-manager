import {
  Component,
  OnInit,
  AfterContentInit,
  OnChanges,
  SimpleChanges,
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
  selector: 'app-member-add-dialog',
  templateUrl: './member-add-dialog.component.html',
  styleUrls: ['./member-add-dialog.component.css'],
})
export class MemberAddDialogComponent implements OnInit, AfterContentInit {

  
  gendersArray: string[] = ['Männlich', 'Weiblich', 'Divers'];
  sports: ISport[];
  teams: ITeam[];
  basicFees: IBasicFee[];

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z]+$'),
    Validators.minLength(2),
    Validators.maxLength(28), // Google sagt max 28
  ]);
  surnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z]+$'),
    Validators.minLength(2),
    Validators.maxLength(28),
  ]);
  plzFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.minLength(4),
    Validators.maxLength(6),
  ]);

  placeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z]+$'),
    Validators.minLength(2),
    Validators.maxLength(30),
  ]);
  gender = new FormControl(null, Validators.required);
  basicFee = new FormControl(null, Validators.required);
  sport = new FormControl(null, Validators.required);
  team = new FormControl(null, Validators.required);
  selectFormControl = new FormControl([Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.dataSharingService.loadSportsData();
    this.dataSharingService.loadBasicFeeData();
    this.dataSharingService.loadTeamsData();
  }

  ngAfterContentInit(): void {
    this.dataSharingService.getSportsData().subscribe({
      next: (teamData) => {
        console.log(teamData);
        this.sports = teamData;
      },
    });
    this.dataSharingService.getBasicFeeData().subscribe({
      next: (basicFeeData) => {
        console.log(basicFeeData);
        this.basicFees = basicFeeData;
      },
    });

    this.dataSharingService.getTeamsData().subscribe({
      next: (teamsData) => {
        console.log(teamsData);
        this.teams = teamsData;
      },
    });
  }
  addMember() {
    if (
      !this.nameFormControl.valid ||
      !this.surnameFormControl.valid ||
      !this.plzFormControl.valid ||
      !this.placeFormControl.valid ||
      !this.gender.valid ||
      !this.selectFormControl.valid
    ) {
      //   let member: IMember = {
      //     firstName: this.nameFormControl.value,
      //     lastName: this.surnameFormControl.value,
      //     zipCode: this.plzFormControl.value,
      //     city: this.placeFormControl.value,

      //  }
      console.log('Bitte fülle alle Felder aus.');
    } else {
      console.log('Member angelegt');
    }
  }
}
