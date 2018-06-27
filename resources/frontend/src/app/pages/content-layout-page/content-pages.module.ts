import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContentLayoutPageComponent } from './content-layout-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        NgbModule
    ],
    declarations: [
        ContentLayoutPageComponent,
        HomeComponent,
        LoginComponent,
        SignupComponent
    ]
})
export class ContentPagesModule { }
