import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { NouisliderModule } from 'ng2-nouislider';

//-----------------service-----------------------//
import { ClinicTypeService } from '../../shared/_api/clinic_type.service';
import { TherapyAreaService } from '../../shared/_api/therapy_area.service';
import { DiseasePrevalenceService } from '../../shared/_api/disease_prevalence.service';
import { PopulationService } from '../../shared/_api/population.service';
import { AgeGroupReportService } from '../../shared/_api/age_group_report.service';
import { PatientFlowMetricsService } from '../../shared/_api/patient-flow-metrics.service';
import { CoMorbiditiesService } from '../../shared/_api/co_morbidities.service';
import { TherapyAreaLevelService } from '../../shared/_api/therapy-area-level.service';
import { DiseaseService } from '../../shared/_api/disease.service';
import { BrandMoleculeService } from '../../shared/_api/brand-molecule.service';

//----------------component----------------------//
import { FullLayoutPageComponent } from './full-layout-page.component';
import { AnalyticsComponent } from './disease-prevalence/analytics/analytics.component';
import { PatientFlowMetricsComponent } from './disease-prevalence/patient-flow-metrics/patient-flow-metrics.component';
import { AgeGroupStatsComponent } from './disease-prevalence/patient-flow-metrics/age-group-stats/age-group-stats.component';
import { DiseaseByBrandComponent } from './disease-prevalence/patient-flow-metrics/disease-by-brand/disease-by-brand.component';
import { DiseaseByAtcComponent } from './disease-prevalence/patient-flow-metrics/disease-by-atc/disease-by-atc.component';
import { CoMorbiditiesComponent } from './disease-prevalence/co-morbidities/co-morbidities.component';
import { TherapyAreaLevelComponent } from './treatment-mapping/therapy-area-level/therapy-area-level.component';
import { DiseaseByAcComponent } from './disease-prevalence/patient-flow-metrics/disease-by-ac/disease-by-ac.component';
import { BrandMoleculeComponent } from './treatment-mapping/brand-molecule/brand-molecule.component';
import { BrandShareComponent } from './treatment-mapping/brand-molecule/brand-share/brand-share.component';
import { AcShareComponent } from './treatment-mapping/brand-molecule/ac-share/ac-share.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgxChartsModule,
        Ng2SmartTableModule,
        FullPagesRoutingModule,
        NouisliderModule
    ],
    declarations: [
        FullLayoutPageComponent,
        AnalyticsComponent,
        PatientFlowMetricsComponent,
        AgeGroupStatsComponent,
        DiseaseByBrandComponent,
        DiseaseByAtcComponent,
        CoMorbiditiesComponent,
        TherapyAreaLevelComponent,
        DiseaseByAcComponent,
        BrandMoleculeComponent,
        BrandShareComponent,
        AcShareComponent
    ],
    providers: [
        DiseaseService,
        TherapyAreaService,
        ClinicTypeService,
        DiseasePrevalenceService,
        PopulationService,
        AgeGroupReportService,
        PatientFlowMetricsService,
        CoMorbiditiesService,
        TherapyAreaLevelService,
        BrandMoleculeService
    ]
})
export class FullPagesModule { }
