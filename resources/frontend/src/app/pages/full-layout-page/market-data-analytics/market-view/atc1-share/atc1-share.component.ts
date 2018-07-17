import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { MarketViewService } from '../../../../../shared/_api/market-view.service';
import { MarketViewCommunicationService } from '../../../../../shared/_communication/market-view.service';

import * as chartsData from '../../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'market-view-atc1-share',
  templateUrl: './atc1-share.component.html',
  styleUrls: ['./atc1-share.component.scss']
})
export class Atc1ShareComponent implements OnInit {

  // global Settings
  @Input() drugForms: Array<any>;
  @ViewChild('atc1NS') atc1NS: NouisliderComponent
  filter = {
    year: "",
    drug_form_id: ""
  }

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.atc1Settings;
  dataTableSource: LocalDataSource;

  // Disease By Atc1 Chart  
  atc1 = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    valuations: null,
    atc1s: null,
    totalValue: null,
    initialChart: [],
    liveChart: []
  }

  // nouislider config
  atc1Config: any = {
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
    this.marketViewCommunicationService.changeYear.subscribe(year => {
      this.filter.year = year
      this.fetchData()
    });
  }

  fetchData() {
    this.atc1.liveChart = []
    this.atc1.initialChart = []
    this.atc1.liveChartActivate = true;

    if (this.atc1.timer) clearInterval(this.atc1.timer);
    this.marketViewService.atc1Share(this.filter)
      .subscribe((res: any) => {
        this.atc1.atc1s = res.atc1s
        this.atc1.valuations = res.valuations
        this.atc1.totalValue = res.totalValue || 1

        for (var atc1_id in this.atc1.atc1s) {
          if (!this.atc1.atc1s.hasOwnProperty(atc1_id)) continue;
          if (!this.atc1.valuations[atc1_id]) continue;
          var valuation = {
            'name': this.atc1.atc1s[atc1_id],
            'value': this.atc1.valuations[atc1_id] ? (parseFloat(this.atc1.valuations[atc1_id]) / this.atc1.totalValue * 100).toFixed(2) : 0,
            'naira': this.atc1.valuations[atc1_id] ? this.atc1.valuations[atc1_id] : 0,
            'atc1_id': atc1_id
          }
          this.atc1.initialChart.push(valuation)
        }
        // nouislider draw
        this.atc1Config.range.max = this.atc1.initialChart.length - 1 || 1
        if (this.atc1NS) {
          this.atc1NS.slider.updateOptions({
            range: {
              min: 0,
              max: this.atc1.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.atc1.initialChart)
        this.dataTableSource.load(this.atc1.initialChart)
        // datachart redraw
        this.atc1.drawChartStartPos = -1;
        this.atc1.liveChartActivate = false;
        this.drawLiveChart();
        this.atc1.timer = setInterval(this.drawLiveChart.bind(this), 5000);
        // emit event
        if (this.atc1.initialChart.length === 0)
          this.changeFilter("", "")
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.atc1.liveChartActivate) return;
    if (!force) {
      this.atc1.drawChartStartPos++;
    }

    if (this.atc1.drawChartStartPos > this.atc1.initialChart.length - this.barChartSettings.barChartDisplayCount) {
      this.atc1.drawChartStartPos = 0;
    }
    this.atc1.liveChart = this.atc1.initialChart.slice(this.atc1.drawChartStartPos, this.atc1.drawChartStartPos + this.barChartSettings.barChartDisplayCount);
  }

  selectChart(event) {
    var valuation = this.atc1.initialChart.filter(function (valuation) {
      return valuation.name == event.name
    })
    this.changeFilter(valuation[0].atc1_id, event.name)
  }

  selectTable(event) {
    this.changeFilter(event.data.atc1_id, event.data.name)
  }

  changeFilter(atc1_id, atc1_name) {
    this.marketViewCommunicationService.changeFilterEmit({
      year: this.filter.year,
      drug_form_id: this.filter.drug_form_id,
      atc1_id: atc1_id,
      atc1_name: atc1_name
    })
  }
}
