import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { MarketViewService } from '../../../../../shared/_api/market-view.service';
import { MarketViewCommunicationService } from '../../../../../shared/_communication/market-view.service';

import * as settings from './_settings.config'
import * as chartsData from '../../../../../shared/_config/ngx-charts.config'

@Component({
  selector: 'market-share-by-segment',
  templateUrl: './market-share-by-segment.component.html',
  styleUrls: ['./market-share-by-segment.component.scss']
})
export class MarketShareBySegmentComponent implements OnInit {

  // global Settings
  year: String = "";

  // Pie Charts
  pieChartSettings = chartsData.pieChartSettings;
  pieChartView: any[] = chartsData.pieChartView;

  // Drug Form Valuation Chart
  drugForm = {
    valuations: null,
    drugForms: [],
    totalValue: null,
    initialChart: []
  }

  constructor(private marketViewService: MarketViewService, private marketViewCommunicationService: MarketViewCommunicationService) { }

  ngOnInit() {
    this.marketViewCommunicationService.changeYear.subscribe(year => {
      this.year = year
      this.fetchData()
    });
  }

  fetchData() {
    this.drugForm.initialChart = []

    this.marketViewService.marketShareBySegment({
      year: this.year
    })
      .subscribe((res: any) => {
        this.drugForm.valuations = res.valuations
        this.drugForm.totalValue = res.totalValue || 1
        this.drugForm.drugForms = []
        for (var drug_form_id in this.drugForm.valuations) {
          if (!this.drugForm.valuations.hasOwnProperty(drug_form_id)) continue;
          this.drugForm.drugForms.push(res.drugForms[drug_form_id]);
          var valuation = {
            'name': res.drugForms[drug_form_id],
            'value': this.drugForm.valuations[drug_form_id] ? parseInt(this.drugForm.valuations[drug_form_id]) : 0
          }
          this.drugForm.initialChart.push(valuation)
        }
      });
  }
}
