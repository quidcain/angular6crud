import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  MatButtonModule,
  MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './main/login/login.component';
import { TokenStorage } from './main/token.storage';
import { LoginService } from './main/login.service';
import { JwtInterceptor } from './main/jwt.interceptor';
import { ErrorHandlerImpl } from './main/error.handler';
import { SamplesComponent } from './main/samples/samples.component';
import { SampleService } from './main/sample.service';
import { AddSampleComponent } from './main/add-sample/add-sample.component';
import { FormsModule } from '@angular/forms';
import { ModifySampleComponent } from './main/modify-sample/modify-sample.component';
import { ModifySampleDialogComponent } from './main/modify-sample-dialog/modify-sample-dialog.component';
import { CancellationDialogComponent } from './main/cancellation-dialog/cancellation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SamplesComponent,
    AddSampleComponent,
    ModifySampleComponent,
    ModifySampleDialogComponent,
    CancellationDialogComponent
  ],
  entryComponents: [
    ModifySampleDialogComponent,
    CancellationDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    TranslateModule.forRoot(),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseSharedModule,
    FuseSidebarModule,
    // FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    AppRoutingModule
  ],
  providers: [
    TokenStorage,
    LoginService,
    SampleService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: ErrorHandler, useClass: ErrorHandlerImpl}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
