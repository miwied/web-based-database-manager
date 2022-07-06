import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IMember } from 'src/app/models/member';

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
export class MemberAddDialogComponent implements OnInit {
  gendersArray: string[] = ['Männlich', 'Weiblich', 'Divers'];
  sportsArray: string[] = ['Fußball', 'Handball', 'Strippen'];

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

  selectFormControl = new FormControl([Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor() {}

  ngOnInit(): void {}

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
