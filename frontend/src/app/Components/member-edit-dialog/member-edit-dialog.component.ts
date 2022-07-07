import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-member-edit-dialog',
  templateUrl: './member-edit-dialog.component.html',
  styleUrls: ['./member-edit-dialog.component.css']
})
export class MemberEditDialogComponent implements OnInit {

  nameFormControl = new FormControl('', [Validators.required]);
  surnameFormControl = new FormControl('', [Validators.required]);
  plzFormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);
  placeFormControl = new FormControl('', [Validators.required]);

  gender = new FormControl([Validators.required]);
  sports = new FormControl([Validators.required]);

  selectFormControl = new FormControl([Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }


  Edit()
  {
    if(this.nameFormControl.valid && this.surnameFormControl.valid && this.plzFormControl.valid && this.placeFormControl.valid && this.gender.valid && this.sports.valid)
    {
      
    }
  }
}
