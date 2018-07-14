import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { DiagnoticsService } from '../../../../shared/_api/diagnotics.service';
import { DiagnoticsCommunicationService } from '../../../../shared/_communication/diagnotics.service';

import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'sub-ana2-share',
  templateUrl: './sub-ana2-share.component.html',
  styleUrls: ['./sub-ana2-share.component.scss']
})
export class SubAna2ShareComponent implements OnInit {

  // global Settings
  @ViewChild('subAna2NS') subAna2NS: NouisliderComponent

  currentYear = new Date().getFullYear()
  isFiltered = false
  filter = {
    classification: "",
    sub_analysis_1: "",
    start_year: "",
    start_quarater: "",
    end_year: "",
    end_quarater: ""
  }

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.subAna2Settings;
  dataTableSource: LocalDataSource;

  // Share By Test Category Chart  
  subAna2 = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    shares: null,
    subAna2s: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: []
  }

  // nouislider config
  subAna2Config: any = {
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

  constructor(private diagnoticsService: DiagnoticsService, private diagnoticsCommunicationService: DiagnoticsCommunicationService) { }

  ngOnInit() {
    this.diagnoticsCommunicationService.changeFilter.subscribe(filter => {
      this.filter = filter;
      if (!this.filter.classification && !this.filter.sub_analysis_1) return
      this.isFiltered = true
      this.fetchData()
    });
  }

  fetchData() {
    this.subAna2.liveChart = []
    this.subAna2.initialChart = []
    this.subAna2.liveChartActivate = true;

    if (this.subAna2.timer) clearInterval(this.subAna2.timer);

    this.diagnoticsService.subAna2Share(this.filter)
      .subscribe((res: any) => {
        this.subAna2.subAna2s = []
        this.subAna2.shares = res.subAna2Shares
        this.subAna2.totalOccurence = res.total || 0

        for (var subAna2_name in this.subAna2.shares) {
          if (!this.subAna2.shares.hasOwnProperty(subAna2_name)) continue;
          if (!this.subAna2.shares[subAna2_name]) continue;
          this.subAna2.subAna2s.push(subAna2_name);
          var percentage = {
            'name': subAna2_name,
            'value': this.subAna2.shares[subAna2_name] ? (parseFloat(this.subAna2.shares[subAna2_name]) / this.subAna2.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.subAna2.shares[subAna2_name] ? this.subAna2.shares[subAna2_name] : 0,
          }
          this.subAna2.initialChart.push(percentage)
        }
        // nouislider draw
        this.subAna2Config.range.max = this.subAna2.initialChart.length - 1 || 1
        if (this.subAna2NS) {
          this.subAna2NS.slider.updateOptions({
            range: {
              min: 0,
              max: this.subAna2.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.subAna2.initialChart)
        this.dataTableSource.load(this.subAna2.initialChart)
        // datachart redraw
        this.subAna2.drawChartStartPos = -1;
        this.subAna2.liveChartActivate = false;
        this.drawLiveChart();
        this.subAna2.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.subAna2.liveChartActivate) return;
    if (!force) {
      this.subAna2.drawChartStartPos++;
    }
    if (this.subAna2.drawChartStartPos > this.subAna2.initialChart.length - this.barChartSettings.barChartXSDisplayCount) {
      this.subAna2.drawChartStartPos = 0;
    }
    this.subAna2.liveChart = this.subAna2.initialChart.slice(this.subAna2.drawChartStartPos, this.subAna2.drawChartStartPos + this.barChartSettings.barChartXSDisplayCount);
  }

}
