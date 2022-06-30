import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SportsclubtableComponent } from './Components/sportsclubtable/sportsclubtable.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MemberEditDialogComponent } from './Components/member-edit-dialog/member-edit-dialog.component';

 import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MemberDeleteDialogComponent } from './Components/member-delete-dialog/member-delete-dialog.component';
import { MemberAddDialogComponent } from './Components/member-add-dialog/member-add-dialog.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SportsclubtableComponent,
    MemberEditDialogComponent,
    MemberDeleteDialogComponent,
    MemberAddDialogComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
