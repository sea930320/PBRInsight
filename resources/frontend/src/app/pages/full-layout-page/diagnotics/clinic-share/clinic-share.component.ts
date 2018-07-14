import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NouisliderComponent } from 'ng2-nouislider';

import { DiagnoticsService } from '../../../../shared/_api/diagnotics.service';
import { DiagnoticsCommunicationService } from '../../../../shared/_communication/diagnotics.service';

import * as chartsData from '../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'clinic-share',
  templateUrl: './clinic-share.component.html',
  styleUrls: ['./clinic-share.component.scss']
})
export class ClinicShareComponent implements OnInit {
  // global Settings
  @ViewChild('clinicNS') clinicNS: NouisliderComponent

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
  dataTableSettings = settings.clinicSettings;
  dataTableSource: LocalDataSource;

  // Share By Test Category Chart  
  clinic = {
    timer: null,
    drawChartStartPos: -1,
    liveChartActivate: false,
    shares: null,
    clinics: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: []
  }

  // nouislider config
  clinicConfig: any = {
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
    this.clinic.liveChart = []
    this.clinic.initialChart = []
    this.clinic.liveChartActivate = true;

    if (this.clinic.timer) clearInterval(this.clinic.timer);

    this.diagnoticsService.clinicShare(this.filter)
      .subscribe((res: any) => {
        this.clinic.clinics = []
        this.clinic.shares = res.clinicShares
        this.clinic.totalOccurence = res.total || 0

        for (var clinic_id in this.clinic.shares) {
          if (!this.clinic.shares.hasOwnProperty(clinic_id)) continue;
          if (!this.clinic.shares[clinic_id]) continue;
          this.clinic.clinics.push(res.clinicTypes[clinic_id]);
          var percentage = {
            'name': res.clinicTypes[clinic_id],
            'value': this.clinic.shares[clinic_id] ? (parseFloat(this.clinic.shares[clinic_id]) / this.clinic.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.clinic.shares[clinic_id] ? this.clinic.shares[clinic_id] : 0,
          }
          this.clinic.initialChart.push(percentage)
        }
        // nouislider draw
        this.clinicConfig.range.max = this.clinic.initialChart.length - 1 || 1
        if (this.clinicNS) {
          this.clinicNS.slider.updateOptions({
            range: {
              min: 0,
              max: this.clinic.initialChart.length - 1 || 1
            }
          });
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.clinic.initialChart)
        this.dataTableSource.load(this.clinic.initialChart)
        // datachart redraw
        this.clinic.drawChartStartPos = -1;
        this.clinic.liveChartActivate = false;
        this.drawLiveChart();
        this.clinic.timer = setInterval(this.drawLiveChart.bind(this), 5000);
      });
  }

  drawLiveChart(force = false) {
    if (!force && this.clinic.liveChartActivate) return;
    if (!force) {
      this.clinic.drawChartStartPos++;
    }
    if (this.clinic.drawChartStartPos > this.clinic.initialChart.length - this.barChartSettings.barChartXSDisplayCount) {
      this.clinic.drawChartStartPos = 0;
    }
    this.clinic.liveChart = this.clinic.initialChart.slice(this.clinic.drawChartStartPos, this.clinic.drawChartStartPos + this.barChartSettings.barChartXSDisplayCount);
  }
}
