import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ChartsModule } from 'ng2-charts';
import { ChartistModule} from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FullPagesRoutingModule } from "./full-pages-routing.module";

//----------------component----------------------//
import { FullLayoutPageComponent } from './full-layout-page.component';
import { AnalyticsComponent } from './disease-prevalence/analytics/analytics.component';

//-----------------service-----------------------//
import { DiseasePrevalenceService } from '../../shared/_api/disease_prevalence.service';

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        ChartsModule,
        ChartistModule,
        NgxChartsModule,
        NgxDatatableModule,
        Ng2SmartTableModule
    ],
    declarations: [       
        FullLayoutPageComponent,
        AnalyticsComponent
    ],
    providers: [
        DiseasePrevalenceService
    ]
})
export class FullPagesModule { }
