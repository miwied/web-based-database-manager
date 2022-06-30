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

import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SportsclubtableComponent
  ],
  imports: [
    RouterModule.forRoot(APP_ROUTES),
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
