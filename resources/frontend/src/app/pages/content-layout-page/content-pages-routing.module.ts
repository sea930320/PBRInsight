import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLayoutPageComponent } from './content-layout-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PbrsolutionComponent } from './pbrsolution/pbrsolution.component';
import { RequestAccessComponent } from './request-access/request-access.component';
import { RequestAccessFormComponent } from './request-access-form/request-access-form.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';

const routes: Routes = [
  {
    path: 'content-layout',
    component: ContentLayoutPageComponent,
    data: {
      title: 'Content Layout page'
    },
  },
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home Page'
        }
      },
      {
        path: 'pbrsolution',
        component: PbrsolutionComponent,
        data: {
          title: 'PBR Solutions'
        }
      },
      {
        path: 'request-access',
        component: RequestAccessComponent,
        data: {
          title: 'Request Access'
        }
      },
      {
        path: 'request-access-form',
        component: RequestAccessFormComponent,
        data: {
          title: 'Request Access Form'
        }
      },
      {
        path: 'privacy',
        component: PrivacyComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'terms-of-use',
        component: TermsOfUseComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'signup',
        component: SignupComponent,
        data: {
          title: 'Signup Page'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
