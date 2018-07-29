import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgSelectModule } from '@ng-select/ng-select';
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
import { DrugFormService } from '../../shared/_api/drug-form.service';
import { Atc1Service } from '../../shared/_api/atc1.service';
import { Atc2Service } from '../../shared/_api/atc2.service';
import { Atc3Service } from '../../shared/_api/atc3.service';
import { Atc4Service } from '../../shared/_api/atc4.service';
import { Atc5Service } from '../../shared/_api/atc5.service';
import { PatientFlowMetricsService } from '../../shared/_api/patient-flow-metrics.service';
import { CoMorbiditiesService } from '../../shared/_api/co_morbidities.service';
import { TherapyAreaLevelService } from '../../shared/_api/therapy-area-level.service';
import { DiseaseService } from '../../shared/_api/disease.service';
import { BrandMoleculeService } from '../../shared/_api/brand-molecule.service';
import { DiagnoticsService } from '../../shared/_api/diagnotics.service';
import { MarketViewService } from '../../shared/_api/market-view.service';
import { TherapyAreaAnaService } from '../../shared/_api/therapy-area-ana.service';
import { BrandAnaService } from '../../shared/_api/brand-ana.service';
import { MoleculeAnaService } from '../../shared/_api/molecule-ana.service';
import { MoleculePriceService } from '../../shared/_api/molecule-price.service';
import { BrandPriceService } from '../../shared/_api/brand-price.service';
import { CostTreatmentService } from '../../shared/_api/cost-treatment.service';
import { DiagnoticsCommunicationService } from '../../shared/_communication/diagnotics.service';
import { MarketViewCommunicationService } from '../../shared/_communication/market-view.service';
import { TherapyAreaAnaCommunicationService } from '../../shared/_communication/therapy-area-ana.service';
import { PatientFlowMetricsCommunicationService } from '../../shared/_communication/patient-flow-metrics.service';

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
import { DiagnoticsComponent } from './diagnotics/diagnotics.component';
import { ClassificationShareComponent } from './diagnotics/classification-share/classification-share.component';
import { SubAna1ShareComponent } from './diagnotics/sub-ana1-share/sub-ana1-share.component';
import { SubAna2ShareComponent } from './diagnotics/sub-ana2-share/sub-ana2-share.component';
import { ClinicShareComponent } from './diagnotics/clinic-share/clinic-share.component';
import { FacilityShareComponent } from './diagnotics/facility-share/facility-share.component';
import { MarketViewComponent } from './market-data-analytics/market-view/market-view.component';
import { TherapyAreaAnalyticsComponent } from './market-data-analytics/therapy-area-analytics/therapy-area-analytics.component';
import { BrandAnalyticsComponent } from './market-data-analytics/brand-analytics/brand-analytics.component';
import { MoleculeAnalyticsComponent } from './market-data-analytics/molecule-analytics/molecule-analytics.component';
import { MoleculePriceAnalyticsComponent } from './pricing-analytics/molecule-price-analytics/molecule-price-analytics.component';
import { BrandPriceAnalyticsComponent } from './pricing-analytics/brand-price-analytics/brand-price-analytics.component';
import { CostTreatmentMetricsComponent } from './pharmaeco/cost-treatment-metrics/cost-treatment-metrics.component';
import { MarketShareBySegmentComponent } from './market-data-analytics/market-view/market-share-by-segment/market-share-by-segment.component';
import { Atc1ShareComponent } from './market-data-analytics/market-view/atc1-share/atc1-share.component';
import { Atc2ShareComponent } from './market-data-analytics/market-view/atc2-share/atc2-share.component';
import { Atc2ShareTaComponent } from './market-data-analytics/therapy-area-analytics/atc2-share-ta/atc2-share-ta.component';
import { Atc4ShareTaComponent } from './market-data-analytics/therapy-area-analytics/atc4-share-ta/atc4-share-ta.component';
import { Atc5ShareTaComponent } from './market-data-analytics/therapy-area-analytics/atc5-share-ta/atc5-share-ta.component';

@NgModule({
    imports: [
        CommonModule,
        NgSelectModule,
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
        AcShareComponent,
        DiagnoticsComponent,
        ClassificationShareComponent,
        SubAna1ShareComponent,
        SubAna2ShareComponent,
        ClinicShareComponent,
        FacilityShareComponent,
        MarketViewComponent,
        TherapyAreaAnalyticsComponent,
        BrandAnalyticsComponent,
        MoleculeAnalyticsComponent,
        MoleculePriceAnalyticsComponent,
        BrandPriceAnalyticsComponent,
        CostTreatmentMetricsComponent,
        MarketShareBySegmentComponent,
        Atc1ShareComponent,
        Atc2ShareComponent,
        Atc2ShareTaComponent,
        Atc4ShareTaComponent,
        Atc5ShareTaComponent
    ],
    providers: [
        DiseaseService,
        TherapyAreaService,
        ClinicTypeService,
        DiseasePrevalenceService,
        PopulationService,
        AgeGroupReportService,
        DrugFormService,
        Atc1Service,
        Atc2Service,
        Atc3Service,
        Atc4Service,
        Atc5Service,
        PatientFlowMetricsService,
        CoMorbiditiesService,
        TherapyAreaLevelService,
        BrandMoleculeService,
        DiagnoticsService,
        MarketViewService,
        TherapyAreaAnaService,
        BrandAnaService,
        MoleculeAnaService,
        MoleculePriceService,
        BrandPriceService,
        CostTreatmentService,
        DiagnoticsCommunicationService,
        MarketViewCommunicationService,
        TherapyAreaAnaCommunicationService,
        PatientFlowMetricsCommunicationService
    ]
})
export class FullPagesModule { }
