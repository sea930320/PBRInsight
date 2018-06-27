import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutPageComponent } from 'app/pages/full-layout-page/full-layout-page.component';
import { AnalyticsComponent } from './disease-prevalence/analytics/analytics.component';
const routes: Routes = [
  {
    path: 'full-layout',
    component: FullLayoutPageComponent,
    data: {
      title: 'Full Layout Page'
    },
  },
  {
    path: 'disease-prevalence',
    children: [
      {
        path: 'analytics',
        component: AnalyticsComponent,
        data: {
          title: 'Disease Prevalence Main Payge'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
