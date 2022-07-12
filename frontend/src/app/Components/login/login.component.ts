import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SportsClubApiService } from 'src/app/services/sportsClub-api.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  selection: string = 'Login';
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dataService: SportsClubApiService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.loginForm = this.fb.group({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit() {}

  postdata(loginForm: FormGroup) {
    if (loginForm.valid) {
      switch (this.selection) {
        case 'Login':
          this.dataService
            .userLogin(loginForm.value.username, loginForm.value.password)
            .subscribe({
              next: (data) => {
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
            .userRegistration(
              loginForm.value.username,
              loginForm.value.password
            )
            .subscribe({
              next: (value) =>
                this.snackBarService.showSnackBar(
                  'Nutzer angelegt',
                  'start',
                  'bottom',
                  'snackbar-success'
                ),
              error: (e) =>
                e.status == 409
                  ? this.snackBarService.showSnackBar(
                      'Nutzer ist bereits angelegt',
                      'start',
                      'bottom',
                      'snackbar-error'
                    )
                  : console.log(e),
            });
          break;
        default:
          break;
      }
    }
  }
}
