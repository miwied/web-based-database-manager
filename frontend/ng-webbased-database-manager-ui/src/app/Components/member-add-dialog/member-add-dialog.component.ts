import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-member-add-dialog',
  templateUrl: './member-add-dialog.component.html',
  styleUrls: ['./member-add-dialog.component.css'],
})
export class MemberAddDialogComponent implements OnInit {
  constructor() {}

  genders: string[] = ['Männlich', 'Weiblich', 'Divers'];
  sports: string[] = ['Fußball', 'Handball', 'Strippen'];

  ngOnInit(): void {}

  addMember() {
    if (
      !this.editNameMemberFormControl.valid ||
      !this.editSurnameMemberFormControl.valid ||
      !this.editZipcodeMemberFormControl.valid ||
      !this.editLocationMemberFormControl.valid ||
      !this.editGenderMemberFormControl.valid ||
      !this.editSportMemberFormControl.valid
    ) {
      console.log('Bitte fülle alle Felder aus.');
    } else {
      console.log('Member hinzugefügt.');
    }
  }

  editNameMemberFormControl = new FormControl('', [
    Validators.required,

  ]);
  editSurnameMemberFormControl = new FormControl('', [Validators.required]);
  editZipcodeMemberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
  ]);
  editLocationMemberFormControl = new FormControl('', [Validators.required]);
  editGenderMemberFormControl = new FormControl('', [Validators.required]);
  editSportMemberFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
}
