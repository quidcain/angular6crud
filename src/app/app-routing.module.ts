import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { SamplesComponent } from './main/samples/samples.component';

const routes: Routes = [
  { path: '',  redirectTo: 'hello', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'sample',  component: SamplesComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
