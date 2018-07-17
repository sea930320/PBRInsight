import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { MarketViewService } from '../../../../../shared/_api/market-view.service';
import { MarketViewCommunicationService } from '../../../../../shared/_communication/market-view.service';

import * as chartsData from '../../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'market-view-atc2-share',
  templateUrl: './atc2-share.component.html',
  styleUrls: ['./atc2-share.component.scss']
})
export class Atc2ShareComponent implements OnInit {

  // global Settings
  @ViewChild('atc2NS') atc2NS: NouisliderComponent
  filter = {
    year: "",
    drug_form_id: "",
    atc1_id: "",
    atc1_name: ""
  }
  drugForm = ""

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.atc2Settings;
  dataTableSource: LocalDataSource;

  // Disease By Atc2 Chart  
  atc2 = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    valuations: null,
    atc2s: null,
    totalValue: null,
    initialChart: [],
    liveChart: []
  }

  // nouislider config
  atc2Config: any = {
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

  constructor(private marketViewService: MarketViewService, private marketViewCommunicationService: MarketViewCommunicationService) { }

  ngOnInit() {
    this.marketViewCommunicationService.changeFilter.subscribe(filter => {
      this.filter = filter
      this.drugForm = (filter.drug_form_id == 1) ? "POM" : (filter.drug_form_id == 2) ? "OTC" : ""
      this.fetchData()
    });
  }

  fetchData() {
    this.atc2.liveChart = []
    this.atc2.initialChart = []
    this.atc2.liveChartActivate = true;

    if (!this.filter.atc1_name) return;
    if (this.atc2.timer) clearInterval(this.atc2.timer);
    this.marketViewService.atc2Share(this.filter)
      .subscribe((res: any) => {
        this.atc2.atc2s = res.atc2s
        this.atc2.valuations = res.valuations
        this.atc2.totalValue = res.totalValue || 1

        for (var atc2_id in this.atc2.atc2s) {
          if (!this.atc2.atc2s.hasOwnProperty(atc2_id)) continue;
          if (!this.atc2.valuations[atc2_id]) continue;
          var valuation = {
            'name': this.atc2.atc2s[atc2_id],
            'value': this.atc2.valuations[atc2_id] ? (parseFloat(this.atc2.valuations[atc2_id]) / this.atc2.totalValue * 100).toFixed(2) : 0,
            'naira': this.atc2.valuations[atc2_id] ? this.atc2.valuations[atc2_id] : 0,
            'atc2_id': atc2_id
          }
          this.atc2.initialChart.push(valuation)
        }
        // nouislider draw
        this.atc2Config.range.max = this.atc2.initialChart.length - 1 || 1
        if (this.atc2NS) {
          this.atc2NS.slider.updateOptions({
            range: {
              min: 0,
              max: this.atc2.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.atc2.initialChart)
        this.dataTableSource.load(this.atc2.initialChart)
        // datachart redraw
        this.atc2.drawChartStartPos = -1;
        this.atc2.liveChartActivate = false;
        this.drawLiveChart();
        this.atc2.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.atc2.liveChartActivate) return;
    if (!force) {
      this.atc2.drawChartStartPos++;
    }

    if (this.atc2.drawChartStartPos > this.atc2.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.atc2.drawChartStartPos = 0;
    }
    this.atc2.liveChart = this.atc2.initialChart.slice(this.atc2.drawChartStartPos, this.atc2.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }
}
