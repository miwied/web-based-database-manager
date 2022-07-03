import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SportsClubApiService } from 'src/app/services/sportsClub-api.service';
import { MatDialog } from '@angular/material/dialog';
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
    private router: Router
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
        this.dataService
          .userLogin(angForm.value.username, angForm.value.password)
          .pipe(first())
          .subscribe({
            next: (data) => {
              const redirect = this.dataService.redirectUrl
                ? this.dataService.redirectUrl
                : '/dashboard';
              this.router.navigate([redirect]);
            },
            error: () => alert('User name or password is incorrect'),
          });
        break;
      case 'Register':
        this.dataService
          .userRegistration(angForm.value.username, angForm.value.password)
          .subscribe({
            next: (value) => {},
            error: () => alert('Error occured'),
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
