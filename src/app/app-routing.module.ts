import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { SamplesComponent } from './main/samples/samples.component';
import { AddSampleComponent } from './main/add-sample/add-sample.component';
import { ModifySampleComponent } from './main/modify-sample/modify-sample.component';
import { LogoutComponent } from './main/logout/logout.component';
import { AuthGuard } from './main/auth.guard';

const routes: Routes = [
  { path: '',  redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'logout',  component: LogoutComponent },
  { path: 'samples',  component: SamplesComponent, canActivate: [AuthGuard] },
  { path: 'samples/add',  component: AddSampleComponent, canActivate: [AuthGuard] },
  { path: 'samples/:id',  component: ModifySampleComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
