import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLayoutPageComponent } from './content-layout-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

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
