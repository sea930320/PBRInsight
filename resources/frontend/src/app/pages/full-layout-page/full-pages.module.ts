import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullPagesRoutingModule } from "./full-pages-routing.module";

//----------------component----------------------//
import { FullLayoutPageComponent } from './full-layout-page.component';
import { AnalyticsComponent } from './disease-prevalence/analytics/analytics.component';

//-----------------service-----------------------//
import { ClinicTypeService } from '../../shared/_api/clinic_type.service';
import { DiseasePrevalenceService } from '../../shared/_api/disease_prevalence.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgxChartsModule,
        Ng2SmartTableModule,
        FullPagesRoutingModule
    ],
    declarations: [
        FullLayoutPageComponent,
        AnalyticsComponent
    ],
    providers: [
        ClinicTypeService,
        DiseasePrevalenceService
    ]
})
export class FullPagesModule { }
