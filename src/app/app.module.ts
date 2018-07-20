import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './main/login/login.component';
import { TokenStorage } from './main/token.storage';
import { LoginService } from './main/login.service';
import { FakeBackendProvider } from './main/fake-backend.interceptor';
import { JwtInterceptor } from './main/jwt.interceptor';
import { ErrorHandlerImpl } from './main/error.handler';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
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

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseSharedModule,
    FuseSidebarModule,
    // FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    SampleModule,
    AppRoutingModule
  ],
  providers: [
    TokenStorage,
    LoginService,
    FakeBackendProvider,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: ErrorHandler, useClass: ErrorHandlerImpl}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
