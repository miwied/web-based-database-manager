import { Component, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IMember } from 'src/app/models/member';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selector: 'app-member-edit-dialog',
  templateUrl: './member-edit-dialog.component.html',
  styleUrls: ['./member-edit-dialog.component.css'],
})
export class MemberEditDialogComponent implements OnInit {
  member: IMember = {} as IMember;
  nameFormControl = new FormControl('', [Validators.required]);
  surnameFormControl = new FormControl('', [Validators.required]);
  plzFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
  ]);
  placeFormControl = new FormControl('', [Validators.required]);

  gender = new FormControl([Validators.required]);
  sports = new FormControl([Validators.required]);

  selectFormControl = new FormControl([Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit(): void {
    this.member = this.data.member;
    console.log(this.data.member);
  }

  Edit() {
    if (
      this.nameFormControl.valid &&
      this.surnameFormControl.valid &&
      this.plzFormControl.valid &&
      this.placeFormControl.valid &&
      this.gender.valid &&
      this.sports.valid
    ) {
    }
  }
}
