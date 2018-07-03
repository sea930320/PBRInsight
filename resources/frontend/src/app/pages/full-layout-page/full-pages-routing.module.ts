import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutPageComponent } from 'app/pages/full-layout-page/full-layout-page.component';
import { AnalyticsComponent } from './disease-prevalence/analytics/analytics.component';
import { PatientFlowMetricsComponent } from './disease-prevalence/patient-flow-metrics/patient-flow-metrics.component';
import { CoMorbiditiesComponent } from './disease-prevalence/co-morbidities/co-morbidities.component';

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
          title: 'Disease Prevalence-Main Payge'
        }
      },
      {
        path: 'patient-flow-metrics',
        component: PatientFlowMetricsComponent,
        data: {
          title: 'Disease Prevalence-Patient Flow Metrics'
        }
      },
      {
        path: 'co-morbidities',
        component: CoMorbiditiesComponent,
        data: {
          title: 'Disease Prevalence-Co-Morbidities'
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
