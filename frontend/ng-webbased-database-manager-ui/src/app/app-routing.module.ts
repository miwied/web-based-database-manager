import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SportsclubtableComponent } from './Components/sportsclubtable/sportsclubtable.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const APP_ROUTES: Routes = [
  {
      // Standardroute: Umleitung auf '/home'
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
  },
  {
      path: 'login',
      component: LoginComponent
  },
  {
      path: 'table',
      component: SportsclubtableComponent
  }
];