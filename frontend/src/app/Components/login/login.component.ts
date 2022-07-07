import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SportsClubApiService } from 'src/app/services/sportsClub-api.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  selection: string = 'Login';
  angForm: FormGroup;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private dataService: SportsClubApiService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.angForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(1), Validators.email],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  postdata(angForm: FormGroup) {
    switch (this.selection) {
      case 'Login':
        console.log(angForm.value.username);
        console.log(angForm.value.password);
        this.dataService
          .userLogin(angForm.value.username, angForm.value.password)
          .subscribe({
            next: (data) => {
              console.log(data);
              const redirect = this.dataService.redirectUrl
                ? this.dataService.redirectUrl
                : '/table';
              this.router.navigate([redirect]);
            },
            error: (e) => {
              console.log(e);
              this.snackBarService.showSnackBar(
                'Nutzername oder Passwort ungültig',
                'start',
                'bottom',
                'snackbar-error'
              );
            },
          });
        break;
      case 'Register':
        this.dataService
          .userRegistration(angForm.value.username, angForm.value.password)
          .subscribe({
            next: (value) =>
              this.snackBarService.showSnackBar(
                'Nutzer angelegt',
                'start',
                'bottom',
                'snackbar-success'
              ),
            error: (error) =>
              error.status == 409
                ? this.snackBarService.showSnackBar(
                    'Nutzer ist bereits angelegt',
                    'start',
                    'bottom',
                    'snackbar-error'
                  )
                : console.log(error),
          });
        break;
      default:
        break;
    }
  }
  getEmail() {
    return this.angForm.get('username');
  }
  getPassword() {
    return this.angForm.get('password');
  }
}
