import { Component, Input, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';

import { PatientFlowMetricsService } from '../../../../../shared/_api/patient-flow-metrics.service';

import * as chartsData from '../../../../../shared/_config/ngx-charts.config'
import * as settings from './_settings.config'

@Component({
  selector: 'disease-by-atc',
  templateUrl: './disease-by-atc.component.html',
  styleUrls: ['./disease-by-atc.component.scss']
})
export class DiseaseByAtcComponent implements OnInit {
  // global Settings
  @Input() clinicTypes: any[];
  years = null;
  atcLevels = [2, 3, 4, 5]

  // Bar Charts
  barChartSettings = chartsData.barChartSettings;
  barChartView: any[] = chartsData.barChartView;
  // dataTable Settings
  dataTableSettings = settings.atcSettings;
  dataTableSource: LocalDataSource;

  // Disease By Brand Chart  
  atc = {
    timer: null,
    drawChartStartPos: 0,
    liveChartActivate: false,
    prevalences: null,
    atcs: null,
    totalOccurence: null,
    initialChart: [],
    liveChart: []
  }
  filter = {
    atc_level: 2,
    start_year: "",
    start_quarater: "",
    end_year: "",
    end_quarater: "",
    clinic_type_id: ""
  }

  constructor(private patientFlowMetricsService: PatientFlowMetricsService) { }

  ngOnInit() {
    this.years = this.getYears(2016)
    this.fetchData()
  }

  public beforeChange($event: NgbTabChangeEvent) {
    let id = $event.nextId.replace('ATC-', '');
    this.filter.atc_level = parseInt(id);
    this.fetchData();
  }

  getYears(startYear) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(currentYear--);
    }
    return years;
  }

  fetchData() {
    this.atc.liveChart = []
    this.atc.initialChart = []
    this.atc.liveChartActivate = true;

    if (this.atc.timer) clearInterval(this.atc.timer);
    this.patientFlowMetricsService.diseaseByAtc(this.filter)
      .subscribe((res: any) => {
        this.atc.atcs = res.atcs
        this.atc.prevalences = res.atcPrevalences
        this.atc.totalOccurence = res.total || 1

        for (var atc_id in this.atc.atcs) {
          if (!this.atc.atcs.hasOwnProperty(atc_id)) continue;
          var percentage = {
            'name': this.atc.atcs[atc_id],
            'value': this.atc.prevalences[atc_id] ? (parseFloat(this.atc.prevalences[atc_id]) / this.atc.totalOccurence * 100).toFixed(2) : 0,
            'occurence': this.atc.prevalences[atc_id] ? this.atc.prevalences[atc_id] : 0,
            'brand_id': atc_id
          }
          this.atc.initialChart.push(percentage)
        }
        // datatable redraw
        this.dataTableSource = new LocalDataSource(this.atc.initialChart)
        this.dataTableSource.load(this.atc.initialChart)
        // datachart redraw
        this.atc.drawChartStartPos = 0;
        this.atc.liveChartActivate = false;
        this.drawLiveChart();
        this.atc.timer = setInterval(this.drawLiveChart.bind(this), 2000);
      });
  }

  drawLiveChart() {
    if (this.atc.liveChartActivate) return;
    let displayCount = this.atc.initialChart.length > this.barChartSettings.barChartDisplayCount * 2 ? this.barChartSettings.barChartDisplayCount : Math.floor(this.atc.initialChart.length / 2)

    if (this.atc.drawChartStartPos > this.atc.initialChart.length - displayCount) {
      this.atc.drawChartStartPos = 0;
    }
    this.atc.liveChart = this.atc.initialChart.slice(this.atc.drawChartStartPos, this.atc.drawChartStartPos + displayCount);
    this.atc.drawChartStartPos++;
  }
}
