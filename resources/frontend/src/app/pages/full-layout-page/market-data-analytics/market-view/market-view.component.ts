import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { MarketViewService } from '../../../../shared/_api/market-view.service';
import { DrugFormService } from '../../../../shared/_api/drug-form.service';

import { MarketViewCommunicationService } from '../../../../shared/_communication/market-view.service';

import * as settings from './_settings.config'
import * as chartsData from '../../../../shared/_config/ngx-charts.config'

@Component({
  selector: 'app-market-view',
  templateUrl: './market-view.component.html',
  styleUrls: ['./market-view.component.scss']
})
export class MarketViewComponent implements OnInit {

  // global Settings
  @ViewChild('tmNS') tmNS: NouisliderComponent //tm = total market valuation
  selectedYear = ""
  drugForms = []

  // Vertical Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // Total Market Valuation Chart
  tm = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    valuations: null,
    years: null,
    totalValue: null,
    initialChart: [],
    liveChart: []
  }

  // dataTable Settings  
  dataTableSettings = settings.tmSettings;
  dataTableSource: LocalDataSource;

  // nouislider config
  tmConfig: any = {
    range: {
      min: 0,
      max: 0
    },
    step: 1,
    connect: true,
    tooltips: true,
    pips: {
      mode: 'positions',
      values: [0, 100],
      density: 1
    }
  }

  constructor(private marketViewService: MarketViewService, private drugFormService: DrugFormService, private marketViewCommunicationService: MarketViewCommunicationService) { }

  ngOnInit() {
    this.drugFormService.index()
      .subscribe((res: any) => {
        this.drugForms = res.drug_forms
      })
    this.fetchData();
  }

  fetchData() {
    this.tm.liveChart = []
    this.tm.initialChart = []
    this.tm.liveChartActivate = true;

    if (this.tm.timer) clearInterval(this.tm.timer);
    this.marketViewService.totalMarketValuation()
      .subscribe((res: any) => {
        this.tm.years = []
        this.tm.valuations = res.valuations
        this.tm.totalValue = res.totalValue || 1
        for (var year in this.tm.valuations) {
          if (!this.tm.valuations.hasOwnProperty(year)) continue;
          var valuation = {
            'name': year,
            'value': this.tm.valuations[year] ? (parseFloat(this.tm.valuations[year]) / this.tm.totalValue * 100).toFixed(2) : 0,
            'valuation': this.tm.valuations[year] ? this.tm.valuations[year] : 0
          }
          this.tm.initialChart.push(valuation)
          this.tm.years.push(year)
        }
        // nouislider draw
        this.tmConfig.range.max = this.tm.initialChart.length - 1 || 1
        if (this.tmNS) {
          this.tmNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.tm.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.tm.initialChart)
        this.dataTableSource.load(this.tm.initialChart)
        // datachart redraw
        this.tm.drawChartStartPos = -1;
        this.tm.liveChartActivate = false;
        this.drawLiveChart();
        this.tm.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.tm.liveChartActivate) return;
    if (!force) {
      this.tm.drawChartStartPos++;
    }

    if (this.tm.drawChartStartPos > this.tm.initialChart.length - this.barChartSettings.barChartXSDisplayCount) {
      this.tm.drawChartStartPos = 0;
    }
    this.tm.liveChart = this.tm.initialChart.slice(this.tm.drawChartStartPos, this.tm.drawChartStartPos + this.barChartSettings.barChartXSDisplayCount);
  }

  selectChart(event) {
    this.selectedYear = event.name
    this.changeYear()
  }

  selectTable(event) {
    this.selectedYear = event.data.name
    this.changeYear()
  }

  changeYear() {
    this.marketViewCommunicationService.changeYearEmit(this.selectedYear)
  }
}
