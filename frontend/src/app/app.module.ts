import { APP_ROUTES } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { AddDialogComponent } from './Components/add-dialog/add-dialog.component';
import { MemberDeleteDialogComponent } from './Components/member-delete-dialog/member-delete-dialog.component';
import { LoginComponent } from './Components/login/login.component';
import { SportsClubTableComponent } from './Components/sports-club-table/sports-club-table.component';
import { MemberEditComponent } from './Components/member-edit/member-edit.component';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SportsClubTableComponent,
    MemberDeleteDialogComponent,
    AddDialogComponent,
    MemberEditComponent,
  ],
  imports: [
    RouterModule.forRoot(APP_ROUTES),
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatSortModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTabsModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
