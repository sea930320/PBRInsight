import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutPageComponent } from './full-layout-page.component';
import { AnalyticsComponent } from './disease-prevalence/analytics/analytics.component';
import { PatientFlowMetricsComponent } from './disease-prevalence/patient-flow-metrics/patient-flow-metrics.component';
import { CoMorbiditiesComponent } from './disease-prevalence/co-morbidities/co-morbidities.component';
import { TherapyAreaLevelComponent } from './treatment-mapping/therapy-area-level/therapy-area-level.component';
import { BrandMoleculeComponent } from './treatment-mapping/brand-molecule/brand-molecule.component';
import { DiagnoticsComponent } from './diagnotics/diagnotics.component';
import { MarketViewComponent } from './market-data-analytics/market-view/market-view.component';
import { TherapyAreaAnalyticsComponent } from './market-data-analytics/therapy-area-analytics/therapy-area-analytics.component';
import { BrandAnalyticsComponent } from './market-data-analytics/brand-analytics/brand-analytics.component';
import { MoleculeAnalyticsComponent } from './market-data-analytics/molecule-analytics/molecule-analytics.component';
import { MoleculePriceAnalyticsComponent } from './pricing-analytics/molecule-price-analytics/molecule-price-analytics.component';
import { BrandPriceAnalyticsComponent } from './pricing-analytics/brand-price-analytics/brand-price-analytics.component';
import { CostTreatmentMetricsComponent } from './pharmaeco/cost-treatment-metrics/cost-treatment-metrics.component';
const routes: Routes = [
  {
    path: 'dashboard',
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
        path: 'co-morbidities',
        component: CoMorbiditiesComponent,
        data: {
          title: 'Disease Prevalence-Co-Morbidities'
        }
      }
    ]
  },
  {
    path: 'patient-flow-metrics',
    component: PatientFlowMetricsComponent,
    data: {
      title: 'Patient Forecasting'
    }
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
  },
  {
    path: 'market-data-analytics',
    children: [
      {
        path: 'market-view',
        component: MarketViewComponent,
        data: {
          title: 'Market Data Analytics-Market View'
        }
      },
      {
        path: 'therapy-area',
        component: TherapyAreaAnalyticsComponent,
        data: {
          title: 'Market Data Analytics-Therapy Area'
        }
      },
      {
        path: 'brand',
        component: BrandAnalyticsComponent,
        data: {
          title: 'Market Data Analytics-Brand Analytics'
        }
      },
      {
        path: 'molecule',
        component: MoleculeAnalyticsComponent,
        data: {
          title: 'Market Data Analytics-Molecule Analytics'
        }
      }
    ]
  },
  {
    path: 'pricing-analytics',
    children: [
      {
        path: 'molecule-price-analytics',
        component: MoleculePriceAnalyticsComponent,
        data: {
          title: 'Pricing Analytics-Molecule(INN) Price Analytics'
        }
      },
      {
        path: 'brand-price-analytics',
        component: BrandPriceAnalyticsComponent,
        data: {
          title: 'Pricing Analytics-Brand Price Analytics'
        }
      }
    ]
  },
  {
    path: 'pharmaeco',
    children: [
      {
        path: 'cost-treatment-metrics',
        component: CostTreatmentMetricsComponent,
        data: {
          title: 'Pharmacoeconomics-Cost Treatment Metrics'
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
