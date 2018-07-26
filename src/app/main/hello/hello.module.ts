import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { HelloComponent } from './hello.component';

const routes = [
  { path: 'hello', component: HelloComponent }
];

@NgModule({
    declarations: [
        HelloComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        HelloComponent
    ]
})
export class HelloModule { }
