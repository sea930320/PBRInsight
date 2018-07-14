import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutPageComponent } from './full-layout-page.component';
import { AnalyticsComponent } from './disease-prevalence/analytics/analytics.component';
import { PatientFlowMetricsComponent } from './disease-prevalence/patient-flow-metrics/patient-flow-metrics.component';
import { CoMorbiditiesComponent } from './disease-prevalence/co-morbidities/co-morbidities.component';
import { TherapyAreaLevelComponent } from './treatment-mapping/therapy-area-level/therapy-area-level.component';
import { BrandMoleculeComponent } from './treatment-mapping/brand-molecule/brand-molecule.component';
import { DiagnoticsComponent } from './diagnotics/diagnotics.component';

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
  },
  {
    path: 'treatment-mapping',
    children: [
      {
        path: 'therapy-area-level',
        component: TherapyAreaLevelComponent,
        data: {
          title: 'Treatment Mapping-Therapy Area Level'
        }
      },
      {
        path: 'brand-molecule',
        component: BrandMoleculeComponent,
        data: {
          title: 'Treatment Mapping-Brand and molecule Share (INN)'
        }
      }      
    ]
  },
  {
    path: 'diagnotics',
    component: DiagnoticsComponent,
    data: {
      title: 'Diagnotics'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
