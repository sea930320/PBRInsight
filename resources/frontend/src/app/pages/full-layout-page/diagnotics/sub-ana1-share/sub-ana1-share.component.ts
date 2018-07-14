import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { DiagnoticsService } from '../../../../shared/_api/diagnotics.service';
import { DiagnoticsCommunicationService } from '../../../../shared/_communication/diagnotics.service';

import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'sub-ana1-share',
  templateUrl: './sub-ana1-share.component.html',
  styleUrls: ['./sub-ana1-share.component.scss']
})
export class SubAna1ShareComponent implements OnInit {

  // global Settings
  @ViewChild('subAna1NS') subAna1NS: NouisliderComponent

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
  firstSelectEvent = true

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;

  // dataTable Settings
  dataTableSettings = settings.subAna1Settings;
  dataTableSource: LocalDataSource;

  // Share By Test Category Chart  
  subAna1 = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    shares: null,
    subAna1s: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: []
  }

  // nouislider config
  subAna1Config: any = {
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
      if (!filter.classification) return
      this.filter = filter
      this.isFiltered = true
      this.fetchData()
    });
  }

  fetchData() {
    this.subAna1.liveChart = []
    this.subAna1.initialChart = []
    this.subAna1.liveChartActivate = true;
    this.firstSelectEvent = true

    if (this.subAna1.timer) clearInterval(this.subAna1.timer);
    let { sub_analysis_1, ...filter } = this.filter
    this.diagnoticsService.subAna1Share(filter)
      .subscribe((res: any) => {
        this.subAna1.subAna1s = []
        this.subAna1.shares = res.subAna1Shares
        this.subAna1.totalOccurence = res.total || 0

        for (var subAna1_name in this.subAna1.shares) {
          if (!this.subAna1.shares.hasOwnProperty(subAna1_name)) continue;
          if (!this.subAna1.shares[subAna1_name]) continue;
          this.subAna1.subAna1s.push(subAna1_name);
          var percentage = {
            'name': subAna1_name,
            'value': this.subAna1.shares[subAna1_name] ? (parseFloat(this.subAna1.shares[subAna1_name]) / this.subAna1.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.subAna1.shares[subAna1_name] ? this.subAna1.shares[subAna1_name] : 0,
          }
          this.subAna1.initialChart.push(percentage)
        }
        // nouislider draw
        this.subAna1Config.range.max = this.subAna1.initialChart.length - 1 || 1
        if (this.subAna1NS) {
          this.subAna1NS.slider.updateOptions({
            range: {
              min: 0,
              max: this.subAna1.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.subAna1.initialChart)
        this.dataTableSource.load(this.subAna1.initialChart)
        // datachart redraw
        this.subAna1.drawChartStartPos = -1;
        this.subAna1.liveChartActivate = false;
        this.drawLiveChart();
        this.subAna1.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.subAna1.liveChartActivate) return;
    if (!force) {
      this.subAna1.drawChartStartPos++;
    }
    if (this.subAna1.drawChartStartPos > this.subAna1.initialChart.length - this.barChartSettings.barChartXSDisplayCount) {
      this.subAna1.drawChartStartPos = 0;
    }
    this.subAna1.liveChart = this.subAna1.initialChart.slice(this.subAna1.drawChartStartPos, this.subAna1.drawChartStartPos + this.barChartSettings.barChartXSDisplayCount);
  }

  onSelectChart(event) {
    this.filter.sub_analysis_1 = event.name
    this.changeFilter()
  }

  onSelectTable(event) {
    if (this.firstSelectEvent) {
      this.firstSelectEvent = false
      return
    }
    this.filter.sub_analysis_1 = event.data.name
    this.changeFilter()
  }

  changeFilter() {
    this.diagnoticsCommunicationService.changeFilterEmit(this.filter)
  }
}
