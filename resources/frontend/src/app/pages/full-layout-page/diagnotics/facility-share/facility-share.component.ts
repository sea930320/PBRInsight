import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { DiagnoticsService } from '../../../../shared/_api/diagnotics.service';
import { DiagnoticsCommunicationService } from '../../../../shared/_communication/diagnotics.service';

import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'facility-share',
  templateUrl: './facility-share.component.html',
  styleUrls: ['./facility-share.component.scss']
})
export class FacilityShareComponent implements OnInit {
  // global Settings
  @ViewChild('facilityNS') facilityNS: NouisliderComponent

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
  dataTableSettings = settings.facilitySettings;
  dataTableSource: LocalDataSource;

  // Share By Test Category Chart  
  facility = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    shares: null,
    facilitys: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: []
  }

  // nouislider config
  facilityConfig: any = {
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
      if (!this.filter.sub_analysis_1) return
      this.isFiltered = true
      this.fetchData()
    });
  }

  fetchData() {
    this.facility.liveChart = []
    this.facility.initialChart = []
    this.facility.liveChartActivate = true;

    if (this.facility.timer) clearInterval(this.facility.timer);

    this.diagnoticsService.facilityShare(this.filter)
      .subscribe((res: any) => {
        this.facility.facilitys = []
        this.facility.shares = res.facilityShares
        this.facility.totalOccurence = res.total || 0

        for (var facility_name in this.facility.shares) {
          if (!this.facility.shares.hasOwnProperty(facility_name)) continue;
          if (!this.facility.shares[facility_name]) continue;
          this.facility.facilitys.push(facility_name);
          var percentage = {
            'name': facility_name,
            'value': this.facility.shares[facility_name] ? (parseFloat(this.facility.shares[facility_name]) / this.facility.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.facility.shares[facility_name] ? this.facility.shares[facility_name] : 0,
          }
          this.facility.initialChart.push(percentage)
        }
        // nouislider draw
        this.facilityConfig.range.max = this.facility.initialChart.length - 1 || 1
        if (this.facilityNS) {
          this.facilityNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.facility.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.facility.initialChart)
        this.dataTableSource.load(this.facility.initialChart)
        // datachart redraw
        this.facility.drawChartStartPos = -1;
        this.facility.liveChartActivate = false;
        this.drawLiveChart();
        this.facility.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.facility.liveChartActivate) return;
    if (!force) {
      this.facility.drawChartStartPos++;
    }
    if (this.facility.drawChartStartPos > this.facility.initialChart.length - this.barChartSettings.barChartXSDisplayCount) {
      this.facility.drawChartStartPos = 0;
    }
    this.facility.liveChart = this.facility.initialChart.slice(this.facility.drawChartStartPos, this.facility.drawChartStartPos + this.barChartSettings.barChartXSDisplayCount);
  }

}
