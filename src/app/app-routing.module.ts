import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './main/login/login.component';

const routes: Routes = [
    { path: '',  redirectTo: 'sample', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
