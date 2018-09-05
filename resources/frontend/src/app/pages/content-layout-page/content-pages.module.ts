import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContentLayoutPageComponent } from './content-layout-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PbrsolutionComponent } from './pbrsolution/pbrsolution.component';
import { RequestAccessComponent } from './request-access/request-access.component';
import { RequestAccessFormComponent } from './request-access-form/request-access-form.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';

@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        UiSwitchModule.forRoot({
            size: 'small',
            checkedLabel: 'on',
            uncheckedLabel: 'off'
        })
    ],
    declarations: [
        ContentLayoutPageComponent,
        HomeComponent,
        LoginComponent,
        SignupComponent,
        PbrsolutionComponent,
        RequestAccessComponent,
        RequestAccessFormComponent,
        PrivacyComponent,
        TermsOfUseComponent
    ]
})
export class ContentPagesModule { }
