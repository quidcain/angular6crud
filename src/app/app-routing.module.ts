import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { SamplesComponent } from './main/samples/samples.component';
import { AddSampleComponent } from './main/add-sample/add-sample.component';
import { ModifySampleComponent } from './main/modify-sample/modify-sample.component';

const routes: Routes = [
  { path: '',  redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'samples',  component: SamplesComponent },
  { path: 'samples/add',  component: AddSampleComponent },
  { path: 'samples/:id',  component: ModifySampleComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
